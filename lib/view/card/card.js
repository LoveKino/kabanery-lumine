'use strict';

const n = require('../../util/n');
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

      children,

      // TODO actions
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
