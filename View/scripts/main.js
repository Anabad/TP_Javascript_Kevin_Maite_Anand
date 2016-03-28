'use strict';


var View = require('./scripts/View');
var Model = require('../Model/Model');

let view;
let model;

function simulation() {
  view = new View();
  model = new Model(view);
  model.lancer();
}
