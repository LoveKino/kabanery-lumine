'use strict';

let lumineView = require('../../util/lumineView');
let n = require('../../util/n');
let Mask = require('../mask/pageMask');
let {
  styles
} = require('../../util/helper');
let {
  onSignalType
} = require('lumine-signal');

module.exports = lumineView(({
  props,
  children
}, {
  updateWithNotify
}) => {
  return props.show ? n(Mask, {
    style: props.style.maskStyle,
    theme: props.theme,
    onsignal: onSignalType('fullwindow-click', () => {
      if (props.autoHide) {
        updateWithNotify(null, 'props.show', false);
      }
    })
  }, [
    n('div', {
      style: {
        display: 'table-cell',
        verticalAlign: 'middle'
      }
    }, [ // middle
      n('div', {
        style: props.style.modalContainer,
        onclick: (e) => {
          e.stopPropagation();
        }
      }, children)
    ])
  ]) : n('div');
}, {
  defaultProps: {
    show: true,
    autoHide: false,
    style: (theme) => {
      return {
        maskStyle: {
          textAlign: 'center',
          display: 'table'
        },
        modalContainer: styles(theme.modalBulk, {
          padding: theme.basics.narrowPadding
        })
      };
    }
  }
});
