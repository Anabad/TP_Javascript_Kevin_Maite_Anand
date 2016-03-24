'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = class View{
  constructor(){

  }
  affichageSimulation(){
    var html="";
    html = html.concat('<br><br>');
    document.body.innerHTML = html;
    //document.write(heure);
  }
}
