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
    return n('textarea', {
        'class': `${getClassName('textarea')}`,
        style,
        type: state.type,
        placeholder: state.placeholder,
        oninput: (e) => {
            state.text = e.target.value;
            notify(Signal('input'));
        }
    }, [state.text]);
}, {
    defaultState: {
        text: '',
        type: 'text',
        placeholder: ''
    },

    defaultStyle: (theme) => styles(theme.textAreaBox),

    classTable: (theme) => {
        return {
            'textarea:focus': styles(theme.actions.focus)
        };
    }
});
