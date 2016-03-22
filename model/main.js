'use strict';

const NOMBRE_INGREDIENT = 10;
const STOCK_DEPART = 20;
const STOCK_DESIRE = 20;

var Horloge = require('./Horloge.js');
var Simulation = require('./Model.js');

function main(){

    var simulation = new Model();
    simulation.lancer();

}
GLOBAL.HORLOGE = new Horloge();
main();