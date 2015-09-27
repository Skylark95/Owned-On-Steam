OOS.store.greenmangaming = function(injector) {
    injector.injectOwnership($('.prod_det').text(), function(response) {
        $('.curPrice').after('<br>' + response.ownershipSpan);
        injector.addBorder();
    });
};

OOS.store.greenmangaming(OOS.injector);
