'use strict';

const Event = require('./Event');
const Horloge = require('./Horloge');
const Horaire = require('./Horaire');

module.exports = class MarcherRungis {
  constructor() {
    this.horloge = new Horloge();
    this.horaireMarcher = new Horaire([5], [14]);
    this.event = new Event();
    this.horloge.signal.on('Heure', (heure) => {
      if(this.horaireMarcher.estOuvert(heure)){
        this.event.emit('Marcher','Ouvert');
      }
      else{
        this.event.emit('Marcher','Fermé');
      }
    });
  }

};
