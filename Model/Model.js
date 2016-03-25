'use strict';

var Horloge = require('./Horloge');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const Horaire = require('./Horaire');
const getRandom = require('./fonctionsUtiles').getRandom;


const TEMPS_ATTENTE = 2 * 1000;
const NOMBRE_MINUTES_HEURES = 100;
const NOMBRE_CLIENT_CREE_MIN = 3;
const NOMBRE_CLIENT_CREE_MAX = 5;

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
    this.horloge.signal.on('Heure', (heure) => this.creationClient());

  }

  creationClient() {
    var nombreDeClientAAjouter = getRandom(NOMBRE_CLIENT_CREE_MIN, NOMBRE_CLIENT_CREE_MAX);
    for (var i = 0; i < nombreDeClientAAjouter; i++) {
      this.clients.push(new Client());
      this.repartirClient(this.clients[this.clients.length - 1]);
    }
  }

  repartirClient(client) {
    var clientServi = false;
    while(!clientServi){
      if (this.restaurants.length != 0) {
        var restaurantChoisi  = this.restaurants[[getRandom(0, this.restaurants.length - 1)]]
        if (restaurantChoisi.possibiliterServir(this.horloge.date)){
          clientServi = true;
          restaurantChoisi.servirClient(client);
        }
        else {
          setTimeout(() => {} , TEMPS_ATTENTE);
        }
      }
      else {
        setTimeout(()=>{} , TEMPS_ATTENTE);
      }
    }
  }
}
