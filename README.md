# Sikher for Mobile, Tablet & Desktop

Welcome to the very first open source gurbani search app for mobile, tablet and desktop.

We have designed this app _Medium.com style_, which is minimalistic, highly usable and beautifully designed.

Current: **Version 1.0.1**

![Sikher - Hymn](https://farm9.staticflickr.com/8569/15784435493_bd3d336f28.jpg "Sikher - Hymn")
![Sikher - Slide View](https://farm8.staticflickr.com/7306/16404482375_57632035e2.jpg "Sikher - Slide View")

Features include:

* Daily Prayers with Audio
* Random Inspirational Hymn
* Search by First Letters (Gurmukhi & Roman) or Page
* Recent Searches
* Add to Favourites
* Page and Slide view (carefully designed for projecting onto a screen)
* Choice of fonts: Gurbani Akhar or Prabhki
* Can be used 100% offline
* Available for Mobile/Tablet (Android) and Desktop (Windows, Mac, Linux)
* More exciting and innovative features to come...see the Roadmap below

For more screenshots please go here: https://www.flickr.com/photos/thesikherproject/sets/72157650494678686/

## Installation
_Currently we only have releases for Android & Desktop (Windows, Linux and Mac). But in time, we will also have releases for iPhone and iPad (if you are a developer who can help us with testing on iOS please come forward!)_

To install Sikher, first download the .zip archive and unzip it to a location of your choice:

	https://github.com/sikher/sikher/archive/master.zip

**Or** just use `git` to clone the ssh version:

    git clone git@github.com:sikher/sikher.git

**Or** use `git` to clone the https version:

	git clone https://github.com/sikher/sikher.git

### Mobile & Tablet
* You will find the `.apk` app file for Android in the `dist/` folder.
* We would recommend you connect your phone to your computer via USB
* Then save the app file to your phone's memory where you can access it
* You *may* need to download a file browsing app from the Google Play store so you can access the file
* You *may* also need to enable the installation of apps from Unknown sources by enabling: `Settings -> Security -> Unknown sources`

### Desktop

_Currently to setup the Desktop version of Sikher you will need to know the basics of the command-line. We hope to make this process much easier in the future for everyone._

* First download and install [**Node.js**](http://nodejs.org/)
* Start the command-line or `Terminal` by searching `cmd` or `Terminal` in your system
* Then on the command-line using the `cd` command, navigate to where you downloaded this repository e.g. `cd Desktop\Sikher`
* Now type in the command `npm install`
* Once this has completed successfully simply type the command `grunt` - this will create a `desktop` folder
* Then depending on your platform you can start Sikher Desktop with one of the following commands. Please note that each of the commands end in a dot `.`:
    * Windows - `desktop\atom.exe .`
    * Mac - `desktop/Atom.app .`
    * Linux - `desktop/atom .`

### Web

You may view the latest version of the app on the web at http://web.sikher.com without needing to download this repository.

Alternatively, if you would like to upload your own web version of the app to your Apache server then simply upload all the contents of this repository to the root directory on your server which should be totally empty. We recommend you setup a subdomain for this e.g. _web.yourserver.com_.

You will also have to change the `.htaccess` file's following rule to your domain/subdomain: `RewriteRule ^www/(.*) http://your.domain.com/$1 [R=301,L]`

_Please note: Currently we only support deployment to Apache servers out-of-the-box. You are welcome to try deploying to other servers e.g. nginx but you may have to re-create all the .htaccess rules for your server_

# Developer
If you're interested in contributing to the app as a developer we would love for you to **send us some pull requests** and **log some issues at https://github.com/sikher/sikher/issues**!

Also, since we do not have regular access to Macs we are looking for someone to take on the responsbility of maintaining this app from an iOS perspective.

## Stack
* Client: Apache Cordova app powered by Angular.js. To edit this app you should be very comfortable with **JavaScript**
* Database: Local SQLite database accessed via [sql.js](https://github.com/kripken/sql.js/) which is being run in a Web Worker
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
* If you wish to create a release file use the `--release` flag e.g. `cordova build --release`. Please note that this will also create a new version of the app in the `dist/` folder
* Cordova supports many more mobile platforms so if you wish to develop for other platforms see the [Apache Cordova's platform guide](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides)

## Credits
* The Most Benevolent Gracious Guru, who has been my life's saviour
* Onkar and the other BETA testers for steering the user experience and features
* SearchGurbani.com for their constant inspiring dedication to great Gurbani apps
* The team behind QuranExplorer.com, whose app for the iPad inspired me to create this
* Gurbani Anywhere team for their beautiful app for the iPhone
* iGurbani.com team for their innovative web-based interface
* Dr. Thind of GurbaniFiles.org for producing all the original fonts and databases we still use today
* SikhNet.com team for showing us that you can take time out to do selfless service
* SikhiToTheMAX team for being the first Gurbani app of its kind
* Albel Singh for his awesome Prabhki font!
* Prayer audio includes recordings from Harninder Kaur (Nitnem), Bhai Jasbir Singh (Rehraas Sahib) and Snatam Kaur (Kirtan Sohila)

## Roadmap
_In order of importance_

### Version 1.0.3
* Information about the author and melody should be given in search results and page view
* Hymns can be pushed from one app to another (via [PeerJS](http://peerjs.com/))
* Autoscrolling feature for prayers which can be set to scroll at a constant pace, increased or slower pace, or disabled completely (under consideration)
* Build and test app on iOS platform including iPhone and iPad (we need a developer who has a Mac, iPhone and iPad to help us with this)

### Version 1.0.4
* Clicking any word brings up a dictionary popover
* Ability to update the app if any updated files are released
* Give user a tour on first use of the app
* A beautiful splash screen

## Bugs
If you find any bugs please do not send us any emails about them, instead log them in issues here so that it helps everyone with the same issue: https://github.com/sikher/sikher/issues

## Contact
* Website: http://www.sikher.com
* Email: jasdeep {at} sikher {dot} com