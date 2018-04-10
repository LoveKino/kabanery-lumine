'use strict';

let lumineView = require('../../lib/util/lumineView');
let n = require('../../lib/util/n');
let Button = require('../../lib/view/button/button');
let {
  onSignalType,
  deliver
} = require('../../lib/util/signal');

module.exports = lumineView(({
  props
}, ctx) => n('div', [
  n(Button, {
    onsignal: onSignalType('click', deliver(ctx, 'doTestSAF'))
  }, 'testSAF'),

  n('div', props.text),

  n('div', props.text2)
]));
