describe("OOS.gamematcher", function() {
    var gamematcher,
        appId,
        title,
        game,
        sync,
        api;
    beforeEach(function() {
        gamematcher = OOS.gamematcher;
        appId = 65980;
        title = 'Sid Meier\'s Civilization®: Beyond Earth™';
        game = {
            id: appId,
            title: title,
            searchTitle: 'sid meiers civilization beyond earth',
            agressiveSearchTitle: 'sid meiers civilization'
        };
        sync = chrome.storage.sync;
        api = OOS.api;
    });

    describe("Given Steam ID is not set", function() {
        beforeEach(function() {
            sync.get.and.callFake(function(items, callback) {
                if (items[0] === 'steamId') {
                    callback.call(this, {});
                }
            });
        });
        it("will reject the promise with 'Steam ID Not Set'", function(done) {
            gamematcher.getOwnedGameMatches(title).catch(function(reason) {
                expect(reason).toEqual('Steam ID Not Set');
                done();
            });
        });
    });

    describe("Given Steam ID is set", function() {
        beforeEach(function() {
            sync.get.and.callFake(function(items, callback) {
                if (items[0] === 'steamId') {
                    callback.call(this, {steamId: '76561198010228607'});
                }
            });
        });

        describe("And loadOwnedGames returns games", function() {
            beforeEach(function() {
                spyOn(api, 'loadOwnedGames').and.returnValue(PromiseTester.resolve([]));
            });
            it("will match no games", function(done) {
                gamematcher.getOwnedGameMatches(title).then(function(matches) {
                    expect(matches).toEqual([]);
                    done();
                });
            });
        });

        describe("And loadOwnedGames returns matching game", function() {
            beforeEach(function() {
                spyOn(api, 'loadOwnedGames').and.returnValue(PromiseTester.resolve([game]));
            });
            it("can match game as owned for matching title", function(done) {
                gamematcher.getOwnedGameMatches(title).then(function(matches) {
                    expect(matches).toEqual([game]);
                    expect(game.possibleMatch).toBeFalsy();
                    done();
                });
            });
            it("can match game as possibly owned for agressive matching title", function(done) {
                gamematcher.getOwnedGameMatches('Sid Meier\'s Civilization®: Beyond Earth™ - Rising Tide').then(function(matches) {
                    expect(matches).toEqual([game]);
                    expect(game.possibleMatch).toEqual(true);
                    done();
                });
            });
        });

        describe("And loadOwnedGames returns no games", function() {
            beforeEach(function() {
                spyOn(api, 'loadOwnedGames').and.returnValue(PromiseTester.resolve([]));
            });
            it("will match no games", function(done) {
                gamematcher.getOwnedGameMatches(title).then(function(matches) {
                    expect(matches).toEqual([]);
                    done();
                });
            });
        });

        describe("And loadOwnedGames fails", function() {
            beforeEach(function() {
                spyOn(api, 'loadOwnedGames').and.returnValue(PromiseTester.reject('api error'));
            });
            it("will reject the promise with 'api error'", function(done) {
                gamematcher.getOwnedGameMatches(title).catch(function(reason) {
                    expect(reason).toEqual('api error');
                    done();
                });
            });
        });
    });
});
