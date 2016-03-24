'use strict';

var getRandom = require('./fonctionsUtiles.js').getRandom;

module.exports = class Client {
  constructor() {
    this.seuilDeResistance = getRandom(10, 40);
    this.attente = 0;
  }

  static choixRepas(listeRepasDispo) {
    return getRandom(0, listeRepasDispo.length - 1);
  }
};
