'use strict';

let Buttoner = require('./buttoner');
let ripple = require('../animation/ripple');

module.exports = Buttoner({
    defaultProps: {
        style: (theme) => {
            return theme.flatOneLineBulk;
        }
    },

    classTable: (theme) => {
        return {
            '@keyframes ripple': ripple,
            'btn::after': theme.flatRippleMask,
            'btn:hover': theme.actions.flatHover,
            'btn:active': theme.actions.flatActive,
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
