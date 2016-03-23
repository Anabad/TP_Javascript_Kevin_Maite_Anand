/**
 * Created by tom on 22/03/16.
 */


var Horloge = require('./Model/Horloge.js');
var View = require('./View/View.js');
var Controleur = require('./Controleur/Controleur.js');
var Model = require('./Model/Model.js');
var app = require('app');

GLOBAL.HORLOGE = new Horloge();
GLOBAL.controleur = new Controleur();
GLOBAL.view = new View(controleur);
GLOBAL.model = new Model(controleur);

app.on('ready', function () {
    GLOBAL.view.commencer();
})
