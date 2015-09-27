var OOS = OOS || {};
OOS.event = {
    installListener: function() {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.action === 'getLoadingSpan') {
                chrome.pageAction.show(sender.tab.id);
                var loadingSpan = OOS.html.buildLoadingSpan(request.title);
                sendResponse({
                    ownershipSpan: loadingSpan
                });
                return;
            }
            if (request.action === 'getOwnershipSpan') {
                OOS.html.buildOwnershipSpan(request.title).then(function(span) {
                    sendResponse(span);
                });
                return true;
            }
            if (request.action === 'translateSteamId') {
                OOS.api.translateSteamId(request.steamId).then(function(response) {
                    sendResponse(response);
                }).catch(function(response) {
                    sendResponse(false);
                });
                return true;
            }
        });
    }
};

OOS.event.installListener();
