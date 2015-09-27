OOS.store.indiegala = function(injector) {
    var pageTitle = $('.page-title').text(),
        bundleGameDivs = $('div.games-box .modal');

    if (pageTitle) {
        injector.injectOwnership(pageTitle, function(response) {
            $('.drm-info').prepend(response.ownershipSpan);
        });
    }

    if (bundleGameDivs.length > 0) {
        var observer = new MutationObserver(function() {
            var waitForDom = setInterval(function() {
                var title = $('.modal[aria-hidden="false"] .full_game_title').text();
                if (title) {
                    clearInterval(waitForDom);
                    injector.injectOwnership($('.modal[aria-hidden="false"] .full_game_title').text(), function(response) {
                        $('.tit_game').append(response.ownershipSpan);
                        injector.addTopMargin();
                    });
                }
            }, 250);
        });

        bundleGameDivs.each(function() {
            observer.observe(this, {
                childList: true,
                subtree: false,
                attributes: false
            });
        });
    }
};

OOS.store.indiegala(OOS.injector);
