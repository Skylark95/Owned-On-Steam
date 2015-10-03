OOS.store.greenmangaming = function(injector) {
    $('.curPrice').append('<br>');
    injector.injectOwnership($('.prod_det').text(), function(response) {
        $('.curPrice').after(response.ownershipSpan);
        injector.addBorder();
    });
};

OOS.store.greenmangaming(OOS.injector);
