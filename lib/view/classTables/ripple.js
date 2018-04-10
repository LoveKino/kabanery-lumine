'use strict';

const ripple = require('../animation/ripple');

module.exports = ({
  theme,
  frameName = 'ripple',
  className = 'btn'
}) => {
  return {
    [`@keyframes ${frameName}`]: ripple,
    [`${className}::after`]: theme.flatRippleMask,
    [`${className}:focus:not(:active)::after`]: ({
      getClassName
    }) => {
      return {
        animation: `${getClassName(frameName)} 1s ease-out`
      };
    }
  };
};
