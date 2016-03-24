'use strict';

var Stock = require('./Stock.js');
var getRandom = require('./fonctionsUtiles.js').getRandom;
var creationTableau = require('./fonctionsUtiles.js').creationTableau;
var remplirTableauAleatoire = require(
  './fonctionsUtiles.js').remplirTableauAleatoire;


const TEMPS_PREPARATION_MIN = 1000; // Correspond à 5 minutes dans notre horloge
const TEMPS_PREPARATION_MAX = 10 * 1000; // Correspond à 50 minutes dans notre
// horloge
const NOMBRE_DE_RECETTE_MIN = 3;
const NOMBRE_DE_RECETTE_MAX = 5;
const NOMBRE_TYPE_INGREDIENT = 5;
const NOMBRE_INGREDIENT_MIN_RECETTE = 1;
const NOMBRE_INGREDIENT_MAX_RECETTE = 3;

module.exports = class Restaurant {
  constructor(horaire) {
    this.recette = Restaurant.__creerRecette();
    this.horaireRestaurateur = horaire;
    this.stock = new Stock();
    this.note = 0;

  }

  static __creerRecette() {
    var recette = creationTableau(
      getRandom(NOMBRE_DE_RECETTE_MIN, NOMBRE_DE_RECETTE_MAX), []);
    for (let i = 0; i < recette.length; i++) {
      recette[i].push(
        remplirTableauAleatoire(creationTableau(NOMBRE_TYPE_INGREDIENT, 0),
          getRandom(NOMBRE_INGREDIENT_MIN_RECETTE,
            NOMBRE_INGREDIENT_MAX_RECETTE)));
    }
    return recette;
  }

  __listeRepasDispo() {
    var repasDispo = [];
    for (var i = 0; i < this.recette.length; i++) {
      if (Stock.resteAssezIngredientIndice(this.recette[i])) {
        repasDispo.push(i);
      }
    }
    return repasDispo;
  }

  possibiliterServir(heure) {
    if (!this.horaireRestaurateur.estOuvert(heure)) {
      return false;
    }
    for (var i = 0; i < this.recette.length; i++) {
      if (Stock.resteAssezIngredientIndice(this.recette[i])) {
        return true;
      }
    }
    return false;
  }

  servirClient(client) {
    console.log('on sert un client');
    var choix = client.choixRepas(this.__listeRepasDispo());
    client.attente = getRandom(TEMPS_PREPARATION_MIN, TEMPS_PREPARATION_MAX);
    setTimeout(()=> this.stock.retirerIngredients(this.recette[choix]),
      client.attente);
    this.__notationRestaurant(client);
    console.log(this.note);
  }

  __notationRestaurant(client) {
    // Si le client est servi 10 minutes avant son seuil de résistance alors le
    // restaurant gagne 2 points
    if (client.attente < client.seuilDeResistance - 10) {
      this.note = this.note + 2;
    } else if (client.attente < client.seuilDeResistance + 5) {
      // Si le client est servi au maximum 5 minutes après son seuil de
      // résistance le restaurant gagne 1 point
      this.note = this.note + 1;
    }
    // Sinon il ne gagne rien
  }
};
 
