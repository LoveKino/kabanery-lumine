'use strict';

const {
  n
} = require('kabanery');

const angle = require('../cssShapes/angle');
const lumineView = require('../../util/lumineView');

module.exports = lumineView(({
  props
}) => {
  return n('span', {
    style: {
      display: 'inline-block',
      padding: '0 8 0 8'
    }
  }, [angle({
    direction: props.hide ? 'bottom' : 'top',
    length: 5,
    color: '#666666'
  })]);
}, {
  defaultProps: {
    hide: false
  }
});
