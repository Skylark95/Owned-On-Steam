var OOS = OOS || {};
OOS.store = {};

OOS.injector = {
    /**
     * Fetches the owernshipSpan
     * @private
     */
    getOwnershipSpan: function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getOwnershipSpan',
            title: title
        }, callback);
    },
    /**
     * Fetches the loadingSpan
     * @private
     */
    getLoadingSpan: function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getLoadingSpan',
            title: title
        }, callback);
    },
    /**
     * Loads the tooltip
     * @private
     */
    initTooltip: function(options) {
        var defaults = {
                position: 'bottom',
                contentAsHTML: true,
                theme: 'oos_tooltipster_dark_border'
            },
            config = $.extend({}, defaults, options);
        $('.oos_ownership_link').tooltipster(config);
    },
    /**
     * Removes the ownershipSpan from the DOM
     * @private
     */
    removeOwnership: function() {
        $('.oos_ownership_link').remove();
    },
    /**
     * Adds a CSS class to the ownershipSpan
     * @private
     */
    addClassToSpan: function(classToAdd) {
        $('.oos_ownership').addClass(classToAdd);
    },
    /**
     * Adds CSS to the ownershipSpan
     * @private
     */
    addCssToSpan: function(css) {
        $('.oos_ownership').css(css);
    },
    /**
     * Adds a white border to the owernshipSpan to make it more
     * visible on dark themed store pages
     */
    addBorder: function() {
        this.addClassToSpan('oos_ownership_border');
    },
    /**
     * Adds spacing around the ownershipSpan using relative position
     * @param {object} options - config object for relative positioning (ex: {top: '5px'})
     */
    addSpacing: function(options) {
        var css = options || {};
        css.position = 'relative';
        this.addCssToSpan(css);
    },
    /**
     * Helper method to inject the owernshipSpan for a game
     * @param {string} title - the title of the game
     * @param {function} injectCallback - single argument callback that returns the response as response.ownershipSpan
     * @param {object} options - Config object to change default settings (optional)
     */
    injectOwnership: function(title, injectCallback, options) {
        var me = this,
            config = options || {};
        me.getLoadingSpan(title, function(response) {
            injectCallback.call(this, response);
            me.initTooltip(config.tooltip);
        });
        me.getOwnershipSpan(title, function(response) {
            me.removeOwnership();
            injectCallback.call(this, response);
            me.initTooltip(config.tooltip);
        });
    }
};
