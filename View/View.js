'use strict';

var BrowserWindow = require('browser-window');
var ipc = require("electron").ipcMain;

module.exports = class View {
    constructor(controleur) {
        this.controleur = controleur;
        this.controleur.setView(this);
        this.mainWindows = null;
    }

    commencer() {
        this.mainWindows = new BrowserWindow({
            width: 800,
            height: 600
        })
        this.mainWindows.loadURL('file://' + __dirname + '/index.html');
        ipc.on('lancer', function (e) {
            console.log("Coucou");
        })
    }
}