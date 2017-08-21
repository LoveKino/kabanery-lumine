'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');

module.exports = lumineView(({
    state,
    style = {}
}, {
    justNofity
}) => {
    let layLeft = (left) => {
        return n('div', {
            style: style.left
        }, left);
    };

    let layRight = (right) => {
        return n('div', {
            style: style.right
        }, right);
    };

    return n('div', {
        style: style.container
    }, [
        state.lefts.map(layLeft),

        state.rights.map(layRight),

        n('div style="clear:both"')
    ]);
}, {
    defaultState: {
        lefts: [],
        rights: [],
        signal: null
    },

    defaultStyle: {
        container: {},

        left: {
            'float': 'left'
        },

        right: {
            'float': 'right'
        }
    }
});
