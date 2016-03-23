'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var View = require('./View/View.js');
var Horloge = require('./Model/Horloge.js');
var Controleur = require('./Controleur/Controleur.js');
var Model = require('./Model/Model.js');
var ipc = require("electron").ipcMain

let view;
let model;
let controleur;
let HORLOGE;

function main () {
    // Create the browser window.
    HORLOGE = new Horloge();
    controleur = new Controleur();
    model = new Model(controleur);
    view = new View(controleur);

    // and load the index.html of the app.
    view.loadURL('file://' + __dirname + '/View/index.html');

    // Emitted when the window is closed.
    view.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        view = null;
    });
    ipc.on('lancer', function () {
        if (view) {
            view.lancer();
        }
    });

}

app.on('ready',main);
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (global.view === null) {
        main();
    }
});
