'use strict';

const {
  get,
  set
} = require('./helper');

const {
  Signal
} = require('lumine-signal');

const CHILD_SOURCE_TYPE = 'child';

const identity = v => v;

/**
 * binding view with another view's props through a key map
 *
 * keyMap = {
 *    binderKey: bindedKey
 * }
 */

let syncBindWithKeyMap = (ctx, keyMap, {
  bindedProps = {},
  stopSignal,
  autoUpdate = false,
  updatedSignalTypes = null,
  onChildSignal,
  toBinded = identity,
  toBinder = identity
} = {}) => {
  // TODO check

  let mappings = [];
  for (let binderKey in keyMap) {
    mappings.push([binderKey, keyMap[binderKey]]);
  }

  let viewData = ctx.getData();

  let onsignal = (signal, data, sourceCtx) => {
    // when event happened, sync the data
    mappings.forEach(([binderKey, bindedKey]) => {
      let propValue = get(data.props, bindedKey); // get from child

      // update props
      viewData.props = set(viewData.props, binderKey, toBinder(propValue, binderKey, bindedKey)); // set for parent
    });

    // handle the signal if necessary
    onChildSignal && onChildSignal(signal, data, sourceCtx);

    if (!stopSignal) {
      // pop up the signal, TODO wrap the sigal to resolve chain
      ctx.notify(
        Signal(signal.type, signal.data, {
          sourceType: CHILD_SOURCE_TYPE,
          keyMap,
          sourceSignal: signal,
          sourceData: data,
          sourceCtx
        })
      );
    }

    if (autoUpdate) {
      if (!updatedSignalTypes) {
        ctx.update(); // update binder view
      } else {
        if (updatedSignalTypes.findIndex((type) => type === signal.type) !== -1) {
          ctx.update(); // update binder view
        }
      }
    }
  };

    // construct child props
  let mapedPropsValue = mappings.reduce((prev, [binderKey, bindedKey]) => {
    let propValue = get(viewData.props, binderKey); // get from binder
    set(prev, bindedKey, toBinded(propValue, binderKey, bindedKey)); // set for binded
    return prev;
  }, {});


  return Object.assign({
    theme: viewData.props.theme // extend theme by default
  }, bindedProps, mapedPropsValue, {
    onsignal
  });
};

module.exports = {
  syncBindWithKeyMap
};
