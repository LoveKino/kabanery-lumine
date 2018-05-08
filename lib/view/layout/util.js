'use strict';

let {styles} = require('../../util/helper');

let getPercentSum = (pers, childLen) => {
  let sum = 0;
  for (let i = 0; i < childLen; i++) {
    let cur = pers[i];
    cur = cur === undefined ? 1 : cur;
    sum += cur;
  }

  return sum;
};

let getPercent = (sum, pers, index) => {
  if (sum === 0) {
    return 0;
  }
  return ((pers[index] === undefined ? 1 : pers[index]) / sum) * 100 + '%';
};

let getChildStylesInPercentage =
    (children, pers, childStyles, theme, type = 'height') => {
      let sum = getPercentSum(pers, children.length);

      return children.map((_, index) => {
        let value = getPercent(sum, pers, index);
        let valueStyle = {[type] : value};
        return getChildStyle(type, valueStyle, childStyles[index], theme);
      });
    };

let getChildStylesInPile = (children, theme, childStyles, type = 'height') => {
  return children.map((_, index) =>
    getChildStyle(type, {}, childStyles[index], theme));
};

let getChildStylesInPartion =
    (frontPartions, backPartions, childStyles, theme, type = 'height') => {
      // front childs
      let topStyles = frontPartions.map((v, index) => {
        return getChildStyle(type, {[type] : v, zIndex : 1}, childStyles[index],
          theme);
      });

      // back childs
      let bottomStyles = backPartions.map((v, index) => {
        return getChildStyle(type, {[type] : v, zIndex : 2},
          childStyles[topStyles.length + 1 + index], theme);
      });

      let prev = frontPartions.reduce((sum, v) => sum + v, 0);
      let next = backPartions.reduce((sum, v) => sum + v, 0);

      // flex one
      let flexStyle =
          getChildStyle(type,
            type === 'height' ? {
              height : '100%',
              marginBottom : -1 * (prev + next), // pull up nexts
              paddingBottom : prev + next        // scroll childs
            }
              : {
                width : '100%',
                position : 'relative',
                paddingLeft : prev + next,
                marginRight : -1 * (prev + next),
                left : -1 * (prev + next),
                zIndex : 0
              },
            childStyles[topStyles.length], theme);

      return topStyles.concat([ flexStyle ]).concat(bottomStyles);
    };

let getChildStyle = (type, specialStyle, childStyle, theme) => {
  return styles(theme.container, getFullDirection(type, theme),
    type === 'width' ? {'float' : 'left'} : {}, specialStyle,
    childStyle || {});
};

let getFullDirection = (type, theme) => {
  return type === 'height' ? theme.fullParentWidth : theme.fullParentHeight;
};

module.exports = {
  getChildStylesInPercentage,
  getChildStylesInPile,
  getChildStylesInPartion
};
