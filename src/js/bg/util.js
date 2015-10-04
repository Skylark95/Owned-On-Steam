var OOS = OOS || {};
OOS.util = {
    searchRegex: /[^a-zA-Z0-9\s]/g,
    doubleSpaceRegex: /\s{2}/,
    cleanupTitle: function(title) {
        return title.replace(this.searchRegex, '')
                    .replace(this.doubleSpaceRegex, ' ')
                    .toLowerCase()
                    .trim();
    },
    agressiveCleanupTitle: function(title) {
        return title.split(this.searchRegex)[0]
                    .replace(this.doubleSpaceRegex, ' ')
                    .toLowerCase()
                    .trim();
    }
};
