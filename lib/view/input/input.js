'use strict';

let {
    n
} = require('kabanery');

let lumineView = require('../../util/lumineView');

let {
    Signal
} = require('../../util/signal');

let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    state,
    style
}, {
    notify,
    getClassName
}) => {
    return n('input', {
        'class': `${getClassName('input')}`,
        style,
        type: state.type,
        placeholder: state.placeholder,
        oninput: (e) => {
            state.text = e.target.value;
            notify(Signal('input'));
        },
        value: state.text
    });
}, {
    defaultState: {
        text: '',
        type: 'text',
        placeholder: ''
    },

    defaultStyle: (theme) => styles(theme.inputBox, theme.underLineBorder),

    classTable: (theme) => {
        return {
            'input:focus': styles(theme.actions.focus, theme.underLineFocus)
        };
    }
});
