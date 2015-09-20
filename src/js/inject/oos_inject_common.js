var getOwnershipSpan = function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getOwnershipSpan',
            title: title
        }, callback);
    },
    getLoadingSpan = function(title, callback) {
        chrome.runtime.sendMessage({
            action: 'getLoadingSpan',
            title: title
        }, callback);
    },
    initTooltip = function() {
        $('.oos_ownership_link').tooltipster({
            position: 'bottom',
            contentAsHTML: true
        });
    },
    removeOwnership = function() {
        $('.oos_ownership_link').remove();
    },
    addClassToSpan = function(classToAdd) {
        $('.oos_ownership').addClass(classToAdd);
    },
    addClassToLink = function(classToAdd) {
        $('.oos_ownership_link').addClass(classToAdd);
    },
    addBorder = function() {
        addClassToSpan('oos_ownership_border');
    },
    injectOwnership = function(title, injectCallback) {
        getLoadingSpan(title, function(response) {
            injectCallback.call(this, response);
            initTooltip();
        });
        getOwnershipSpan(title, function(response) {
            removeOwnership();
            injectCallback.call(this, response);
            initTooltip();
        });
    };
