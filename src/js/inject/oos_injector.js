var OOS = OOS || {};
OOS.store = {};
OOS.injector = {
    getOwnershipSpan: function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getOwnershipSpan',
            title: title
        }, callback);
    },
    getLoadingSpan: function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getLoadingSpan',
            title: title
        }, callback);
    },
    initTooltip: function() {
        $('.oos_ownership_link').tooltipster({
            position: 'bottom',
            contentAsHTML: true
        });
    },
    removeOwnership: function() {
        $('.oos_ownership_link').remove();
    },
    addClassToSpan: function(classToAdd) {
        $('.oos_ownership').addClass(classToAdd);
    },
    addClassToLink: function(classToAdd) {
        $('.oos_ownership_link').addClass(classToAdd);
    },
    addBorder: function() {
        this.addClassToSpan('oos_ownership_border');
    },
    addTopMargin: function() {
        this.addClassToLink('oss_ownership_margin_top');
    },
    injectOwnership: function(title, injectCallback) {
        var me = this;
        me.getLoadingSpan(title, function(response) {
            injectCallback.call(this, response);
            me.initTooltip();
        });
        me.getOwnershipSpan(title, function(response) {
            me.removeOwnership();
            injectCallback.call(this, response);
            me.initTooltip();
        });
    }
};
