'use strict';

let ripple = require('../animation/ripple');
let Buttoner = require('./buttoner');
let {
    styles
} = require('../../util/helper');

module.exports = Buttoner({
    defaultProps: {
        style: (theme) => styles(theme.oneLineBulk)
    },

    classTable: (theme) => {
        return {
            '@keyframes ripple': ripple,
            'btn::after': theme.flatRippleMask,
            'btn:hover': theme.actions.hover,
            'btn:active': theme.actions.active,
            'btn:focus': theme.actions.focus,
            'btn:focus:not(:active)::after': ({
                getClassName
            }) => {
                return {
                    animation: `${getClassName('ripple')} 1s ease-out`
                };
            }
        };
    }
});
