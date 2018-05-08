'use strict';

const {
  isMapObject
} = require('./helper');

const {
  mount,
  n,
  parseStyle
} = require('kabanery');

const VIEW_CLASS_PREFIX = 'kabanery-lumine';

let count = -1;

module.exports = (classTable) => {
  count++;

  let viewClassId = `${VIEW_CLASS_PREFIX}-${count}`;

  let getStyleRuleName = (name) => {
    if (name[0] === '@') {
      let prev = name.split(' ')[0];
      let next = name.substring(prev.length).trim();
      return `${prev} ${viewClassId}-${next}`;
    } else {
      return `.${viewClassId}-${name}`;
    }
  };

  let appendStyle = () => {
    if (styleCssRules) {
      mount(n('style', {
        id: viewClassId
      }, styleCssRules), document.head);
      styleCssRules = null;
    }
  };

  let getClassName = (name) => {
    if (name[0] === '@') {
      let prev = name.split(' ')[0];
      let next = name.substring(prev.length).trim();
      name = next;
    }

    return `${viewClassId}-${name.split(':')[0]}`;
  };

  let updateClassTable = (newClassTable) => {
    let node = document.getElementById(viewClassId);
    if (node) {
      node.parentNode.removeChild(node);
    }

    setStyleCssRules(newClassTable);
    appendStyle();
  };

  let styleCssRules = null;

  let setStyleCssRules = (classTable) => {
    if (isMapObject(classTable)) {
      styleCssRules = '';
      for (let name in classTable) {
        name = name.trim();
        let styleRuleName = getStyleRuleName(name);
        let classCnt = classTable[name];
        if (typeof classCnt === 'function') {
          classCnt = classCnt({
            getClassName
          });
        }
        let styleRuleContent = parseStyle(classCnt, {
          valueWrapper: (value) => `${value !== ''? value: '\'\''} !important`
        });
        styleCssRules += `\n${styleRuleName} {${styleRuleContent}}`;
      }
    }
  };

  setStyleCssRules(classTable);

  return {
    appendStyle,
    getClassName,
    updateClassTable
  };
};
