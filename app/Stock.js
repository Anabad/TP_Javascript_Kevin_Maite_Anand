'use strict';

var creationTableauVide = require('./fonctionsUtiles.js');

// Const créé pour le test

const NOMBRE_INGREDIENT = 10;
const STOCK_DEPART = 20;


class Stock {
    constructor() {
        this.ingredient = this.__initialiserIngredient();
        this.afficherStock();
    }

    __initialiserIngredient(){
        var ingredient = creationTableauVide(NOMBRE_INGREDIENT);
        for (var i = 0; i < ingredient.length; i++) {
            ingredient[i] = STOCK_DEPART;
        }
        return ingredient;
    }
    afficherStock(){
        for (var i = 0; i < this.ingredient.length; i++) console.log(this.ingredient[i]);
    }
}

// Petit test
var s = new Stock();
s.afficherStock();