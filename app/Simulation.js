'use strict';

var Horloge = require('./Horloge.js');
var Restaurant = require('./Restaurant.js');
var Client = require('./Client.js');
var Horaire = require('./Horaire.js');
var getRandom = require('./fonctionsUtiles.js').getRandom;

GLOBAL.HORLOGE = require('./main.js');

const TEMPS_ATTENTE = 2*1000;
const NOMBRE_MINUTES_HEURES = 100;

module.exports = class Simulation {
    constructor() {
        this.restaurants = [];
        this.restaurants.push(new Restaurant(new Horaire([11,18],[15,23])));
        this.restaurants.push(new Restaurant(new Horaire([1],[23])));
        this.restaurants.push(new Restaurant(new Horaire([1],[23])));
        this.clients = [];
    }

    lancer() {
        GLOBAL.HORLOGE.lancerHorloge();
        GLOBAL.HORLOGE.signal.on('5Minutes', (minute) => this.__creationClient());
        GLOBAL.HORLOGE.signal.on('Heure', (heure) => console.log(`il est ${heure} heure au marché`));

    }

    __creationClient() {
        this.clients.push(new Client());
        this.__repartirClient(this.clients[this.clients.length - 1])
    }

    __repartirClient(client) {
        var listRestaurantsOuverts = [];
        for (var i = 0;i<this.restaurants.length; i++) {
            if (this.restaurants[i].possibiliterServir(GLOBAL.HORLOGE.date/(NOMBRE_MINUTES_HEURES / 5))){
                listRestaurantsOuverts.push(i);

            }
        }
        if (listRestaurantsOuverts.length  != 0) {
            this.restaurants[listRestaurantsOuverts[getRandom(0,listRestaurantsOuverts.length-1)]].servirClient(client);
        }
        else {
            setTimeout(()=> this.__repartirClient(client), TEMPS_ATTENTE);
        }
    }

}
