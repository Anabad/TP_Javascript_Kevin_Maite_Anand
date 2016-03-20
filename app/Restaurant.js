'use strict';

class Restaurant{
    constructor(horaire) {
        this.recette = new Recette()[getRandom(5, 10)];
        this.horaireRestaurateur = horaire;
        this.stock = new Stock();

    }

    possibiliterServir() {
        return this.horaireRestaurateur.estOuvert(heure) ? true : false;
    }
    servirClient(){

    }

}