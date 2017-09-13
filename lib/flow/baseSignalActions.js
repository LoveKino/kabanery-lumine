'use strict';

const KABANERY_DO_RENDER = 'kabanery_do_render';

const baseSignalActionMap = {
  [KABANERY_DO_RENDER] : [ {type : 'updateState', content : ''} ]
};

let wrapBaseSignalActions = (signalActionMap) => {
  for (let name in signalActionMap) {
    let pageSignalActionMap = signalActionMap[name];

    for (let cname in baseSignalActionMap) {
      if (!pageSignalActionMap[cname]) {
        pageSignalActionMap[cname] = baseSignalActionMap[cname];
      }
    }
  }

  return signalActionMap;
};

module.exports = {
  KABANERY_DO_RENDER,
  wrapBaseSignalActions
};
