'use strict';

let Buttoner = require('./buttoner');
let rippleClassTables = require('../classTables/ripple');

module.exports = Buttoner({
    defaultProps: {
        style: (theme) => {
            return theme.flatOneLineBulk;
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
