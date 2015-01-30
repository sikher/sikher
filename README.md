# Sikher for Mobile, Tablet & Desktop

Welcome to the very first open source gurbani search app for mobile, tablet and desktop.

We have designed this app _Medium.com style_, which is minimalistic, highly usable and beautifully designed.

![Sikher - Hymn](https://farm9.staticflickr.com/8569/15784435493_bd3d336f28.jpg "Sikher - Hymn")
![Sikher - Slide View](https://farm8.staticflickr.com/7306/16404482375_57632035e2.jpg "Sikher - Slide View")

Features include:

* Daily Prayers with Audio
* Random Inspirational Hymn
* Search by First Letters (Roman only)
* Add to Favourites
* Page and Slide view (carefully designed for projecting onto a screen)
* Can be used 100% offline
* More exciting and innovative features to come...see the Roadmap below

For more screenshots please go here: https://www.flickr.com/photos/thesikherproject/sets/72157650494678686/

# Download
_Packages for Android, iPhone, iPad, Chrome App will be made once we have finished our BETA testing of the application. If you are interested in helping us BETA test please send us an email to info |at| sikher |dot| com_

# Developer

If you're interested in contributing to the app as a developer we would love for you to send us some pull requests and log some issues!

Also, since we do not have regular access to Macs we are looking for someone to take on the responsbility of maintaining this app from the iOS perspective.

## Stack
* Client: Apache Cordova app powered by Angular.js. To edit this app you should be very comfortable with **JavaScript**
* Database: Local SQLite database accessed via [sql.js](https://github.com/kripken/sql.js/)
* Server: There isn't one! The beauty of this app is that it's 100% a client-side app!

## Pre-Requisites

* [**Node.js**](http://nodejs.org/). It is recommended to [follow this way of installing Node](https://gist.github.com/isaacs/579814) for development so that you don't have to keep using `sudo`: https://gist.github.com/isaacs/579814
* Install **Apache Cordova** and **Ionic**: `$ npm install -g cordova ionic`
* Install a platform: [**Android**](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides) and/or [**iOS**](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides) platform guides. For Android you may just choose to install [Android Studio](http://developer.android.com/sdk/index.html), which gives you everything in a neat package
* Install `DB Browser for SQLite` in case you wish to edit the embedded SQLite database: http://sqlitebrowser.org/

_Note: iOS development requires Mac OS X. iOS simulator through the Ionic CLI requires the ios-sim npm package, which can be installed with the command sudo npm -g install ios-sim._

## Installation

* Open a Terminal. Download the repo with `git clone https://github.com/sikher/sikher.git`. I highly recommend you keep this in your user's `$HOME` **~** folder
* `cd` into where you downloaded your repo and run: `ionic platform add android`
* Now to build the final package for your device do: `ionic build android`
* Finally, you can run `ionic emulate android` to use the app over an emulator or alternatively plug in your android device via USB and you can test on it directly with `ionic run android`. You can also setup remote debugging if you're using Chrome on your Android device: https://developer.chrome.com/devtools/docs/remote-debugging
* Swap `android` for `ios` to build for the iOS platform
* Cordova supports many more mobile platforms so if you wish to develop for other platforms see [Apache Cordova's platform guide](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides)

## Credits
* The Most Benevolent Gracious Guru, who has been my life's saviour
* SearchGurbani.com for their constant dedication to great Gurbani apps
* Gurbani Anywhere team for their beautiful app for the iPhone
* iGurbani.com team for their innovative user interface
* The team behind quranexplorer.com, whose app for the iPad inspired me to create this
* Dr. Thind of [GurbaniFiles.org](http://www.gurbanifiles.org/) for producing all the original fonts and databases we still use today
* SikhNet.com team for showing us that you can take time out to do selfless service

## Roadmap
_In order of importance_

### Version 0.0.2
* Build and test app on iOS platform including iPhone and iPad
* Rename page view to hymn view - to avoid confusion
* Recent searches should be shown before doing a search
* After viewing a hymn, buttons should be offered to see the previous or next hymn
* Information about the author, page and hymn should be given in search results and page view
* If a number is entered into the search all results from that page will appear

### Version 0.0.3
* Autoscrolling feature for prayers which can be set to scroll at a constant pace, increased or slower pace, or disabled completely
* Hymns can be pushed from one app to another (via [PeerJS](http://peerjs.com/))
* Improve speed of database searches by using web workers for sql.js

### Version 0.0.4
* Clicking any word brings up a dictionary popover
* Ability to update the app if any updated files are released
* Give user a tour on first use of the app
* A beautiful splash screen

## Contact
* Email: jasdeep {at} sikher {dot} com