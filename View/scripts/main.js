'use strict';


const View = require('./scripts/View');
const Model = require('../Model/Model');

let view;
let model;

function simulation() {
  view = new View();
  model = new Model(view);
  model.lancer();
}
