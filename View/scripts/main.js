'use strict';


const View = require('./scripts/View');
const Model = require('../Model/Model');
const Event = require('../Model/Event');

let event = new Event();
let view;
let model;

function simulation() {
  view = new View();
  model = new Model(view);
  model.lancer();
}
function play(){
  event.emit('play');
}
function pause(){
  event.emit('pause');
}
function stop(){
  event.emit('stop');
}
