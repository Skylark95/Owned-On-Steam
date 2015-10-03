OOS.store.wingamestore = function(injector) {
    injector.injectOwnership($('#content-guts-title').contents().filter(function() {
        return this.nodeType == 3;
    }).text(), function(response) {
        $('.purchase .price').after(response.ownershipSpan);
        injector.addSpacing({
            top: '4px',
        });
    });
};

OOS.store.wingamestore(OOS.injector);
