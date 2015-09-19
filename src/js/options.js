// Saves options to chrome.storage.sync.
function save_options() {
    var checkingIdStatus = "Checking Steam ID.",
        statusTextElement = document.getElementById('statusText'),
        steamIdElement = document.getElementById('steamId');

    statusTextElement.innerHTML = checkingIdStatus;
    var statusTextInterval = setInterval(function() {
            if (statusTextElement.innerHTML.length >= checkingIdStatus.length + 2) {
                statusTextElement.innerHTML = checkingIdStatus;
            } else {
                statusTextElement.innerHTML += '.';
            }
        }, 250);

    chrome.runtime.sendMessage({
        action: 'translateSteamId',
        steamId: steamIdElement.value
    }, function(result) {
        clearInterval(statusTextInterval);
        if (result) {
            chrome.storage.sync.set({
                'steamId': result.steamId
            });
            chrome.storage.local.remove(['time', 'games']);
            steamIdElement.value = result.steamId;
            statusTextElement.innerHTML = 'Saved Steam ID: <a href="http://steamcommunity.com/profiles/' + result.steamId + '/" target="_blank">' + result.steamId + '</a>';
        } else {
            statusTextElement.innerHTML = "Could not find Steam ID: " + steamIdElement.value + "";
        }
    });
}

function restore_options() {
    chrome.storage.sync.get({steamId: ''}, function(items) {
        document.getElementById('steamId').value = items.steamId;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
