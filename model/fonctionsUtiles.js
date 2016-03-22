'use strict';


var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var creationTableau = function (taille, valeur) {
    var tab = [];
    for (var i = 0; i < taille; i++) {
        tab.push(valeur);
    }
    return tab;
}

var remplirTableauAleatoire = function (tab, min, max) {
    for (var i = 0; i < tab.length; i++) {
        tab[i] = getRandom(min, max);
    }
}


module.exports = {
    getRandom: getRandom,
    creationTableau: creationTableau,
    remplirTableauAleatoire: remplirTableauAleatoire
};