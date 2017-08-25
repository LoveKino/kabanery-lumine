'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');

let TextLoading = require('./textLoading');
let PageMask = require('../mask/pageMask');
let Empty = require('../empty/empty');

module.exports = lumineView(({
    props,
    children
}) => {
    return props.show ? n(PageMask, {
        style: props.style
    }, children) : Empty();
}, {
    defaultProps: {
        show: true,
        style: {
            textAlign: 'center'
        }
    },
    defaultChildren: [n(TextLoading, {
        style: {
            position: 'relative',
            top: '50%',
            marginTop: -10
        }
    })]
});
