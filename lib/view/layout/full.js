'use strict';

let {n} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {styles} = require('../../util/helper');

module.exports =
    lumineView(({props, children}) => { return n('div', props, children); }, {
      defaultProps : {style : (theme) => styles(theme.fullParent)},

      defaultChildren : [ '' ]
    });
