'use strict';


var View = require('./scripts/View.js');
var Model = require('../Model/Model.js');


let view;
let model;

function simulation() {
  view = new View();
  model = new Model(view);
  model.lancer();
}
