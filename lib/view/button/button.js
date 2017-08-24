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
    props,
    children
}, {
    notify,
    getClassName
}) => {
    // TODO validate
    return n('button', {
        'class': `${getClassName('btn')}`,
        style: props.style,
        onclick: () => {
            notify(Signal('click'));
        }
    }, children[0]);
}, {
    defaultProps: {
        style: (theme) => styles(theme.oneLineBulk)
    },

    classTable: (theme) => {
        return {
            'btn:hover': theme.actions.hover,
            'btn:active': theme.actions.signal,
            'btn:focus': theme.actions.focus
        };
    }
});
