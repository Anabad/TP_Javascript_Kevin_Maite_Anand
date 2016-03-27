'use strict';

const EventEmitter = require('events').EventEmitter;
let instance = null;

module.exports = class Horloge extends EventEmitter{
  constructor() {
    if (!instance) {
      super();
      instance = this;
    }
    return instance;
  }
};
