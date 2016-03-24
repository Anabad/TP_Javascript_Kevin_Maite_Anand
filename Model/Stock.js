'use strict';

// var creationTableau = require('./fonctionsUtiles').creationTableau;
let usefulFunctions = require('./fonctionsUtiles');
const creationTableau = usefulFunctions.creationTableau;
const getRandom = usefulFunctions.getRandom;
usefulFunctions = null;

GLOBAL.HORLOGE = require('../index.js');
// Const créé pour le test

const TEMPS_ATTENTE_MIN_RAVITAILLEMENT = 15;
const TEMPS_ATTENTE_MAX_RAVITAILLEMENT = 115;
const NOMBRE_INGREDIENT = 10;
const STOCK_DEPART = 20;
const STOCK_DESIRE = 20;
const SEUIL_CRITIQUE = 5;


module.exports = class Stock {
  constructor() {
    this.ingredient = this.initialiserIngredient();
  }

  /**
   *  INITIALISER INGREDIENT
   *
   *  Cette fonction va initialiser le stock en ingredient lors de se création
   * @returns {*}
   * @private
   */
  static initialiserIngredient() {
    return creationTableau(NOMBRE_INGREDIENT, STOCK_DEPART);
  }

  ravitaillement() {
    setTimeout(() => {
      for (var i = 0; i < this.ingredient.length; i++) {
        this.ingredient[i] = STOCK_DESIRE;
      }
    }, getRandom(TEMPS_ATTENTE_MIN_RAVITAILLEMENT,
      TEMPS_ATTENTE_MAX_RAVITAILLEMENT));
  }

  /**
   *  RESTE INGREDIENT
   *
   * Ici le fonction reste ingredient va tester plusieurs choses en fonction de
   * ce qu'on lui donnera Si:
   *       - null alors la fonction testera tous les ingrédients pour voir si
   * ils ne sont pas en dessous du seuil critique
   *       - un indice alors la fonction testera simplement un seul ingrédient
   *           Il faudra donner en option : 'Indice'
   *       - une recette alors la fonction regardera si il reste assez
   * d'ingrédient pour la recette Il faudra donner en option : 'Recette'
   *
   * @param test
   * @param option
   * @returns {boolean}
   * @private
   */
  resteAssezIngredient(test, option) {
    if (!test) {
      for (var i = 0; i < this.ingredient.length; i++) {
        if (!this.resteAssezIngredientIndice(i, SEUIL_CRITIQUE)) {
          return false;
        }
      }
    } else if (option == 'Indice' && typeof test === 'number' &&
      test < this.ingredient.length) {
      return this.resteAssezIngredientIndice(test);
    } else if (option == 'Recette') {

    } else {
      console.log('Parametres mals rentrés');
    }
  }

  /**
   *  RESTE INGREDIENT INDICE
   *
   *  Cette fonction retourne vrai si le nombre d'ingrédient donné par l'indice
   * est supérieur à la valeur donné
   *
   * @param indice
   * @param valeur
   * @returns {boolean}
   */
  static resteAssezIngredientIndice(indice, valeur) {
    return (indice >= valeur);
  }

  /**
   *  RETIRER INGREDIENTS
   *
   *  Cette fonction retire les ingrédients nécessaires dans le stock pour
   * faire une recette, elle retourne true si tout s'est bien passé false si il
   * y n'y avait pas assez d'ingrédient. Puis elle testera si il reste assez
   * d'ingrédient pour le futur, si non, elle lancera un ravitaillement
   *
   *  C'est la fonction que le restaurant utilisera pour retirer des
   * ingrédients
   *
   * @param recette
   * @returns {boolean}
   */
  retirerIngredients(recette) {
    //if (recette !== '[object Array]') throw 'Mauvais type rentré';
    if (!this.resteAssezIngredient(recette, 'Recette')) {
      return false;
    }

    for (var i = 0; i < this.ingredient.length; i++) {
      this.ingredient[i] -= recette[i];
    }
    return true;
    // if (!this.resteAssezIngredient(null, null)) this.ravitaillement();
  }

  /**
   *  AFFICHER STOCK
   *
   *  Cette fonction affiche le stock restant de chaque ingrédient
   */
  afficherStock() {
    for (var i = 0; i < this.ingredient.length; i++) {
      console.log(this.ingredient[i]);
    }
  }
};
