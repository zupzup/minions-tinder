var chai = require('chai');
window.expect = chai.expect;
require('events').EventEmitter.prototype._maxListeners = 0;
require('core-js/es5');
var context = require.context('./scripts', true, /spec\.js$/);
context.keys().forEach(context);

