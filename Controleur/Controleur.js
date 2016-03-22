'use strict';

module.exports = class Controleur {
    constructor(){
        this.view=null;
        this.model=null;
    }
    setView(view){
        this.model=view;
    }
    setModel(model){
        this.model=model;
    }
}