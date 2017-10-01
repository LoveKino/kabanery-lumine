'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');

module.exports = (style, {
    tagName = 'div'
} = {}) => lumineView(({
    props,
    children
}) => {
    return n(tagName, {
        style: props.style
    }, [children]);
}, {
    defaultProps: {
        style
    }
});
