'use strict';


let instance = null;

module.exports = class Controleur {
    constructor(){
        if(!instance){
            instance = this;
            this.view=null;
            this.model=null;
        }

        return instance;
    }
    setView(view){
        this.model=view;
    }
    setModel(model){
        this.model=model;
    }
}