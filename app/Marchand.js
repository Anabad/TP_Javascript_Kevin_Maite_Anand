'use strict';


class Marchand {
    constructor(horaire) {
        this.horaireRestaurateur = (Horaire)horaire;
    }
    estOuvert(){
        return this.horaireRestaurateur.estOuvert()
    }
}
