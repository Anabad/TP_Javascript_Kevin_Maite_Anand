'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;


let instance = null;

module.exports = class View extends BrowserWindow {
    constructor(controleur) {
        if(!instance){
            super({
                width: 800,
                height: 600
            });
            instance = this;
            this.controleur = controleur;
            this.controleur.setView(this);
        }
        return instance;
    }

    lancer() {
        document.write("salut");
    }
}
