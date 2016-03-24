'use strict';

const Model = require('./Client');
const View = require('./Horaire');


let view;
let model;

function simulation() {
  view = new View();
  model = new Model(view);
  model.lancer();
}
