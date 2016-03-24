'use strict';

const NOMBRE_MINUTES_HEURES = 100;
const TEMPS_SECONDE = 1000;

const EventEmitter = require('events').EventEmitter;

let instance = null;

module.exports = class Horloge {
  constructor() {
    if (!instance) {
      this.date = 1;
      this.signal = new EventEmitter();
      this.interv = null;
    }
    return instance;
  }

  lancerHorloge() {
    this.interv = setInterval(()=> {
      this.signal.emit('5Minutes', this.date++);
    }, TEMPS_SECONDE);
    this.interv = setInterval(()=> {
      this.signal.emit('Heure', (this.date / (NOMBRE_MINUTES_HEURES / 5)) % 24);
    }, TEMPS_SECONDE * (NOMBRE_MINUTES_HEURES / 5));
  }


  arreterHorloge() {
    if (this.interv) {
      setTimeout(()=> clearInterval(this.interv), 0);
    }
  }
};
