'use strict';

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

const pass = (ctx, fromSignalType, toSignalType) => {
    let nextSignal = toSignalType ? toSignalType : fromSignalType;
    return onSignalType(fromSignalType, deliver(ctx, nextSignal));
};

module.exports = {
    Signal,
    onSignalType,
    isSignalType,
    deliver,
    pass
};
