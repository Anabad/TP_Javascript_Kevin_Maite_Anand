'use strict';

var Horloge = require('./Horloge');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const Horaire = require('./Horaire');
const getRandom = require('./fonctionsUtiles').getRandom;


const TEMPS_ATTENTE = 2 * 1000;
const NOMBRE_MINUTES_HEURES = 100;
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
        this.horloge.lancerHorloge();
        this.horloge.signal.on('5Minutes', (minute) => this.creationClient());
        this.horloge.signal.on('Heure', (heure) => this.view.setHeure(heure));

    }

    creationClient() {
        this.clients.push(new Client());
        this.repartirClient(this.clients[this.clients.length - 1])
    }

    repartirClient(client) {
        var listRestaurantsOuverts = [];
        for (var i = 0; i < this.restaurants.length; i++) {
            if (this.restaurants[i].possibiliterServir(this.horloge.date / (NOMBRE_MINUTES_HEURES / 5))) {
                listRestaurantsOuverts.push(i);

            }
        }
        if (listRestaurantsOuverts.length != 0) {
            this.restaurants[listRestaurantsOuverts[getRandom(0, listRestaurantsOuverts.length - 1)]].servirClient(client);
        }
        else {
            setTimeout(()=> this.repartirClient(client), TEMPS_ATTENTE);
        }
    }
}
