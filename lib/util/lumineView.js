'use strict';

let {
    view
} = require('kabanery');

let steadyTheme = require('../theme/steady');

let {
    isMapObject
} = require('./helper');

let ClassTable = require('./classTable');

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       state,
 *       style,
 *       theme,
 *       onchange
 *    }
 *
 * 2. onchange interface
 *
 *    onchange: (changedViewState, updatedScript) -> Any
 */

module.exports = (viewFun, {
    defaultState = {},
    defaultStyle = {},
    theme = steadyTheme,
    classTable
} = {}) => {
    let defaultStyleValue = resolveDefaultStyles(defaultStyle, theme);
    let classTableValue = resolveClassTable(classTable, theme);

    let {
        appendStyle,
        getClassName,
        updateClassTable
    } = ClassTable(classTableValue);

    return view((viewData, ctx) => {
        appendStyle();
        // TODO check view Data

        if (viewData.theme && typeof defaultStyleValue === 'function') {
            // update defaultStyleValue
            defaultStyleValue = resolveDefaultStyles(defaultStyle, viewData.theme);

            // update class table
            classTableValue = resolveClassTable(classTable, viewData.theme);
            updateClassTable(classTableValue);
        }

        // merge (deep merge)
        viewData.style = deepMergeMap(viewData.style, defaultStyleValue);

        viewData.state = deepMergeMap(viewData.state, defaultState);

        // TODO just notify, no view update.

        let updateWithNotify = (updatedScript, extra) => {
            ctx.update(updatedScript);
            viewData.onchange && viewData.onchange(ctx.getData(), updatedScript, extra);
        };

        ctx.updateWithNotify = updateWithNotify;
        ctx.getClassName = getClassName;

        return viewFun({
            style: viewData.style,
            state: viewData.state
        }, ctx);
    });
};

let resolveDefaultStyles = (defaultStyle, theme) => {
    if (typeof defaultStyle === 'function') {
        return resolveDefaultStyles(defaultStyle(theme), theme);
    }

    return defaultStyle;
};

let resolveClassTable = (classTable, theme) => {
    if (typeof classTable === 'function') {
        return resolveClassTable(classTable(theme), theme);
    }

    return classTable;
};

let deepMergeMap = (tar, def) => {
    if (isMapObject(def)) {
        tar = tar || {};
        if (isMapObject(tar)) {
            for (let name in def) {
                if (tar[name] === undefined) {
                    tar[name] = deepMergeMap(tar[name], def[name]);
                }
            }
        }
        return tar;
    } else {
        return def;
    }
};
