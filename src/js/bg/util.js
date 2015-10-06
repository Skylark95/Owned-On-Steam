var OOS = OOS || {};
OOS.util = {
    searchRegex: /[^a-zA-Z0-9\s]/g,
    agressiveSearchRegex: /[^a-zA-Z0-9\s\.']/g,
    doubleSpaceRegex: /\s{2}/,
    cleanupTitle: function(title) {
        return title.replace(this.searchRegex, '')
                    .replace(this.doubleSpaceRegex, ' ')
                    .toLowerCase()
                    .trim();
    },
    agressiveCleanupTitle: function(title) {
        return this.cleanupTitle(title.split(this.agressiveSearchRegex)[0]);
    }
};
