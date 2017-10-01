'use strict';

let styleViewer = require('./styleViewer');
let {
    styles
} = require('../../util/helper')

module.exports = styleViewer((theme) => styles(theme.flatOneLineBulk, {
    display: 'inline-block',
    textAlign: 'left'
}));
