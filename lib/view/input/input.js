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
    props
}, {
    notify,
    getClassName
}) => {
    return n('input', {
        'class': `${getClassName('input')}`,
        style: props.style,
        type: props.type,
        placeholder: props.placeholder,
        oninput: (e) => {
            props.value = e.target.value;
            notify(Signal('input'));
        },
        value: props.value
    });
}, {
    defaultProps: {
        value: '',
        type: 'value',
        placeholder: '',
        style: (theme) => styles(theme.inputBox, theme.underLineBorder)
    },

    classTable: (theme) => {
        return {
            'input:focus': styles(theme.actions.focus, theme.underLineFocus)
        };
    }
});
