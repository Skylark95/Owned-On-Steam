// var cacheExpires = 0,
var cacheExpires = 900000,
    searchRegex = /[^a-zA-Z0-9\s]/g,
    steamIdRegex = /[0-9]{17}/,
    steamApi = 'http://steamcommunity.com/profiles/{steamId}/games?xml=1',
    steamCommunityByIdApi = 'http://steamcommunity.com/id/{steamId}/?xml=1',
    steamCommunityByProfileApi = 'http://steamcommunity.com/profiles/{steamId}/?xml=1',
    loadOwnedGames = function(steamId) {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get(['time', 'games'], function(items) {
                 if (items.time && (new Date() - new Date(items.time)) < cacheExpires) {
                     resolve(items.games);
                 } else {
                     callSteamApi(steamId).then(function(games) {
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
    callSteamApi = function(steamId) {
        return new Promise(function(resolve, reject) {
            var url = steamApi.replace('{steamId}', steamId);
            $.get(url).done(function(data) {
                resolve(parseResults(data));
            }).fail(function() {
                reject("Failed to call URL: " + url);
            });
        });
    },
    parseResults = function(results) {
        var games = [];
        $.each($(results).find('game'), function(idx, game) {
            var $game = $(game),
                id = $($game.find('appID')).text(),
                title = $($game.find('name')).text(),
                searchTitle = cleanupTitle(title),
                agressiveSearchTitle = agressiveCleanupTitle(title);
            games.push({
                id: id,
                title: title,
                searchTitle: searchTitle,
                agressiveSearchTitle: agressiveSearchTitle
            });
        });
        return games;
    },
    cleanupTitle = function(title) {
        return title.trim().replace(searchRegex, '').toLowerCase();
    },
    agressiveCleanupTitle = function(title) {
        return title.trim().split(searchRegex)[0].toLowerCase();
    },
    getOwnedGameMatches = function(title) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.get(['steamId'], function(items) {
                if (!items.steamId) {
                    reject('Steam ID Not Set');
                    return;
                }
                loadOwnedGames(items.steamId).then(function(games) {
                    var matchTitle = cleanupTitle(title),
                        agressiveMatchTitle = agressiveCleanupTitle(title),
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
    },
    buildLoadingSpan = function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_loading">Loading<span>.</span><span>.</span><span>.</span></span></a>';
    },
    buildOwnedSpan = function(steamid, title) {
        return '<a href="http://store.steampowered.com/app/' + steamid + '/" target="_blank" title="\'' + title + '\' Found In Steam Library<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_owned">Owned</span></a>';
    },
    buildPossibleSpan = function(steamid, title) { // https://www.humblebundle.com/store/p/stealthinc2_agameofclones_storefront
        return '<a href="http://store.steampowered.com/app/' + steamid + '/" target="_blank" title="<strong>Best Guess Match Found:</strong> \'' + title + '\'<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
    },
    buildGenericErrorSpan = function(error, title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>An Error Occurred:</strong> \'' + error + '\'<br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_error">Error</span></a>';
    },
    buildSteamIdErrorSpan = function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>Go to the extention options page to set your Steam ID</strong><br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_error">Steam ID Not Set</span></a>';
    },
    buildNotOwnedSpan = function(title) {
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_not_owned">Not Owned</span></a>';
    },
    buildMultipleSpan = function(title, matches) { // https://www.humblebundle.com/store/p/brokensword_directorscut_storefront
        var matchString = '';
        $.each(matches, function(idx, game) {
            matchString += '<br>\'' + game.title + '\'';
        });
        return '<a href="http://store.steampowered.com/search/?term=' + encodeURIComponent(title) + '" target="_blank" title="<strong>Multiple Possible Matches Found:</strong>' + matchString + '<br><br>Click To Search Steam for \'' + title + '\'" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
    },
    buildOwnershipSpan = function(title) {
        return new Promise(function(resolve, reject) {
            var response = {};
            getOwnedGameMatches(title).then(function(matches) {
                if (matches.length === 1) {
                    var id = matches[0].id,
                        gameTitle = matches[0].title,
                        possibleMatch = matches[0].possibleMatch;
                    if (possibleMatch) {
                        response.ownershipSpan = buildPossibleSpan(id, gameTitle);
                    } else {
                        response.ownershipSpan = buildOwnedSpan(id, gameTitle);
                    }
                } else if (matches.length === 0) {
                    response.ownershipSpan = buildNotOwnedSpan(title);
                } else {
                    response.ownershipSpan = buildMultipleSpan(title, matches);
                }
                resolve(response);
            }).catch(function(reason) {
                if (reason === 'Steam ID Not Set') {
                    response.ownershipSpan = buildSteamIdErrorSpan(title);
                } else {
                    response.ownershipSpan = buildGenericErrorSpan(reason, title);
                }
                resolve(response);
            });
        });
    },
    translateSteamId = function(steamId) {
        return new Promise(function(resolve, reject) {
            var url;
            if (steamId.match(steamIdRegex)) {
                url = steamCommunityByProfileApi.replace('{steamId}', steamId);
            } else {
                url = steamCommunityByIdApi.replace('{steamId}', steamId);
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
    installListener = function() {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.action === 'getLoadingSpan') {
                chrome.pageAction.show(sender.tab.id);
                var loadingSpan = buildLoadingSpan(request.title);
                sendResponse({
                    ownershipSpan: loadingSpan
                });
                return;
            }
            if (request.action === 'getOwnershipSpan') {
                buildOwnershipSpan(request.title).then(function(span) {
                    sendResponse(span);
                });
                return true;
            }
            if (request.action === 'translateSteamId') {
                translateSteamId(request.steamId).then(function(response) {
                    sendResponse(response);
                }).catch(function(response) {
                    sendResponse(false);
                });
                return true;
            }
        });
    };

installListener();
