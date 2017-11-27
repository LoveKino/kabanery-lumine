'use strict';

const {
    foldFuns,
    isString,
    isObject
} = require('./helper');

const Signal = (type, data, extra) => {
    return {
        type,
        data,
        extra
    };
};

const isSignalType = (s, type) => {
    return s.type === type;
};

const onSignalType = (expectType, fn) => (signal, ...rest) => {
    if (isSignalType(signal, expectType)) {
        return fn(signal, ...rest);
    }
};

const deliver = (ctx, type, extra) => (sourceSignal, sourceData, sourceCtx) => {
    return ctx.notify(Signal(type, sourceSignal.data, {
        sourceType: 'delivered',
        sourceSignal,
        sourceData,
        sourceCtx,
        extra
    }));
};

const pass = (ctx, fromSignalType = "", toSignalType) => {
    let map = {};

    if (isString(fromSignalType)) {
        map[fromSignalType] = toSignalType;
    } else if (isObject(fromSignalType)) {
        map = fromSignalType;
    }

    let list = [];
    for (let from in map) {
        let next = map[from] ? map[from] : from;
        list.push(onSignalType(from, deliver(ctx, next)));
    }

    return foldFuns(list);
};

module.exports = {
    Signal,
    onSignalType,
    isSignalType,
    deliver,
    pass
};
