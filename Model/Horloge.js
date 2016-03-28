'use strict';

const EventEmitter = require('events').EventEmitter;
const CST = require('./Constantes');

let instance = null;

module.exports = class Horloge {
  constructor() {
    if (!instance) {
      instance = this;
      this.heure = 0;
      this.minute = 0;
      this.signal = new EventEmitter();
      this.interv = null;
    }
    return instance;
  }

  modifierDate() {
    this.minute = (this.minute + 1) % CST.NOMBRE_MINUTE_HEURE;
    if (this.minute === 0) {
      this.heure = (this.heure + 1) % 24;
      this.signal.emit('Heure', this.heure);
    }
    return this.minute;
  }

  lancer() {
    this.interv = setInterval(()=> {
      this.signal.emit('Minute', this.heure, this.modifierDate());
    }, CST.TEMPS_HEURE / CST.NOMBRE_MINUTE_HEURE);
  }

  /*
   arreterHorloge() {
   if (this.interv) {
   setTimeout(()=> clearInterval(this.interv), 0);
   }
   }
   */
};
