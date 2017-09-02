'use strict';

let {
    view
} = require('kabanery');
let steadyTheme = require('../theme/steady');
let {
    deepMergeMap,
    resolveFnValue
} = require('./helper');
let ClassTable = require('./classTable');
let {
    Signal
} = require('./signal');
let JsonTree = require('tree-script/lib/jsonTree');
let {
    executeAST
} = require('tree-script');

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

module.exports = (viewFun, {
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

    return view((viewData, ctx) => {
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

        // signal system
        let notify = (signal) => {
            viewData.props.onsignal && viewData.props.onsignal(signal, ctx.getData(), ctx);
        };

        let viewDataTree = JsonTree(viewData);

        // update with tree script
        let updateTree = ({
            ast,
            variableStub
        }, variableMap, signal) => {
            signal = signal || Signal('update-view-data');
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

        let updateWithNotify = (signal, ...updateScript) => {
            signal = signal || Signal('update-view-data');
            ctx.update(...updateScript);
            // notify
            notify(signal);
        };

        ctx.notify = notify;
        ctx.updateWithNotify = updateWithNotify;
        ctx.updateTree = updateTree;
        ctx.getClassName = getClassName;

        return viewFun(viewData, ctx);
    });
};
