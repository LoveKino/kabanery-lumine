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
    return n('textarea', {
        'class': `${getClassName('valuearea')}`,
        style: props.style,
        type: props.type,
        placeholder: props.placeholder,
        oninput: (e) => {
            props.value = e.target.value;
            notify(Signal('input'));
        }
    }, [props.value]);
}, {
    defaultProps: {
        value: '',
        type: 'value',
        placeholder: '',
        style: (theme) => styles(theme.textAreaBox)
    },

    classTable: (theme) => {
        return {
            'valuearea:focus': styles(theme.actions.focus)
        };
    }
});
