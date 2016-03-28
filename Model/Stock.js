'use strict';

const Horloge = require('./Horloge');
let usefulFunctions = require('./fonctionsUtiles');
const creationTableau = usefulFunctions.creationTableau;
const getRandom = usefulFunctions.getRandom;
usefulFunctions = null;
const Event = require('./Event');
const CST = require('./Constantes');


module.exports = class Stock {
  constructor(indice) {
    this._statut = "Distribuer";
    this.indiceRestaurant = indice;
    this.event = new Event();
    this.ingredients = this.initialiserIngredient();
    this.event.on('updateIngredient', (indice) => {
      if (!this.resteAssezIngredient(null, null)) {
        this.statut("DistribuerRavitailler");
      }
    });
  }
  statut(statut){
    if(this._statut != statut) {
      this._statut = statut;
      if (this._statut == "DistribuerRavitailler") {
        this.ravitaillement();
      }
    }
  }
  /**
   *  INITIALISER INGREDIENT
   *
   *  Cette fonction va initialiser le stock en ingredient lors de se création
   * @returns {*}
   * @private
   */
  initialiserIngredient() {
    return creationTableau(CST.NOMBRE_TYPE_INGREDIENT, CST.STOCK_DEPART);
  }

  ravitaillement() {
    setTimeout(() => {
      for (var i = 0; i < this.ingredients.length; i++) {
        this.ingredients[i] = CST.STOCK_DESIRE;
      }
      this.statut("Distribuer");
      this.event.emit('updateIngredient', this.indiceRestaurant);
    }, getRandom(CST.TEMPS_ATTENTE_MIN_RAVITAILLEMENT,
      CST.TEMPS_ATTENTE_MAX_RAVITAILLEMENT));
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
      for (var i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i] < CST.SEUIL_CRITIQUE) {
          return false;
        }
      }
    } else if (option == 'Recette') {
      for ( i = 0; i < test.length; i++) {
        if (test[i] == 1 && this.ingredients[i] == 0) {
          return false;
        }
      }
    }
    return true;
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
    if (!this.resteAssezIngredient(recette, 'Recette')) {
      console.log("Tu ne devrais pas être la");
      return false;
    }

    for (var i = 0; i < this.ingredients.length; i++) {
      this.ingredients[i] -= recette[i];
    }
    this.event.emit('updateIngredient', this.indiceRestaurant);
    return true;
    // if (!this.resteAssezIngredient(null, null)) this.ravitaillement();
  }

  /**
   *  AFFICHER STOCK
   *
   *  Cette fonction affiche le stock restant de chaque ingrédient
   */
  afficherStock() {
    console.log('AFFICHER STOCK');
    console.log('Il y a ' + this.ingredients.length + ' types d\'ingrédients');
    for (var i = 0; i < this.ingredients.length; i++) {
      console.log('Ingrédient ' + (i + 1) + ' ' + this.ingredients[i]);
    }
  }
}
;
