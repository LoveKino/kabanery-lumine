'use strict';

let {
    get,
    set,
    isObject,
    likeArray
} = require('../../util/helper');

let {
    Signal
} = require('../../util/signal');

const CHILD_SOURCE_TYPE = 'child';

/**
 * binding parent state, style, theme with child through key
 */

let mapChildWithKey = (ctx, key, {
    stopSignal,
    onChildSignal,
    styleKey
} = {}) => {
    let viewData = ctx.getData();

    // construct child lumine view data
    return {
        state: get(viewData.state, key),
        style: get(viewData.style, key || styleKey),

        theme: viewData.theme,

        onsignal: (signal, data, sourceCtx) => {
            // sync
            set(viewData.state, key, data.state);
            set(viewData.style, key, data.style);

            // handle the signal if necessary
            onChildSignal && onChildSignal(signal, data, sourceCtx);

            if (!stopSignal) {
                // pop up the signal, TODO wrap the sigal to resolve chain
                ctx.notify(popChildSignal(key, signal, data, sourceCtx));
            }
        }
    };
};

let mapChildToViewWithKey = (ctx, key, childView, options) => {
    return childView(mapChildWithKey(ctx, key, options));
};

let mapChildArrayToViewsWithKey = (ctx, key, childView, options) => {
    return mapChildArrayWithKey(ctx, key, options).map(childView);
};

let mapChildArrayWithKey = (ctx, key, options) => {
    let viewData = ctx.getData();
    let listState = get(viewData.state, key);
    if (!likeArray(listState)) {
        throw new Error(`Expect Array for state prop, key is ${key}.`);
    }

    options.styleKey = options.styleKey || key;

    return listState.map((item, index) => {
        return mapChildWithKey(ctx, `${key}.${index}`, options);
    });
};

let popChildSignal = (key, signal, sourceData, sourceCtx) => {
    let path = key;

    if (isMapSignal(signal)) { // inherit path
        path = `${key}.${signal.data.path}`;
    }

    return Signal(signal.type, {
        sourceType: CHILD_SOURCE_TYPE,
        key,
        path,
        sourceSignal: signal,
        sourceData,
        sourceCtx
    });
};

let isMapSignal = (v) => isObject(v) && isObject(v.data) && v.data.sourceType === CHILD_SOURCE_TYPE;

module.exports = {
    mapChildWithKey,
    mapChildToViewWithKey,
    mapChildArrayWithKey,
    mapChildArrayToViewsWithKey
};
