var OOS = OOS || {};
OOS.html = {
    buildLoadingSpan: function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_loading">Loading<span>.</span><span>.</span><span>.</span></span></a>';
    },
    buildOwnedSpan: function(steamid, title) {
        return '<a href="http://store.steampowered.com/app/' + steamid + '/" target="_blank" title="\'' + title + '\' Found In Steam Library<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_owned">Owned</span></a>';
    },
    buildPossibleSpan: function(steamid, title) { // https://www.humblebundle.com/store/p/stealthinc2_agameofclones_storefront
        return '<a href="http://store.steampowered.com/app/' + steamid + '/" target="_blank" title="<strong>Best Guess Match Found:</strong> \'' + title + '\'<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
    },
    buildGenericErrorSpan: function(error, title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>An Error Occurred:</strong> \'' + error + '\'<br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_error">Error</span></a>';
    },
    buildSteamIdErrorSpan: function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>Go to the extention options page to set your Steam ID</strong><br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_steamid_error">Steam ID Not Set</span></a>';
    },
    buildNotOwnedSpan: function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_not_owned">Not Owned</span></a>';
    },
    buildMultipleSpan: function(title, matches) { // https://www.humblebundle.com/store/p/brokensword_directorscut_storefront
        var matchString = '';
        $.each(matches, function(idx, game) {
            matchString += '<br>\'' + game.title + '\'';
        });
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>Multiple Possible Matches Found:</strong>' + matchString + '<br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
    },
    buildOwnershipSpan: function(title) {
        var me = this;
        return new Promise(function(resolve, reject) {
            var response = {};
            OOS.gamematcher.getOwnedGameMatches(title).then(function(matches) {
                if (matches.length === 1) {
                    var id = matches[0].id,
                        gameTitle = matches[0].title,
                        possibleMatch = matches[0].possibleMatch;
                    if (possibleMatch) {
                        response.ownershipSpan = me.buildPossibleSpan(id, gameTitle);
                    } else {
                        response.ownershipSpan = me.buildOwnedSpan(id, gameTitle);
                    }
                } else if (matches.length === 0) {
                    response.ownershipSpan = me.buildNotOwnedSpan(title);
                } else {
                    response.ownershipSpan = me.buildMultipleSpan(title, matches);
                }
                resolve(response);
            }).catch(function(reason) {
                if (reason === 'Steam ID Not Set') {
                    response.ownershipSpan = me.buildSteamIdErrorSpan(title);
                } else {
                    response.ownershipSpan = me.buildGenericErrorSpan(reason, title);
                }
                resolve(response);
            });
        });
    }
};
