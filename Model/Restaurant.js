'use strict';

var Stock = require('./Stock.js');
var getRandom = require('./fonctionsUtiles.js').getRandom;


var CST =require('./Constantes');

module.exports = class Restaurant {
  constructor(horaire) {
    this.recettes = this.creerRecette();
    //this.afficherRecettes();
    this.horaireRestaurateur = horaire;
    this.stock = new Stock();
    this.note = 0;

  }

  creerRecette() {
    var recette = new Array(getRandom(CST.NOMBRE_DE_RECETTE_MIN, CST.NOMBRE_DE_RECETTE_MAX));
    for (var i = 0; i < recette.length; i++) {
      recette[i] = new Array(CST.NOMBRE_TYPE_INGREDIENT);
      for (var j = 0; j < recette[i].length; j++) {
        recette[i][j] = getRandom(CST.NOMBRE_INGREDIENT_MIN_RECETTE,CST.NOMBRE_INGREDIENT_MAX_RECETTE);
      }
      if (this.testRecetteVide(recette[i])){
        recette[i][getRandom(0,recette[i].length-1)] = 1;
      }
    }
    return recette;
  }
  testRecetteVide(recette){
    for(var i =0;i<recette.length;i++){
      if(recette[i]  == 0){
        return false;
      }
    }
    return true;
  }
  listeRepasDispo() {
    var repasDispo = [];
    for (var i = 0; i < this.recettes.length; i++) {
      if (this.stock.resteAssezIngredientIndice(this.recettes[i])) {
        repasDispo.push(i);
      }
    }
    return repasDispo;
  }

  possibiliterServir(heure) {
    if (!this.horaireRestaurateur.estOuvert(heure)) {
      return false;
    }

    for (var i = 0; i < this.recettes.length; i++) {
      if (this.stock.resteAssezIngredient(this.recettes[i],"Recette")) {
        return true;
      }
    }
    console.log("PAS DE RECETTE");
    return false;
  }

  servirClient(client) {
    var choix = client.choixRepas(this.listeRepasDispo());
    console.log("Choix: "+choix);
    client.attente = getRandom(CST.TEMPS_PREPARATION_MIN, CST.TEMPS_PREPARATION_MAX);
    console.log("Attente: "+client.attente);
    this.stock.retirerIngredients(this.recettes[choix]);
    this.notationRestaurant(client);
    console.log(this.note);
  }

  notationRestaurant(client) {
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

  afficherRecettes() {
    console.log("AFFICHER RECETTES");
    console.log("Il y a " + this.recettes.length + " recette");
    for (var i = 0; i < this.recettes.length; i++) {
      for (var j = 0; j < this.recettes[i].length; j++) {
        console.log("Ingredient " + (j + 1) + " : " + this.recettes[i][j]);
      }
    }
  }
};

