// var a = require('./a');

var oApp = document.getElementById('app');

import modB from './b';

// require('style!css!./style.css');
require('./style.css');

oApp.innerHTML = '<h3>welcome Webpack</h3>'+(modB.a+modB.b);
