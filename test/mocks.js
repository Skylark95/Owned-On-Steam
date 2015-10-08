chrome.runtime.onMessage = jasmine.createSpyObj('onMessage', ['addListener']);
chrome.storage = {
    sync: jasmine.createSpyObj('sync', ['get'])
};
