'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');
let rippleClassTables = require('../classTables/ripple');
let {
  styles
} = require('../../util/helper');

/**
 *
 * TOC data = [
 *  {
 *      name, String
 *      id,
 *      next: TOC DATA
 *  }
 * ]
 */
module.exports = lumineView(({
  props
}, {
  getClassName
}) => {
  return renderToc(props.toc, {
    container: props.style.container,
    nameItem: props.style.nameItem,
    itemClass: getClassName('tocItem')
  });
}, {
  defaultProps: {
    style: (theme) => {
      return {
        container: styles(theme.contrastBulk, {
          padding: theme.basics.narrowPadding
        }),
        nameItem: styles(theme.flatOneLineBulk)
      };
    },
    toc: []
  },

  classTable: (theme) => {
    return Object.assign(rippleClassTables({
      className: 'tocItem',
      theme
    }), {
      'tocItem:hover': theme.actions.flatHover,
      'tocItem:active': theme.actions.flatActive,
      'tocItem:focus': theme.actions.focus
    });
  }
});

let renderToc = (toc, options) => {
  return n('div', {
    style: options.container
  }, [
    toc.map(({
      name,
      id,
      next
    }) => {
      id = id || name;
      return n('div', [
        n(`a href="#${id}" class=${options.itemClass}`, {
          style: options.nameItem
        }, name),
        next && next.length && renderToc(next, options)
      ]);
    })
  ]);
};
