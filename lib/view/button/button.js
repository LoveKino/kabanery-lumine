'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    Signal
} = require('../../util/signal');
let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    state,
    style
}, {
    notify,
    getClassName
}) => {
    return n('button', {
        'class': `${getClassName('btn')}`,
        style,
        onclick: () => {
            notify(Signal('click'));
        }
    }, state.text);
}, {
    defaultState: {
        text: ''
    },

    defaultStyle: (theme) => styles(theme.oneLineBulk),

    classTable: (theme) => {
        return {
            'btn:hover': theme.actions.hover,
            'btn:active': theme.actions.signal,
            'btn:focus': theme.actions.focus
        };
    }
});
