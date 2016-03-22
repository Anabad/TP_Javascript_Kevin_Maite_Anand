'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

module.exports = class View {
    constructor(controleur) {
        this.controleur = controleur;
        this.controleur.setView(this);
        this.mainWindows = null;
    }

    commencer() {
        app.on('ready', function () {
            this.mainWindows = new BrowserWindow({
                width: 800,
                height: 600
            })
            this.mainWindows.loadURL('file://' + __dirname + '/index.html');
        })
    }
}