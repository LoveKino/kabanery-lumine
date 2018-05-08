'use strict';

let assert = require('assert');
let {
  syncBindWithKeyMap
} = require('../../../../lib/view/compose/mapUI');
let lumineView = require('../../../../lib/util/lumineView');
let n = require('../../../../lib/util/n');
let Input = require('../../../../lib/view/input/input');
let {
  mount,
  dispatchEvent
} = require('kabanery');

let TestView = lumineView((_, ctx) => {
  return n(Input, syncBindWithKeyMap(ctx, {
    'a': 'value'
  }, {
    bindedProps: {
      id: 'test'
    }
  }));
}, {
  defaultProps: {
    a: '1'
  }
});

let nowa = null;

let testView = n(TestView, {
  onsignal: (signal, data) => {
    nowa = data.props.a;
  }
});

mount(testView, document.body);

// simulate use input
let inputNode = document.getElementById('test');
inputNode.value = '123';
dispatchEvent('input', {
  target: inputNode
});

assert.equal(nowa, '123');

//  update
testView.ctx.update('props.a', '999');
assert.equal(document.getElementById('test').value, '999');
