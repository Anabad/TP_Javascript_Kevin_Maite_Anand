'use strict';

// var Horloge = require('./Horloge');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const Horaire = require('./Horaire');
const getRandom = require('./fonctionsUtiles').getRandom;

GLOBAL.HORLOGE = require('../index');

const TEMPS_ATTENTE = 2 * 1000;
const NOMBRE_MINUTES_HEURES = 100;

let instance = null;

module.exports = class Model {
  constructor(controleur) {
    if (!instance) {
      instance = this;
      this.controleur = controleur;
      this.controleur.setModel(this);
      this.restaurants = [];
      this.restaurants.push(new Restaurant(new Horaire([11, 18], [15, 23])));
      this.restaurants.push(new Restaurant(new Horaire([1], [23])));
      this.restaurants.push(new Restaurant(new Horaire([1], [23])));
      this.clients = [];
    }
    return instance;
  }

  lancer() {
    console.log('On est la');
    GLOBAL.HORLOGE.lancerHorloge();
    // GLOBAL.HORLOGE.signal.on('5Minutes', (minute) =>
    // this.__creationClient());
    GLOBAL.HORLOGE.signal.on('5Minutes', () => this.__creationClient());
    GLOBAL.HORLOGE.signal.on('Heure',
      (heure) => console.log(`il est ${heure} heure au marché`));

  }

  __creationClient() {
    this.clients.push(new Client());
    this.__repartirClient(this.clients[this.clients.length - 1]);
  }

  __repartirClient(client) {
    var listRestaurantsOuverts = [];
    for (var i = 0; i < this.restaurants.length; i++) {
      if (this.restaurants[i].possibiliterServir(
          GLOBAL.HORLOGE.date / (NOMBRE_MINUTES_HEURES / 5))) {
        listRestaurantsOuverts.push(i);
      }
    }
    if (listRestaurantsOuverts.length) {
      this.restaurants[listRestaurantsOuverts[getRandom(0,
        listRestaurantsOuverts.length - 1)]].servirClient(client);
    } else {
      setTimeout(()=> this.__repartirClient(client), TEMPS_ATTENTE);
    }
  }
};
