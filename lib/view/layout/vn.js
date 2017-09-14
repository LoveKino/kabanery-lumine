'use strict';

let lumineView = require('../../util/lumineView');

let n = require('../../util/n');

let Full = require('./full');

const {MODE_PILE, MODE_PERCENTAGE, MODE_PARTION} = require('./const');

let {
  getChildStylesInPercentage,
  getChildStylesInPile,
  getChildStylesInPartion
} = require('./util');

module.exports = lumineView(({props, children}) => {
  let {theme, style, mode, pers, topPartions, bottomPartions} = props;

  // child container style
  if (mode === MODE_PERCENTAGE) {
    style.childs = getChildStylesInPercentage(children, pers, style.childs,
                                              theme, 'height');
  } else if (mode === MODE_PILE) {
    style.childs =
        getChildStylesInPile(children, theme, style.childs, 'height');
  } else if (mode === MODE_PARTION) {
    style.childs = getChildStylesInPartion(topPartions, bottomPartions,
                                           style.childs, theme, 'height');
  }

  return n(
      Full, {style : style.container, theme},
      [ children.map((child, i) => n('div', {style : style.childs[i] || {}},
                                     [ child ])) ]);
}, {
  defaultProps : {
    mode : MODE_PILE,
    pers : [], // percentage distribution

    topPartions : [],    // fixed width or height in top direction
    bottomPartions : [], // fixed width or height in bottom direction

    style : {container : {}, childs : {}}
  }
});
