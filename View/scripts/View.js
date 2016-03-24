'use strict';

const electron = require('electron');
var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = class View{
  constructor(){

  }
  setHeure(heure){
    document.write(heure);
  }
}
