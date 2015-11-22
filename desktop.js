var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var globalShortcut = require('global-shortcut');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var fullscreen = false;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768, icon:'resources/icon.png', 'web-preferences': { webaudio: true }});

  // Register F11 shortcut to go toggle fullscreen
  var ret = globalShortcut.register('F11', function() {
    if(!fullscreen)
    {
          mainWindow.setFullScreen(true);
          fullscreen = true;
    }
    else
    {
          mainWindow.setFullScreen(false);
          fullscreen = false;
    }
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/www/index.html');
  mainWindow.maximize();
  // mainWindow.openDevTools(); // For debugging

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  app.on('will-quit', function() {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });
});
