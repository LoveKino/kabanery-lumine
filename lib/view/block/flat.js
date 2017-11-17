'use strict';

const styleViewer = require('./styleViewer');
const {
    styles
} = require('../../util/helper');

module.exports = styleViewer((theme) => styles(theme.flatOneLineBulk, {
    display: 'block',
    textAlign: 'left'
}));
