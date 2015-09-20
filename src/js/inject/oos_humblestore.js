var humbleStoreProductPage = '.*://www.humblebundle.com/store/p/.*',
    monitorDomChange = function() {
        var observer = new MutationObserver(function() {
            if (window.location.href.match(humbleStoreProductPage)) {
                injectOwnership($('.product-title h2').text(), function(response) {
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

monitorDomChange();
