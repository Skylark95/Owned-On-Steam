var OOS = OOS || {};
OOS.util = {
    searchRegex: /[^a-zA-Z0-9\s]/g,
    cleanupTitle: function(title) {
        return title.trim().replace(this.searchRegex, '').toLowerCase();
    },
    agressiveCleanupTitle: function(title) {
        return title.trim().split(this.searchRegex)[0].toLowerCase();
    }
};
