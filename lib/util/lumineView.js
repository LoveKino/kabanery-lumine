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

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       // public data
 *       state,  // describle the view state data
 *       style,  // style map
 *       theme,  // theme
 *       onsignal  // signal handler
 *    }
 *
 * 2. onsignal interface
 *
 *    onsignal: (signal, data, ctx) -> Any
 */

module.exports = (viewFun, {
    defaultState = {},
    defaultStyle = {},
    theme = steadyTheme,
    classTable
} = {}) => {
    let defaultStyleValue = resolveFnValue(defaultStyle, theme);
    let classTableValue = resolveFnValue(classTable, theme);

    let {
        appendStyle,
        getClassName,
        updateClassTable
    } = ClassTable(classTableValue);

    return view((viewData, ctx) => {
        appendStyle();
        // TODO check view Data

        // update defaultStyleValue
        if (viewData.theme && typeof defaultStyle === 'function') {
            defaultStyleValue = resolveFnValue(defaultStyle, viewData.theme);
        }

        // update class table
        if (viewData.theme && typeof classTable === 'function') {
            classTableValue = resolveFnValue(classTable, viewData.theme);
            updateClassTable(classTableValue);
        }

        // merge (deep merge)
        viewData.style = deepMergeMap(viewData.style, defaultStyleValue);

        viewData.state = deepMergeMap(viewData.state, defaultState);

        let notify = (signal) => {
            viewData.onsignal && viewData.onsignal(signal, ctx.getData(), ctx);
        };

        ctx.notify = notify;
        ctx.getClassName = getClassName;

        return viewFun({
            style: viewData.style,
            state: viewData.state,
            theme: viewData.theme || steadyTheme
        }, ctx);
    });
};
