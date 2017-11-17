'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');
let FoldArrow = require('./foldArrow');
let helper = require('../../util/helper');

module.exports = lumineView(({
    props,
    children
}, {
    updateWithNotify
}) => {
    let Body = children[1];

    let Head = n('div', {
        onclick: () => {
            updateWithNotify(null, 'props.hide', !props.hide)
        },
        style: props.style.title
    }, [
        props.arrow && n(FoldArrow, {
            hide: props.hide
        }),
        children[0]
    ]);

    return n('div', {
        style: props.style.container
    }, [
        Head, !props.hide && Body
    ]);
}, {
    defaultProps: {
        hide: false,
        arrow: true,
        style: {
            container: {},
            title: {
                cursor: 'pointer'
            }
        }
    }
});
