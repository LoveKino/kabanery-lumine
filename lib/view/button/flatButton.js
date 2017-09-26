'use strict';

let Buttoner = require('./buttoner');

module.exports = Buttoner({
    defaultProps: {
        style: (theme) => {
            return theme.flatOneLineBulk;
        }
    },

    classTable: (theme) => {
        return {
            'btn:hover': theme.actions.flatHover,
            'btn:active': theme.actions.flatActive,
            'btn:focus': theme.actions.focus
        };
    }
});
