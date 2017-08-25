'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    props,
    children
}) => {
    return n('div', {
        style: props.style
    }, children);
}, {
    defaultProps: {
        style: (theme) => styles(theme.fullWindow)
    },

    defaultChildren: []
});
