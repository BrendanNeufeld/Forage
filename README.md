Forage
=====================

This project is a cordova mobile app built with ionic and angular. It is a game that works in conjunction with 3 or more [RFduinos](http://www.rfduino.com/). Communication between the mobile app and the RFduinos is done via BLE ([Bluetooth Low Energy](http://en.wikipedia.org/wiki/Bluetooth_low_energy)). Players start the game by checking in with one of the RFduinos as an entry point. The app uses the signal strength (RSSI) of the RFduino to give the player a general idea of the resource's proximity. Once the player gets close to the resource (around 2 feet) the player can 'collect' the resource by connecting directly to the RFduino. At any time the player can proceed to the checkout point (checkout RFduino). Based on the time spent and the number of resources collected the checkout RFduino can be used to actuate some physical feedback.

## Using this project

It is recommended that you have the following utilities installed: `cordova`, `ionic`, `sass`, and `gulp`. If you are on OS X the Ruby gem installer should already be installed. If you are on Windows go [here](http://www.rubyinstaller.org/) to install. This will allow you to install Sass ([more info on installing Sass](http://sass-lang.com/install)). Use the following commands to install the recommended utilities:
```bash
$ sudo gem install sass
$ sudo npm install -g cordova ionic gulp
```

More information: [Apache Cordova Documentation](http://cordova.apache.org/docs/en/3.5.0/index.html), [Ionic Getting Started](http://ionicframework.com/getting-started), [Sass Guide](http://sass-lang.com/), [gulp.js](http://gulpjs.com/).

For iPhone apps you will need the Xcode [Command Line Tools](http://docwiki.embarcadero.com/RADStudio/XE4/en/Installing_the_Xcode_Command_Line_Tools_on_a_Mac) and for Android apps you will need the [Android Development Tools](http://developer.android.com/sdk/index.html).

## Installation

To use this project as is, first run:

```bash
$ git clone https://github.com/BrendanNeufeld/Forage.git
$ cd RFduino-Scavenger-Hunt
$ npm install
$ gulp install
```

Add your mobile app platforms then install the cordova rfduino plugin. Note: I had to fork the [original repo](https://github.com/don/cordova-plugin-rfduino/tree/master/examples/button) in order to fix a bug, so install the plugin from my [forked repo](https://github.com/BrendanNeufeld/cordova-plugin-rfduino) as follows.

```bash
$ cordova platform add ios
$ cordova platform add android
$ cordova plugin add https://github.com/BrendanNeufeld/cordova-plugin-rfduino.git
```

## Running this project

To run this project on your mobile device use:
```bash
$ cordova run ios -d
```
or
```bash
$ cordova run android -d
```
To quit the debugger run:
```bash
$ quit
```

To run the project in your browser you can use `ionic serve`. This may not work that well as angular is dependent on some native device events.

## Debugging with Weinre (optional)

For debugging this project uses [weinre](http://tinyurl.com/6quwfna)

In terminal run:
```bash
$ weinre -boundHost <youripaddress>
```
Navigate to: `http://<youripaddress>:8080` and you should see the web inspector remote. Three sections down you should see the **Target Script** section.

Add this script tag to `www/index.html`. e.g. `<script src="http://<youripaddress>:8080/target/target-script-min.js#anonymous"></script>`

Note: Be aware that if you leave this script tag in and you change networks, it can crash the application. So comment it out when doing on-site tests.


To start debugging click the first link at the top of weinre web inspector remote page. You will see "Targets: none" until you run the app on a device.

## Using Sass (optional)

This project makes it easy to use Sass (the SCSS syntax) in your projects. This enables you to override styles from Ionic, and benefit from
Sass's great features.

Just update the `./scss/ionic.app.scss` file, and run `gulp` or `gulp watch` to rebuild the CSS files for Ionic.

Note: if you choose to use the Sass method, make sure to remove the included `ionic.css` file in `index.html`, and then uncomment
the include to your `ionic.app.css` file which now contains all your Sass code and Ionic itself:

```html
<!-- IF using Sass (run gulp sass first), then remove the CSS include above
<link href="css/ionic.app.css" rel="stylesheet">
-->
```

## Updating Ionic (optional)

To update to a new version of Ionic, open bower.json and change the version listed there.

For example, to update from version `1.0.0-beta.4` to `1.0.0-beta.5`, open bower.json and change this:

```
"ionic": "driftyco/ionic-bower#1.0.0-beta.4"
```

To this:

```
"ionic": "driftyco/ionic-bower#1.0.0-beta.5"
```

After saving the update to bower.json file, run `gulp install`.

Alternatively, install bower globally with `npm install -g bower` and run `bower install`.

#### Using the Nightly Builds of Ionic

If you feel daring and want use the bleeding edge 'Nightly' version of Ionic, change the version of Ionic in your bower.json to this:

```
"ionic": "driftyco/ionic-bower#master"
```

Warning: the nightly version is not stable.


## Issues
[Submit an issue](https://github.com/BrendanNeufeld/RFduino-Scavenger-Hunt/issues)

