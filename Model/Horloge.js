'use strict';

const TEMPS_HEURE = 1000;

const EventEmitter = require('events').EventEmitter;


module.exports = class Horloge {
  constructor() {
      this.date = 1;
      this.signal = new EventEmitter();
      this.interv = null;

  }

  lancer() {
    console.log("salut");
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
