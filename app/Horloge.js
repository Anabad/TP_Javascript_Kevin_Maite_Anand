/**
 * Created by Anand on 18/03/2016.
 */
'use strict';

const DUREE_MINUTE = 10;
const DUREE_HEURE = 100 * DUREE_MINUTE;
const DUREE_JOUR = 24 * DUREE_HEURE;
const EventEmitter = require('events').EventEmitter;
const ev = new EventEmitter();
const interv = setInterval(() => ev.emit('hour', i++ % 24), DUREE_HEURE);
let i = 0;
ev.on('hour', (hour) => console.log(`il est ${hour}`));

setTimeout(() => clearInterval(interv), 48000);
