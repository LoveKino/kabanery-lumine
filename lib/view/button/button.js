'use strict';

let rippleClassTables = require('../classTables/ripple');
let Buttoner = require('./buttoner');
let {
    styles
} = require('../../util/helper');

module.exports = Buttoner({
    defaultProps: {
        style: (theme) => styles(theme.oneLineBulk)
    },

    classTable: (theme) => {
        console.log(Object.assign(rippleClassTables({
            theme
        }), {}));
        return Object.assign(rippleClassTables({
            theme
        }), {
            'btn:hover': theme.actions.hover,
            'btn:active': theme.actions.active,
            'btn:focus': theme.actions.focus
        });
    }
});
