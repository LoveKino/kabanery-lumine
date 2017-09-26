'use strict';

let lumineViewer = require('./lumineViewer');

module.exports = (viewFun, options) => lumineViewer(viewFun)(options);
