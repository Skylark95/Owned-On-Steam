// Create a new file following the naming convention 'OOS_example' where
// example is the name of the store

// Create a new JavaScript object following the naming convention 'OOS.store.example'
// where 'example' is the name of the store
OOS.store.example = function(injector) {
    // Call the injector with the game title text on the page as the first argument.
    // jQuery is available to help you select the game title from the DOM.
    // The second argument is a callback used to inject 'response.ownershipSpan'
    // into the DOM
    injector.injectOwnership($('.game_title').text(), function(response) {
        // Callback body to inject response.ownershipSpan into the DOM
        // for consistancy, it is preferred to keep the ownership information
        // near the price of the game on the page.  Again, jQuery is avalible to
        // help you inject the ownershipSpan element into the DOM.
        $('.price').after(response.ownershipSpan);
    });

    // Any other code you need to run on the store page may be included here and
    // will be called when the store page is loaded in the user's browser.
};

// Call 'OOS.store.example' with the 'injector' (oos_injector.js)
OOS.store.example(OOS.injector);


// Manifest Entries
// ----------------
//
// The following would then be added to the content_scripts section of the Manifest
//
// {
//     "matches": [
//         "*://www.example.com/*"
//     ],
//     "js": [
//         "js/vendor.min.js",
//         "js/inject/oos_injector.js",
//         "js/inject/oos_example.js"
//     ],
//     "css": [
//         "css/vendor.min.css",
//         "css/ownedonsteam.css"
//     ],
//     "run_at": "document_end"
// }]
