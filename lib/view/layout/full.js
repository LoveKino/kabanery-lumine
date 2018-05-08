'use strict';

const {
  n
} = require('kabanery');
const lumineView = require('../../util/lumineView');
const {
  styles
} = require('../../util/helper');

module.exports = lumineView(({
  props,
  children
}) => {
  return n('div', {
    style: props.style
  }, children);
}, {
  defaultProps: {
    style: (theme) => styles(theme.fullParent)
  },

  defaultChildren: ['']
});
