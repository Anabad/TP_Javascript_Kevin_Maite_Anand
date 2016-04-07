'use strict';

const NOMBRE_DE_RESTAURANT = 3;
const NOMBRE_MINUTE_HEURE = 100;
const NOMBRE_HEURES_JOUR = 24;
const TEMPS_HEURE = 1000;
const TEMPS_ATTENTE = 2 * 1000;
const NOMBRE_CLIENT_CREE_MIN = 0;
const NOMBRE_CLIENT_CREE_MAX = 1;
const TEMPS_PREPARATION_MIN = 5;
const TEMPS_PREPARATION_MAX = 50;
// horloge
const NOMBRE_DE_RECETTE_MIN = 3;
const NOMBRE_DE_RECETTE_MAX = 5;
const NOMBRE_TYPE_INGREDIENT = 5;
const NOMBRE_INGREDIENT_MIN_RECETTE = 0;
const NOMBRE_INGREDIENT_MAX_RECETTE = 1;
const TEMPS_ATTENTE_MIN_RAVITAILLEMENT = 15 * TEMPS_HEURE /
    NOMBRE_MINUTE_HEURE;
const TEMPS_ATTENTE_MAX_RAVITAILLEMENT = 115 * TEMPS_HEURE /
    NOMBRE_MINUTE_HEURE;
const STOCK_DEPART = 40;
const STOCK_DESIRE = 40;
const SEUIL_CRITIQUE = 10;
// Client
const SEUIL_RESISTANCE_MIN = 10;
const SEUIL_RESISTANCE_MAX = 40;

module.exports = {
  NOMBRE_DE_RESTAURANT: NOMBRE_DE_RESTAURANT,
  NOMBRE_MINUTE_HEURE: NOMBRE_MINUTE_HEURE,
  NOMBRE_HEURES_JOUR : NOMBRE_HEURES_JOUR,
  TEMPS_HEURE: TEMPS_HEURE,
  TEMPS_ATTENTE: TEMPS_ATTENTE,
  NOMBRE_CLIENT_CREE_MIN: NOMBRE_CLIENT_CREE_MIN,
  NOMBRE_CLIENT_CREE_MAX: NOMBRE_CLIENT_CREE_MAX,
  // Correspond à 5 minutes dans notre horloge
  TEMPS_PREPARATION_MIN: TEMPS_PREPARATION_MIN,
  // Correspond à 50 minutes dans notre horloge
  TEMPS_PREPARATION_MAX: TEMPS_PREPARATION_MAX,
  NOMBRE_DE_RECETTE_MIN: NOMBRE_DE_RECETTE_MIN,
  NOMBRE_DE_RECETTE_MAX: NOMBRE_DE_RECETTE_MAX,
  NOMBRE_TYPE_INGREDIENT: NOMBRE_TYPE_INGREDIENT,
  NOMBRE_INGREDIENT_MIN_RECETTE: NOMBRE_INGREDIENT_MIN_RECETTE,
  NOMBRE_INGREDIENT_MAX_RECETTE: NOMBRE_INGREDIENT_MAX_RECETTE,
  TEMPS_ATTENTE_MIN_RAVITAILLEMENT: TEMPS_ATTENTE_MIN_RAVITAILLEMENT,
  TEMPS_ATTENTE_MAX_RAVITAILLEMENT: TEMPS_ATTENTE_MAX_RAVITAILLEMENT,
  STOCK_DEPART: STOCK_DEPART,
  STOCK_DESIRE: STOCK_DESIRE,
  SEUIL_CRITIQUE: SEUIL_CRITIQUE,
  // Client
  SEUIL_RESISTANCE_MIN: SEUIL_RESISTANCE_MIN,
  SEUIL_RESISTANCE_MAX: SEUIL_RESISTANCE_MAX
};
