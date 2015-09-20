injectOwnership($('#content-guts-title').contents().filter(function() {
    return this.nodeType == 3;
}).text(), function(response) {
    $('.purchase .price').after('<br>' + response.ownershipSpan);
});
