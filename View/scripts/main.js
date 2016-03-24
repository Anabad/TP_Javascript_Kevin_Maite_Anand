'use strict';

const TC = require(`${process.cwd()}/Model/testClass`);

function lancerSimulation() {
  console.log('App started');
  let tc = new TC('bob');
  tc.identify();
}
