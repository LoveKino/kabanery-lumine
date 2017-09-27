'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');
let {
    Signal
} = require('../../util/signal');

module.exports = lumineView(({
    props,
    children
}, {
    notify
}) => {
    return n('div', {
        style: styles(props.style.container),
        onclick: () => {
            notify(Signal('click'));
        }
    }, [
        n('div', {
            style: styles({
                padding: props.theme.basics.narrowPadding
            }, props.style.content)
        }, [
            props.title && n('h3', {
                style: props.style.title
            }, [props.title]),
            children
        ])
    ]);
}, {
    defaultProps: {
        title: '',
        style: (theme) => {
            return {
                container: styles(theme.cardBox),
                content: {},
                title: {}
            };
        }
    },

    defaultChildren: ['']
});