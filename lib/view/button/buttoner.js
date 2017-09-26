'use strict';

let {
    n
} = require('kabanery');
let lumineViewer = require('../../util/lumineViewer');
let {
    Signal
} = require('../../util/signal');
let {
    styles
} = require('../../util/helper');

module.exports = lumineViewer(({
    props,
    children
}, {
    notify,
    getClassName
}) => {
    // TODO validate
    let attributes = {
        'class': `${getClassName('btn')}`,
        style: props.style,
        onclick: () => {
            notify(Signal('click'));
        }
    };
    if (props.id) {
        attributes.id = props.id;
    }
    return n('button', attributes, children[0]);
});
