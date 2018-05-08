'use strict';

const {
  n
} = require('kabanery');
const lumineView = require('../../util/lumineView');
const {
  styles
} = require('../../util/helper');
const {
  Signal
} = require('lumine-signal');

module.exports = lumineView(({
  props,
  children
}, {
  notify
}) => {
  return n('div', {
    style: props.style,
    onclick: () => {
      notify(Signal('fullwindow-click'));
    }
  }, children);
}, {
  defaultProps: {
    style: (theme) => {
      return styles(theme.fullWindow);
    }
  },

  defaultChildren: []
});
