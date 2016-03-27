'use strict';

const TEMPS_HEURE = 1000;

const EventEmitter = require('events').EventEmitter;

module.exports = class Horloge {
  constructor() {
      this.date = 0;
      this.signal = new EventEmitter();
      this.interv = null;

  }
  modifierDate(){
    this.date = (this.date +1) % 24;
    return this.date;
  }
  lancer() {
    console.log("salut");
    this.interv = setInterval(()=> {
      this.signal.emit('Heure', this.modifierDate());
    }, TEMPS_HEURE);
  }
  /*
  arreterHorloge() {
    if (this.interv) {
      setTimeout(()=> clearInterval(this.interv), 0);
    }
  }
  */
};
