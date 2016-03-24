'use strict';

module.exports = class TestClass {
  constructor(name) {
    this.name = name;
  }

  identify() {
    console.log(`I am ${this.name}`);
  }
};
