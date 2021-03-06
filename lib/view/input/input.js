'use strict';

const {
  n
} = require('kabanery');

const lumineView = require('../../util/lumineView');

const {
  Signal
} = require('lumine-signal');

const {
  styles
} = require('../../util/helper');

module.exports = lumineView(({
  props
}, {
  notify,
  getClassName
}) => {
  let attributes = {
    'class': `${getClassName('input')}`,
    style: props.style,
    type: props.type,
    placeholder: props.placeholder,
    oninput: (e) => {
      props.value = e.target.value;
      notify(Signal('input'));
    },
    value: props.value
  };
  if (props.id) {
    attributes.id = props.id;
  }
  return n('input', attributes);
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
