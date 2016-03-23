'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

module.exports = class View extends BrowserWindow{
    constructor(controleur) {
        super({
            width: 800,
            height: 600
        });
        this.controleur = controleur;
        this.controleur.setView(this);
    }
}