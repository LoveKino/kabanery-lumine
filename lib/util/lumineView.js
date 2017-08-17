'use strict';

let {
    view
} = require('kabanery');

let steadyTheme = require('../theme/steady');

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
    theme = steadyTheme
} = {}) => {
    let defaultStyleValue = getDefaultStyles(defaultStyle, theme);

    return view((viewData, ctx) => {
        // TODO check view Data

        if (viewData.theme && typeof defaultStyleValue === 'function') {
            // update defaultStyleValue
            defaultStyleValue = getDefaultStyles(defaultStyle, viewData.theme);
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

        return viewFun({
            style: viewData.style,
            state: viewData.state
        }, ctx);
    });
};

let getDefaultStyles = (defaultStyle, theme) => {
    if (typeof defaultStyle === 'function') {
        return getDefaultStyles(defaultStyle(theme), theme);
    }

    return defaultStyle;
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

let isMapObject = (v) => {
    return v && typeof v === 'object' && !Array.isArray(v);
};
