'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    state,
    style
}, {
    updateWithNotify
}) => {
    return n('button', {
        style,
        onclick: () => {
            updateWithNotify([
                ['state.active', 1]
            ]);

            updateWithNotify([
                ['state.active', 0]
            ]);
        }
    }, state.text);
}, {
    defaultState: {
        text: '',
        active: 0
    },

    defaultStyle: (theme) => styles(theme.oneLineBulk)
});
