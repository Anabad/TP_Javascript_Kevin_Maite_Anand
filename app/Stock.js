'use strict';

var creationTableauVide = require('./fonctionsUtiles.js');

// Const créé pour le test

const NOMBRE_INGREDIENT = 10;
const STOCK_DEPART = 20;
const SEUIL_CRITIQUE = 5;


class Stock {
    constructor() {
        this.ingredient = this.__initialiserIngredient();
        this.afficherStock();
    }

    __initialiserIngredient() {
        var ingredient = creationTableauVide(NOMBRE_INGREDIENT);
        for (var i = 0; i < ingredient.length; i++) {
            ingredient[i] = STOCK_DEPART;
        }
        return ingredient;
    }

    __ravitaillement() {

    }

    /**             RESTE INGREDIENT
     * Ici le fonction reste ingredient va tester plusieurs choses en fonction de ce qu'on lui donnera
     *   Si:
     *       - null alors la fonction testera toute les ingrédients pour voir si il ne sont pas en dessous du
     *           seuil critique
     *       - un indice alors la fonction testera simplement un seul ingrédient
     *           Il faudra donner en option : "Indice"
     *       - une recette alors la fonction regardera si il reste assez d'ingrédient pour la recette
     *           Il faudra donner en option : "Recette"
     **/
    __resteIngredient(test, option) {
        if (test == null) {
            for (var i = 0; i < this.ingredient.length; i++) {
                if (!this.__resteIngredientIndice(i)) {
                    return false;
                }
            }
        }
        else if (option == "Indice" && typeof test === 'number' && test < this.ingredient.length) {
            return this.__resteIngredientIndice(test);
        }
        else if (option == "Recette") {

        }
        else {
            console.log("Parametres mals rentrés")
        }
    }

    __resteIngredientIndice(indice) {
        if (indice <= SEUIL_CRITIQUE) {
            return false;
        }
        return true;
    }

    __retirerIngredients() {

    }

    afficherStock() {
        for (var i = 0; i < this.ingredient.length; i++) console.log(this.ingredient[i]);
    }

}

// Petit test
var s = new Stock();
s.afficherStock();