OOS.store.gamersgate = function(injector) {
    injector.injectOwnership($('div.ttl').text(), function(response) {
        $("div.price_price").before(response.ownershipSpan + '<br><br>');
        injector.addBorder();
    },
    {
        tooltip: {
            theme: 'oos_tooltipster_light_border'
        }
    });
};

OOS.store.gamersgate(OOS.injector);
