var humbleStoreProductPage = '.*://www.humblebundle.com/store/p/.*',
    getOwnershipSpan = function(title, callback) {
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
    injectOwnership = function() {
        var title = $('.product-title h2').text();
        getLoadingSpan(title, function(response) {
            $('.price-and-add-to-cart').prepend(response.ownershipSpan);
            $('.oos_ownership_link').tooltipster({
                position: 'bottom',
                contentAsHTML: true
            });
        });
        getOwnershipSpan(title, function(response) {
            $('.oos_ownership_link').remove();
            $('.price-and-add-to-cart').prepend(response.ownershipSpan);
            $('.oos_ownership_link').tooltipster({
                position: 'bottom',
                contentAsHTML: true
            });
        });
    },
    monitorDomChange = function() {
        var observer = new MutationObserver(function() {
            if (window.location.href.match(humbleStoreProductPage)) {
                injectOwnership();
            }
        });
        observer.observe($('.permalink-view').get(0), {
            childList: true,
            subtree: false,
            attributes: false
        });
    };

monitorDomChange();
