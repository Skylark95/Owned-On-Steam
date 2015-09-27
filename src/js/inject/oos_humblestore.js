OOS.store.humblestore = function(injector) {
    var humbleStoreProductPage = '.*://www.humblebundle.com/store/p/.*',
        observer = new MutationObserver(function() {
            if (window.location.href.match(humbleStoreProductPage)) {
                injector.injectOwnership($('.product-title h2').text(), function(response) {
                    $('.price-and-add-to-cart').prepend(response.ownershipSpan);
                });
            }
        });
    observer.observe($('.permalink-view').get(0), {
        childList: true,
        subtree: false,
        attributes: false
    });
};

OOS.store.humblestore(OOS.injector);
