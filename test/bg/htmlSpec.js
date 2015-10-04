describe("OOS.html", function() {
    var html,
        title,
        appId,
        multipleMatches,
        expectedError,
        expectedLoadingSpan,
        expectedOwnedSpan,
        expectedPossibleSpan,
        expectedGenericErrorSpan,
        expectedSteamIdErrorSpan,
        expectedNotOwnedSpan,
        expectedMultipleSpan;

    beforeEach(function() {
        html = OOS.html;
        title = 'Half-Life 2';
        appId = 220;
        multipleMatches = [{id: 70, title: 'Half-Life'}, {id: 220, title: 'Half-Life 2'}];
        expectedError = 'Oops';
        expectedLoadingSpan = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_loading">Loading<span>.</span><span>.</span><span>.</span></span></a>';
        expectedOwnedSpan = '<a href="http://store.steampowered.com/app/220/" target="_blank" title="\'Half-Life 2\' Found In Steam Library<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_owned">Owned</span></a>';
        expectedPossibleSpan = '<a href="http://store.steampowered.com/app/220/" target="_blank" title="<strong>Best Guess Match Found:</strong> \'Half-Life 2\'<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
        expectedGenericErrorSpan = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="<strong>An Error Occurred:</strong> \'Oops\'<br><br>Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_error">Error</span></a>';
        expectedSteamIdErrorSpan = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="<strong>Go to the extention options page to set your Steam ID</strong><br><br>Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_steamid_error">Steam ID Not Set</span></a>';
        expectedNotOwnedSpan = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_not_owned">Not Owned</span></a>';
        expectedMultipleSpan =  '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="<strong>Multiple Possible Matches Found:</strong><br>\'Half-Life\'<br>\'Half-Life 2\'<br><br>Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
    });

    it("can buildLoadingSpan", function() {
        expect(html.buildLoadingSpan(title)).toEqual(expectedLoadingSpan);
    });

    it ("can buildOwnedSpan", function() {
        expect(html.buildOwnedSpan(appId, title)).toEqual(expectedOwnedSpan);
    });

    it("can buildPossibleSpan", function() {
        expect(html.buildPossibleSpan(appId, title)).toEqual(expectedPossibleSpan);
    });

    it("can buildGenericErrorSpan", function() {
        expect(html.buildGenericErrorSpan(expectedError, title)).toEqual(expectedGenericErrorSpan);
    });

    it("can buildSteamIdErrorSpan", function() {
        expect(html.buildSteamIdErrorSpan(title)).toEqual(expectedSteamIdErrorSpan);
    });

    it("can buildNotOwnedSpan", function() {
        expect(html.buildNotOwnedSpan(title)).toEqual(expectedNotOwnedSpan);
    });

    it("can buildMultipleSpan", function() {
        expect(html.buildMultipleSpan(title, multipleMatches)).toEqual(expectedMultipleSpan);
    });

    describe("buildOwnershipSpan", function() {

        describe("Has no matches", function() {
            beforeEach(function() {
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.resolve([]));
            });
            it("will buildNotOwnedSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedNotOwnedSpan);
                    done();
                });
            });
        });

        describe("Has single match", function() {
            beforeEach(function() {
                var match = {
                    id: appId,
                    title: title
                };
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.resolve([match]));
            });
            it("will buildOwnedSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedOwnedSpan);
                    done();
                });
            });
        });

        describe("Has multiple match", function() {
            beforeEach(function() {
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.resolve(multipleMatches));
            });
            it("will buildMultipleSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedMultipleSpan);
                    done();
                });
            });
        });

        describe("Has single possible match", function() {
            beforeEach(function() {
                var match = {
                    id: appId,
                    title: title,
                    possibleMatch: true
                };
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.resolve([match]));
            });
            it("will buildOwnedSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedPossibleSpan);
                    done();
                });
            });
        });

        describe("Steam ID Not Set", function() {
            beforeEach(function() {
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.reject("Steam ID Not Set"));
            });
            it("will buildSteamIdErrorSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedSteamIdErrorSpan);
                    done();
                });
            });
        });

        describe("Other Error", function() {
            beforeEach(function() {
                spyOn(OOS.gamematcher, 'getOwnedGameMatches').and.returnValue(PromiseTester.reject(expectedError));
            });
            it("will buildGenericErrorSpan", function(done) {
                html.buildOwnershipSpan(title).then(function(response) {
                    expect(response.ownershipSpan).toEqual(expectedGenericErrorSpan);
                    done();
                });
            });
        });

    });
});
