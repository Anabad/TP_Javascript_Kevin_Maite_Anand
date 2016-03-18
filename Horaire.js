'use strict'

class Horaire {
    /* Toutes les valeurs de la classe sont en minutes ( en sachant qu'une heure est égale à 100 minutes */

    constructor(debut, fin) {
        this.debut = debut;
        this.fin = fin;
    }

    estOuvert(heure) {
        var test = true
        for (var i = 0; i < this.debut.length; i++) {
            if (heure >= this.debut[i] && heure <= this.fin[i]) {
                return true
            } else {
                test = false
            }
        }
        return test
    }
}


if (!module.parent) {
    var marchand = new Horaire([500], [1400]);
    var restaurateurB = new Horaire([1100, 1800], [1500, 2300]);
    /*  Test de la fonction "estOuvert"  */
    console.log(marchand.estOuvert(700))  // Doit etre vrai
    console.log(marchand.estOuvert(1500)) // Doit etre faux
    console.log(restaurateurB.estOuvert(1600)) // Doit etre faux
    console.log(restaurateurB.estOuvert(1900)) // Doit etre vrai
}