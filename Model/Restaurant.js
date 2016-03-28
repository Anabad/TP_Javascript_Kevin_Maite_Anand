'use strict';

const Horloge = require('./Horloge');
const Client = require('./Client');
const Stock = require('./Stock');
const getRandom = require('./fonctionsUtiles').getRandom;
const CST = require('./Constantes');


module.exports = class Restaurant {
  constructor(indice, horaire) {
    this.indice = indice;
    this.horloge = new Horloge();
    this.event = new Event();
    this.recettes = this.creerRecette();
    this.horaireRestaurateur = horaire;
    this.stock = new Stock(this.indice);
    this._statut = 'Fermé';
    this._servi = 0;
    this._score = 0;
    this._scoreJournalier = 0;
    this.horloge.signal.on('Heure', (heure) => {
      this.possibiliterServir(heure);
    });
    this.horloge.signal.on('Jour', () => {
      this._scoreJournalier = 0;
      this.event.emit('scorerJournalier', this.indice, this._scoreJournalier);
    });
    this.event.on('updateIngredient', () => {
      this.possibiliterServir(this.horloge.heure);
    });

  }

  statut(statut) {
    if (this._statut != statut) {
      this._statut = statut;
      this.event.emit('updateStatut', this.indice, this._statut);
    }
  }

  getStatut() {
    return this._statut;
  }

  clientServi() {
    this._servi++;
    this.event.emit('clientServi', this.indice, this._servi);
  }

  scorer(score) {
    this._score += score;
    this.event.emit('scorer', this.indice, this._score);
  }

  scorerJournalier(score) {
    this._scoreJournalier +=
      score * this.horaireRestaurateur.nombreHeureFermeture();
    this.event.emit('scorerJournalier', this.indice, this._scoreJournalier);
    this.scorer(score * this.horaireRestaurateur.nombreHeureFermeture());
  }

  creerRecette() {
    var recette = new Array(getRandom(CST.NOMBRE_DE_RECETTE_MIN,
      CST.NOMBRE_DE_RECETTE_MAX));
    for (var i = 0; i < recette.length; i++) {
      recette[i] = new Array(CST.NOMBRE_TYPE_INGREDIENT);
      for (var j = 0; j < recette[i].length; j++) {
        recette[i][j] = getRandom(CST.NOMBRE_INGREDIENT_MIN_RECETTE,
          CST.NOMBRE_INGREDIENT_MAX_RECETTE);
      }
      if (this.testRecetteVide(recette[i])) {
        recette[i][getRandom(0, recette[i].length - 1)] = 1;
      }
    }
    return recette;
  }

  testRecetteVide(recette) {
    for (var i = 0; i < recette.length; i++) {
      if (recette[i] == 1) {
        return false;
      }
    }
    return true;
  }

  listeRepasDispo() {
    var repasDispo = [];
    for (var i = 0; i < this.recettes.length; i++) {
      if (this.stock.resteAssezIngredient(this.recettes[i], 'Recette')) {
        repasDispo.push(i);
      }
    }
    return repasDispo;
  }

  possibiliterServir(heure) {
    if (!this.horaireRestaurateur.estOuvert(heure)) {
      this.statut('Fermé');
      return false;
    }
    for (var i = 0; i < this.recettes.length; i++) {
      if (this.stock.resteAssezIngredient(this.recettes[i], 'Recette')) {
        this.statut('Ouvert');
        return true;
      }
    }
    console.log('PAS DE RECETTE');
    this.statut('Fermé');
    return false;
  }

  servirClient(client) {
    var choix = Client.choixRepas(this.listeRepasDispo());
    client.attente = getRandom(CST.TEMPS_PREPARATION_MIN,
      CST.TEMPS_PREPARATION_MAX);
    this.stock.retirerIngredients(this.recettes[choix]);
    this.clientServi();
    this.notationRestaurant(client);
  }

  notationRestaurant(client) {
    // Si le client est servi 10 minutes avant son seuil de résistance alors le
    // restaurant gagne 2 points
    if (client.attente <= client.seuilDeResistance - 10) {
      this.scorerJournalier(2);
    } else if (client.attente < client.seuilDeResistance + 5) {
      // Si le client est servi au maximum 5 minutes après son seuil de
      // résistance le restaurant gagne 1 point
      this.scorerJournalier(1);
    }
    // Sinon il ne gagne rien
  }

  afficherRecettes() {
    console.log('AFFICHER RECETTES');
    console.log('Il y a ' + this.recettes.length + ' recette');
    for (var i = 0; i < this.recettes.length; i++) {
      for (var j = 0; j < this.recettes[i].length; j++) {
        console.log('Ingredient ' + (j + 1) + ' : ' + this.recettes[i][j]);
      }
    }
  }
};

