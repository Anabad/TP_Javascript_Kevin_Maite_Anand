/**
 * Created by tom on 22/03/16.
 */


var Horloge = require('./Model/Horloge.js');
var View = require('./View/View.js');
var Controleur = require('./Controleur/Controleur.js');
var Model = require('./Model/Model.js');


GLOBAL.HORLOGE = new Horloge();
GLOBAL.controleur = new Controleur();
GLOBAL.view = new View(controleur);
GLOBAL.model = new Model(controleur);

view.commencer();