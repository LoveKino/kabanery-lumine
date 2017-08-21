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
}) => {
    return n('div', {
        style
    }, state.content);
}, {
    defaultState: {
        content: []
    },

    defaultStyle: (theme) => styles(theme.fullParent)
});
