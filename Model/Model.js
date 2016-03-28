'use strict';

const Horloge = require('./Horloge');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const MarcherRungis = require('./MarcherRungis');
const Horaire = require('./Horaire');
const getRandom = require('./fonctionsUtiles').getRandom;
const Event = require('./Event');

var CST = require('./Constantes');


module.exports = class Model {
  constructor(view) {
    this.event = new Event();
    this.view = view;
    this.horloge = new Horloge();
    this.restaurants = [];
    this.restaurants.push(new Restaurant(0, new Horaire([11, 18], [15, 23])));
    this.restaurants.push(new Restaurant(1, new Horaire([1], [23])));
    this.restaurants.push(new Restaurant(2, new Horaire([1], [23])));
    this.marcherRungis = new MarcherRungis();
  }

  lancer() {
    this.view.affichageSimulation();
    for (var i = 0; i < this.restaurants.length; i++) {
      this.view.updateIngredient(i, this.restaurants[i].stock.ingredients);
      this.view.updateStatut(i, this.restaurants[i].getStatut());
    }
    this.connectionEvent();
    this.horloge.lancer();
  }

  creationClient() {
    var ajouterClient = getRandom(0, 10);
    if (ajouterClient == 10) {
      this.repartirClient(new Client());
    }
  }

  repartirClient(client) {
    if (this.restaurants.length != 0) {
      var restaurant = getRandom(0, this.restaurants.length - 1);
      if (this.restaurants[restaurant].getStatut() == "Ouvert") {
        this.restaurants[restaurant].servirClient(client);
      }
    }
    else {
      setTimeout(()=> {
        this.repartirClient(client)
      }, CST.TEMPS_ATTENTE);
    }
  }

  connectionEvent() {
    this.event.on('updateIngredient', (indice) => {
      this.view.updateIngredient(indice, this.restaurants[indice].stock.ingredients);
    });
    this.event.on('updateStatut', (indice, statut) => {
      this.view.updateStatut(indice, statut);
    });
    this.event.on('clientServi', (indice, clientServi) => {
      this.view.updateClientServi(indice, clientServi);
    });
    this.event.on('noter', (indice, note) => {
      this.view.updateNote(indice, note);
    });
    this.event.on('play', () => {
      console.log("Play");
    });
    this.event.on('pause', () => {
      console.log("Pause");
    });
    this.event.on('stop', () => {
      console.log("stop");
    });
    this.horloge.signal.on('Minute', (heure, minute) => {
      this.creationClient();
      this.view.setHorloge(heure, minute);
    });

  }

  afficherRestaurantStatut() {
    for (var i = 0; i < this.restaurants.length; i++) {
      console.log('Le restaurant ' + i + ' est ' + this.restaurants[i].getStatut());
    }
  }
};
