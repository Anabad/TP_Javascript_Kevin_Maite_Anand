'use strict';

var getRandom = require('./fonctionsUtiles.js').getRandom;
var CST =require('./Constantes');

module.exports = class Client {
  constructor() {
    this.seuilDeResistance = getRandom(CST.SEUIL_RESISTANCE_MIN, CST.SEUIL_RESISTANCE_MAX);
    this.attente = 0;
  }

  choixRepas(listeRepasDispo) {
    return getRandom(0, listeRepasDispo.length - 1);
  }
};
