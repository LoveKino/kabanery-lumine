'use strict';

let {
  styles
} = require('../../util/helper');

let container = {
  position: 'relative',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  overflow: 'auto'
};

let fullParentHeight = {
  height: '100%'
};

let fullParentWidth = {
  width: '100%'
};

let fullWindow = styles(container, {
  position: 'fixed',
  left: 0,
  top: 0,
},
fullParentWidth, fullParentHeight);

let fullParent = styles(container, fullParentWidth, fullParentHeight);

let flat = {
  appearance: 'none',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  border: 0
};

module.exports = {
  fullWindow,
  fullParent,
  fullParentWidth,
  fullParentHeight,
  container,
  flat
};
