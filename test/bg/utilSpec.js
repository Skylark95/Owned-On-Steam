describe("OOS.util", function() {
    var util;
    beforeEach(function() {
        util = OOS.util;
    });
    describe("cleanupTitle", function() {
        it("will convert to lowercase", function() {
            expect(util.cleanupTitle('Deponia')).toEqual('deponia');
        });
        it("will replace double space with single space", function() {
            expect(util.cleanupTitle('Fallout  4')).toEqual('fallout 4');
        });
        it("will trim title", function() {
            expect(util.cleanupTitle('   Mad Max    ')).toEqual('mad max');
        });
        it("will remove dash", function() {
            expect(util.cleanupTitle('Overcast - Walden and the Werewolf')).toEqual('overcast walden and the werewolf');
        });
        it("will remove colon", function() {
            expect(util.cleanupTitle('The Walking Dead: Season 2')).toEqual('the walking dead season 2');
        });
        it("will remove trademark symbol", function() {
            expect(util.cleanupTitle('Batman™: Arkham Origins')).toEqual('batman arkham origins');
        });
        it("will remove registered trademark symbol", function() {
            expect(util.cleanupTitle('The Witcher® 3: Wild Hunt')).toEqual('the witcher 3 wild hunt');
        });
        it("will clean up Sid Meier's complicated titles", function() {
            expect(util.cleanupTitle('Sid Meier\'s Civilization®: Beyond Earth™ - Rising Tide')).toEqual('sid meiers civilization beyond earth rising tide');
        });
    });
    describe("agressiveCleanupTitle", function() {
        it("will convert to lowercase", function() {
            expect(util.agressiveCleanupTitle('Deponia')).toEqual('deponia');
        });
        it("will replace double space with single space", function() {
            expect(util.agressiveCleanupTitle('Fallout  4')).toEqual('fallout 4');
        });
        it("will trim title", function() {
            expect(util.agressiveCleanupTitle('   Mad Max    ')).toEqual('mad max');
        });
        it("will not match partial on apostrophe", function() {
            expect(util.agressiveCleanupTitle('Sid Meier\'s Civilization®: Beyond Earth™ - Rising Tide')).toEqual('sid meiers civilization');
        });
        it("will not match partial on period", function() {
            expect(util.agressiveCleanupTitle('L.A. Noire')).toEqual('la noire');
        });
        it("will match partial title with colon", function() {
            expect(util.agressiveCleanupTitle('Stealth Inc 2: A Game of Clones: Humble Deluxe Edition')).toEqual('stealth inc 2');
        });
        it("will match partial title with dash", function() {
            expect(util.agressiveCleanupTitle('Broken Sword - Shadow of the Templars: The Director\'s Cut')).toEqual('broken sword');
        });
    });
});
