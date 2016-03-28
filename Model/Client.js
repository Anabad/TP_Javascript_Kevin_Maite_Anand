'use strict';

const getRandom = require('./fonctionsUtiles').getRandom;
const CST =require('./Constantes');

module.exports = class Client {
  constructor() {
    this.seuilDeResistance = getRandom(CST.SEUIL_RESISTANCE_MIN, CST.SEUIL_RESISTANCE_MAX);
    this.attente = 0;
  }

  static choixRepas(listeRepasDispo) {
    return listeRepasDispo[getRandom(0, listeRepasDispo.length - 1)];
  }
};
