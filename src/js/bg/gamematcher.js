var OOS = OOS || {};
OOS.gamematcher = {
    getOwnedGameMatches: function(title) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.get(['steamId'], function(items) {
                if (!items.steamId) {
                    reject('Steam ID Not Set');
                    return;
                }
                OOS.api.loadOwnedGames(items.steamId).then(function(games) {
                    var matchTitle = OOS.util.cleanupTitle(title),
                        agressiveMatchTitle = OOS.util.agressiveCleanupTitle(title),
                        matches = [],
                        possibleMatches = [];

                    $.each(games, function(idx, game) {
                        if (game.searchTitle.indexOf(matchTitle) === 0) {
                            matches.push(game);
                        } else if (game.agressiveSearchTitle.indexOf(agressiveMatchTitle) === 0) {
                            game.possibleMatch = true;
                            possibleMatches.push(game);
                        }
                    });

                    if (matches.length === 0) {
                        matches = possibleMatches;
                    }
                    if (matches.length > 1) {
                        $.each(matches, function(idx, game) {
                            if (game.searchTitle === matchTitle) {
                                matches = [game];
                                return false;
                            }
                        });
                    }
                    resolve(matches);
                }).catch(function(reason) {
                    reject(reason);
                });
            });
        });
    }
};
