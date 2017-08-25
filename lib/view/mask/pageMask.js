'use strict';

let FullWindow = require('../layout/fullWindow');
let lumineView = require('../../util/lumineView');
let n = require('../../util/n');

module.exports = lumineView(({
    props,
    children
}) => {
    return n(FullWindow, props, children);
}, {
    defaultProps: {
        style: (theme) => {
            return {
                backgroundColor: theme.basics.veilColor,
                color: theme.basics.fontColor
            };
        }
    }
});
