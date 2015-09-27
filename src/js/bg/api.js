var OOS = OOS || {};
OOS.api = {
    cacheExpires: 900000,
    steamIdRegex: /[0-9]{17}/,
    steamApi: 'http://steamcommunity.com/profiles/{steamId}/games?xml=1',
    steamCommunityByIdApi: 'http://steamcommunity.com/id/{steamId}/?xml=1',
    steamCommunityByProfileApi: 'http://steamcommunity.com/profiles/{steamId}/?xml=1',
    loadOwnedGames: function(steamId) {
        var me = this;
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get(['time', 'games'], function(items) {
                 if (items.time && (new Date() - new Date(items.time)) < me.cacheExpires) {
                     resolve(items.games);
                 } else {
                     me.callSteamApi(steamId).then(function(games) {
                         var time = new Date().toString();
                         chrome.storage.local.set({
                            'time': time,
                            'games': games
                         });
                         resolve(games);
                     }).catch(function(reason) {
                         reject(reason);
                     });
                 }
            });
        });
    },
    callSteamApi: function(steamId) {
        var me = this;
        return new Promise(function(resolve, reject) {
            var url = me.steamApi.replace('{steamId}', steamId);
            $.get(url).done(function(data) {
                resolve(me.parseResults(data));
            }).fail(function() {
                reject("Failed to call URL: " + url);
            });
        });
    },
    parseResults: function(results) {
        var games = [];
        $.each($(results).find('game'), function(idx, game) {
            var $game = $(game),
                id = $($game.find('appID')).text(),
                title = $($game.find('name')).text(),
                searchTitle = OOS.util.cleanupTitle(title),
                agressiveSearchTitle = OOS.util.agressiveCleanupTitle(title);
            games.push({
                id: id,
                title: title,
                searchTitle: searchTitle,
                agressiveSearchTitle: agressiveSearchTitle
            });
        });
        return games;
    },
    translateSteamId: function(steamId) {
        var me = this;
        return new Promise(function(resolve, reject) {
            var url;
            if (steamId.match(me.steamIdRegex)) {
                url = me.steamCommunityByProfileApi.replace('{steamId}', steamId);
            } else {
                url = me.steamCommunityByIdApi.replace('{steamId}', steamId);
            }
            $.get(url).then(function(data) {
                var $steamId = $(data).find('steamID64');
                if ($steamId.length > 0) {
                    resolve({
                        steamId: $($steamId[0]).text()
                    });
                } else {
                    reject();
                }
            });
        });
    },
};
