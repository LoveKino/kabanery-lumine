'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');
let {
    Signal
} = require('../../util/signal');

module.exports = lumineView(({
    props,
    children
}, {
    notify
}) => {
    return n('div', {
        style: props.style,
        onclick: () => {
            notify(Signal('fullwindow-click'));
        }
    }, children);
}, {
    defaultProps: {
        style: (theme) => styles(theme.fullWindow)
    },

    defaultChildren: []
});
