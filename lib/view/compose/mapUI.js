'use strict';

let {
    get,
    set
} = require('../../util/helper');

let {
    Signal
} = require('../../util/signal');

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

    let viewData = ctx.getData();
    let props = viewData.props;
    let mappings = [];
    for (let binderKey in keyMap) {
        mappings.push([binderKey, keyMap[binderKey]]);
    }

    let mapedPropsValue = mappings.reduce((prev, [binderKey, bindedKey]) => {
        let propValue = get(props, binderKey); // get from binder
        set(prev, bindedKey, toBinded(propValue, binderKey, bindedKey)); // set for binded
        return prev;
    }, {});

    let onsignal = (signal, data, sourceCtx) => {
        // when event happened, sync the data
        mappings.forEach(([binderKey, bindedKey]) => {
            let propValue = get(data.props, bindedKey); // get from child
            set(props, binderKey, toBinder(propValue, binderKey, bindedKey)); // set for parent
        });

        // handle the signal if necessary
        onChildSignal && onChildSignal(signal, data, sourceCtx);

        if (!stopSignal) {
            // pop up the signal, TODO wrap the sigal to resolve chain
            ctx.notify(
                Signal(signal.type, {
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
    return Object.assign({
        theme: props.theme // extend theme by default
    }, bindedProps, mapedPropsValue, {
        onsignal
    });
};

module.exports = {
    syncBindWithKeyMap
};
