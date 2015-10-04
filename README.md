# Owned On Steam
**Display ownership of Steam games on other stores.**

## Add Steam ID
After installing navigate to ***chrome://extensions*** and select ***Options***
for Owned On Steam.

Enter your Steam Community username or 17 character Steam ID and press ***Save***.

*NOTE: If you enter you enter your username, it will automatically be translated
to your 17 character Steam ID.*

## Usage
Owned on Steam will automatically activate when looking at an individual game
on a supported store.  Displaying results for multiple games is not supported.
Upon activation, the game title will be searched for in your Steam library and
Owned on Steam will take a ***"best guess"***\* effort to determine if you own
the game being displayed.

**Possible Results:**

The result tags below will be shown next to or near the price of the game on
most sites.  You may hover your mouse over the result tag for more information.  Clicking on the result tag will either open the game on Steam or open a search
for the game on Steam depending on the result.

![Owned](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/owned.png "Owned")
Match found in Steam Library

![Possibly Owned](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/possibly_owned.png "Possibly Owned")
A match was found using an "Aggressive Search" pattern.
Results may not be as accurate.

![Possibly Owned Multi](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/possibly_owned_multi.png "Possibly Owned Multi")
Multiple matches were found using an "Aggressive Search" pattern.
Results may not be as accurate.

![Not Owned](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/not_owned.png "Not Owned")
Basic and Aggressive search did not find any matching game titles.

![Loading](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/loading.png "Loading")
Owned On Steam is loading ownership

![Error](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/error.png "Error")
An error occurred while loading ownership

![Steam ID Not Set](https://raw.githubusercontent.com/Skylark95/Owned-On-Steam/master/images/results/steamid_error.png "Steam ID Not Set")
Steam ID was not set in settings.

\****Disclaimer:*** Owned on Steam guesses ownership based on the title and accuracy
cannot be guaranteed.  It is recommended you validate ownership of a game prior to purchase.

## Store Support
Owned On Steam currently supports the following stores:

* [gamersgate.com](http://www.gamersgate.com/)
* [greenmangaming.com](http://www.greenmangaming.com/)
* [humblebundle.com](https://www.humblebundle.com/store) (Humble Store only)
* [indiegala.com](https://www.indiegala.com/)
* [wingamestore.com](http://www.wingamestore.com/)

*This list will be updated as support for more stores is added.*

## Developer Guide
### Checkout
To build Owned On Steam you will need the following tools:
* [nodejs](https://nodejs.org/)
* [bower](http://bower.io/)
* [gulp](http://gulpjs.com/)
* [karma](https://karma-runner.github.io/)

After checking out the repository, run the following commands:
* `npm install`
* `bower install`

### Building
To build the extension, run `gulp` to output the extension to the `dist` directory.

To test the build in Chrome, [load as an unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked).

### Unit Tests
Owned On Steam uses [karma](https://karma-runner.github.io/) to run unit tests.

To run the tests, enter `karma start`.
