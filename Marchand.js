/**
 * Created by admin on 18/03/2016.
 */
'use strict'

const NBINGREDIENTS = 20;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}


class Restaurateur {

    constructor(horaire) {
        this.nombreRecette = getRandom(5,10);
        this.horaireRestaurateur=horaire;


    }

    rentreRestaurant(){

        if(this.horaireRestaurateur.estOuvert(heure)){

        }
}

    ravitaille(){
        tempsRavitaillement=getRandom(15,115);
    }

}

//Gere les stocks
class Stock{

    constructor{
        for (i<0;i<nNBINGREDIENTS;i++){
            ingredient[i]=getRandom(20,30);
            max[i]=ingredient[i];
        }
    }

    ravitaille(){
        for (i<0;i<nNBINGREDIENTS;i++){
            ingredient[i]=max[i];
        }
    }
}

}