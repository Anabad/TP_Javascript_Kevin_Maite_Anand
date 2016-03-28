'use strict';

module.exports = class Horaire {
  // Toutes les valeurs de la classe sont en minutes ( en sachant qu'une heure
  // est égale à 100 minutes

  constructor(debut, fin) {
    this.debut = debut;
    this.fin = fin;
  }

  estOuvert(heure) {
    var test = true;
    for (var i = 0; i < this.debut.length; i++) {
      if (heure >= this.debut[i] && heure < this.fin[i]) {
        return true;
      } else {
        test = false;
      }
    }
    return test;
  }
  afficherHoraire(){
    console.log('Les horaires sont');
    for (var i = 0; i < this.debut.length; i++) {
      console.log(this.debut[i]+' - '+this.fin[i]);
    }
  }
};
