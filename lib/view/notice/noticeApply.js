'use strict';

let noticeProgress = (fn, ctx, noticeShowKey = 'show', noticeTextKey = 'text') => {
    return (...args) => {
        return fn(...args).catch((err) => {
            ctx.update([
                [noticeShowKey, true],
                [noticeTextKey, err.toString()]
            ]);
            throw err;
        });
    };
};

module.exports = {
    noticeProgress
};
