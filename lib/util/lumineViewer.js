'use strict';

const {
  view,
  parseArgs
} = require('kabanery');
const steadyTheme = require('../theme/steady');
const {
  deepMergeMap,
  resolveFnValue
} = require('./helper');
const ClassTable = require('./classTable');
const {
  Signal,
  pass
} = require('lumine-signal');
const JsonTree = require('tree-script/lib/jsonTree');
const {
  executeAST
} = require('tree-script');
const n = require('./n');
const {
  syncBindWithKeyMap
} = require('./compose');

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       // public data
 *       props,
 *       children // child views
 *    }
 *
 *    props.onsigal
 *    props.theme
 *
 * 2. onsignal interface
 *
 *    onsignal: (signal, data, ctx) -> Any
 */

module.exports = (viewFun) => ({
  defaultProps = {},
  defaultChildren = [],
  theme = steadyTheme,
  classTable
} = {}) => {
  let defaultStyle = defaultProps.style || {};

  let defaultStyleValue = resolveFnValue(defaultStyle, theme);
  let classTableValue = resolveFnValue(classTable, theme);

  let {
    appendStyle,
    getClassName,
    updateClassTable
  } = ClassTable(classTableValue);

  const component = view((viewData, ctx) => {
    viewData.props = viewData.props || {};
    viewData.children = (viewData.children && viewData.children.length) ? viewData.children : defaultChildren;
    viewData.props.theme = viewData.props.theme || theme;

    appendStyle();
    // TODO check view Data

    // update defaultStyleValue
    if (viewData.props.theme && typeof defaultStyle === 'function') {
      defaultStyleValue = resolveFnValue(defaultStyle, viewData.props.theme);
    }

    // update class table
    if (viewData.theme && typeof classTable === 'function') {
      classTableValue = resolveFnValue(classTable, viewData.props.theme);
      updateClassTable(classTableValue);
    }

    // merge props (deep merge)
    viewData.props.style = deepMergeMap(viewData.props.style, defaultStyleValue);
    viewData.props = deepMergeMap(viewData.props, defaultProps);

    ctx.getClassName = getClassName;

    return viewFun(viewData, ctx);
  });

  // create a view instance
  return (...args) => {
    const viewNode = component(...args);
    hookCtx(viewNode.ctx);
    return viewNode;
  };
};

const hookCtx = (ctx) => {
  // signal system
  // TODO (signalType, data) => void
  const notify = (signal) => {
    const viewData = ctx.getData();
    if (viewData.props.onsignal) {
      let sig = signal;

      // accept string directly as signal
      if (typeof signal === 'string') {
        sig = Signal(signal);
      }

      viewData.props.onsignal(sig, ctx.getData(), ctx);
    }
  };

  const updateWithNotify = (signal, ...updateScript) => {
    signal = signal || Signal('update-view-data');
    ctx.update(...updateScript);
    // notify
    notify(signal);
  };

  ctx.notify = notify;
  ctx.updateWithNotify = updateWithNotify;

  // update with tree script
  // TODO remove updateTree api
  // @deprecated
  ctx.updateTree = ({
    ast,
    variableStub
  }, variableMap, signal) => {
    signal = signal || Signal('update-view-data');

    let viewDataTree = JsonTree(ctx.getData());

    // update view data by running update script
    executeAST(ast, {
      queryByPath: viewDataTree.queryByPath,
      setByPath: viewDataTree.setByPath,
      removeByPath: viewDataTree.removeByPath,
      appendByPath: viewDataTree.appendByPath,
      variableMap,
      variableStub
    });

    updateWithNotify(signal);
  };

  // binding n
  ctx.bn = (bindingMap, options) => {
    // TODO check bindingMap
    return (...args) => {
      let tagName = args[0];
      let {
        attributes,
        childs
      } = parseArgs(args, {
        doParseStyle: false
      });

      return n(tagName, syncBindWithKeyMap(ctx, bindingMap, Object.assign({}, options, {
        bindedProps: attributes
      })), childs);
    };
  };

  // pass
  ctx.pass = (...args) => pass(ctx, ...args);
};
