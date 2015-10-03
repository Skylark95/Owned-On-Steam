describe("OOS.html", function() {
    it("can build loadingSpan", function() {
        var expected = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_loading">Loading<span>.</span><span>.</span><span>.</span></span></a>';
        expect(OOS.html.buildLoadingSpan('Half-Life 2')).toEqual(expected);
    });
    it ("can build ownedSpan", function() {
        var expected = '<a href="http://store.steampowered.com/app/220/" target="_blank" title="\'Half-Life 2\' Found In Steam Library<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_owned">Owned</span></a>';
        expect(OOS.html.buildOwnedSpan(220, 'Half-Life 2')).toEqual(expected);
    });
    it("can build possibleSpan", function() {
        var expected = '<a href="http://store.steampowered.com/app/220/" target="_blank" title="<strong>Best Guess Match Found:</strong> \'Half-Life 2\'<br><br>Click To View On Steam" class="oos_ownership_link"><span class="oos_ownership oos_possible">Possibly Owned</span></a>';
        expect(OOS.html.buildPossibleSpan(220, 'Half-Life 2')).toEqual(expected);
    });
    it("can build genericErrorSpan", function() {
        var expected = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="<strong>An Error Occurred:</strong> \'Oops\'<br><br>Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_error">Error</span></a>';
        expect(OOS.html.buildGenericErrorSpan('Oops', 'Half-Life 2')).toEqual(expected);
    });
    it("can build buildSteamIdErrorSpan", function() {
        var expected = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="<strong>Go to the extention options page to set your Steam ID</strong><br><br>Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_steamid_error">Steam ID Not Set</span></a>';
        expect(OOS.html.buildSteamIdErrorSpan('Half-Life 2')).toEqual(expected);
    });
    it("can build buildNotOwnedSpan", function() {
        var expected = '<a href="http://store.steampowered.com/search/?term=Half-Life%202" target="_blank" title="Click To Search Steam for \'Half-Life 2\'" class="oos_ownership_link"><span class="oos_ownership oos_not_owned">Not Owned</span></a>';
        expect(OOS.html.buildNotOwnedSpan('Half-Life 2')).toEqual(expected);
    });
});
