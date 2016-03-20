'use strict';

module.exports = getRandom;
module.exports = creationTableauVide;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function creationTableauVide(taille){
    var tab = [];
    for (var i = 0; i < taille; i++) {
        tab.push(0);
    }
    return tab;
}
