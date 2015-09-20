injectOwnership($('.page-title').text(), function(response) {
    $('.drm-info').prepend(response.ownershipSpan);
});
