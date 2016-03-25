'use strict';

const TEMPS_HEURE = 1000;

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
      this.signal.emit('Heure', this.date++ % 24);
    }, TEMPS_HEURE);
  }


  arreterHorloge() {
    if (this.interv) {
      setTimeout(()=> clearInterval(this.interv), 0);
    }
  }
};
