injectOwnership($('.prod_det').text(), function(response) {
    $('.curPrice').after('<br>' + response.ownershipSpan);
    addBorder();
});
