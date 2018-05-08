'use strict';

const n = require('../../util/n');
const lumineView = require('../../util/lumineView');
const FoldArrow = require('./foldArrow');

module.exports = lumineView(({
  props,
  children
}, {
  updateWithNotify
}) => {
  let Body = children[1];

  let Head = n('div', {
    onclick: () => {
      updateWithNotify(null, 'props.hide', !props.hide);
    },
    style: props.style.title
  }, [
    props.arrow && n(FoldArrow, {
      hide: props.hide
    }),
    children[0]
  ]);

  return n('div', {
    style: props.style.container
  }, [
    Head, !props.hide && Body
  ]);
}, {
  defaultProps: {
    hide: false,
    arrow: true,
    style: {
      container: {},
      title: {
        cursor: 'pointer'
      }
    }
  }
});
