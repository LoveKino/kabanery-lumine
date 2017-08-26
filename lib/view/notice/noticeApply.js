'use strict';

let {
    Signal
} = require('../../util');

const SIGNAL_NOTICE_SHOW = 'notice-show';

let noticeProgress = (fn, ctx, noticeShowKey = 'show', noticeTextKey = 'text') => {
    return (...args) => {
        return fn(...args).catch((err) => {
            ctx.updateWithNotify(Signal(SIGNAL_NOTICE_SHOW), [
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
