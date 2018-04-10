'use strict';

let n = require('../../util/n');

let lumineView = require('../../util/lumineView');

// TODO easy disappear for loading view
module.exports = lumineView(({
  props
}, {
  getClassName
}) => {
  return props.show ? n('div', {
    'class': getClassName('load-suffix'),
    style: props.style
  }, props.textPrefix) : n('div');
}, {
  defaultProps: {
    textPrefix: 'loading',
    show: true,
    style: {
      display: 'inline-block'
    }
  },

  classTable: {
    '@keyframes loading': `
    0% {
        content: ""
    }
    33% {
        content: "."
    }
    67% {
        content: ".."
    }
    100% {
        content: "..."
    }`,
    'load-suffix::after': ({
      getClassName
    }) => {
      return {
        content: JSON.stringify('.'),
        animation: `${getClassName('loading')} 3s infinite ease-in-out`
      };
    }
  }
});
