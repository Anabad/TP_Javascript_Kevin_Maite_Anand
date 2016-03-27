'use strict';

var Horloge = require('./Horloge');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const Horaire = require('./Horaire');
const getRandom = require('./fonctionsUtiles').getRandom;
//var chalk = require('chalk');

var CST =require('./Constantes');

module.exports = class Model {
  constructor(view) {
    this.view = view;
    this.horloge = new Horloge();
    this.restaurants = [];
    this.restaurants.push(new Restaurant(new Horaire([11, 18], [15, 23])));
    this.restaurants.push(new Restaurant(new Horaire([1], [23])));
    this.restaurants.push(new Restaurant(new Horaire([1], [23])));
    this.clients = [];
  }


  lancer() {
    this.view.affichageSimulation();
    this.horloge.lancer();
    this.horloge.signal.on('Heure', (heure) => {
      this.creationClient();
      this.view.setHorloge(heure);
    });

  }

  creationClient() {
    console.log('Il est ' + this.horloge.date + 'h');
    var nombreDeClientAAjouter = getRandom(CST.NOMBRE_CLIENT_CREE_MIN, CST.NOMBRE_CLIENT_CREE_MAX);
    for (var i = 0; i < nombreDeClientAAjouter; i++) {
      this.clients.push(new Client());
      this.repartirClient(this.clients[this.clients.length - 1]);
    }
  }

  repartirClient(client) {
    if (this.restaurants.length != 0) {
      var restaurantChoisi = this.restaurants[[getRandom(0, this.restaurants.length - 1)]];
      if (restaurantChoisi.possibiliterServir(this.horloge.date)) {
        restaurantChoisi.servirClient(client);
      }
    }
    else {
      setTimeout(()=> {this.repartirClient(client)
      }, CST.TEMPS_ATTENTE);
    }
  }
};
