'use strict';

let Buttoner = require('./buttoner');
let rippleClassTables = require('../classTables/ripple');
let {
  styles
} = require('../../util/helper');

module.exports = Buttoner({
  defaultProps: {
    style: (theme) => {
      return styles(theme.flatOneLineBulk, {
        cursor: 'pointer'
      });
    }
  },

  classTable: (theme) => {
    return Object.assign(rippleClassTables({
      theme
    }), {
      'btn:hover': theme.actions.flatHover,
      'btn:active': theme.actions.flatActive,
      'btn:focus': theme.actions.focus
    });
  }
});
