'use strict';

let noticeProgress = (fn, ctx, noticeShowKey = 'show') => {
    return (...args) => {
        return fn(...args).catch((err) => {
            ctx.update(noticeShowKey, true);
            throw err;
        });
    };
};

module.exports = {
    noticeProgress
};
