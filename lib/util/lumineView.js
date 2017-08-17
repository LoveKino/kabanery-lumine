'use strict';

let {
    view
} = require('kabanery');

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       state,
 *       style,
 *       onchange
 *    }
 *
 * 2. onchange interface
 *
 *    onchange: (changedViewState, updatedScript) -> Any
 */

module.exports = (viewFun, {
    defaultState = {},
    defaultStyle = {}
} = {}) => {
    return view(({
        state = {},
        style = {},
        onchange
    }, ctx) => {
        // TODO check view Data

        // merge (deep merge)
        style = deepMergeMap(style, defaultStyle);
        state = deepMergeMap(state, defaultState);

        let {
            ctxUpdate,
            getData
        } = ctx.update;

        let updateWithNotify = (updatedScript, extra) => {
            ctxUpdate(updatedScript);
            onchange && onchange(getData(), updatedScript, extra);
        };

        ctx.updateWithNotify = updateWithNotify;

        return viewFun({
            style,
            state
        }, ctx);
    });
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
