'use strict';

let {
    Signal
} = require('../../util/signal');

const SIGNAL_NOTICE_SHOW = 'notice-show';

const identity = v => v;

/**
 * when error happend, show in view
 */
let noticeProgress = (promise, ctx, {
    noticeShowKey = 'showNotice',
    noticeTextKey = 'noticeText',
    errTextDecorator = identity
} = {}) => {
    return Promise.resolve(promise).catch(err => {
        ctx.updateWithNotify(Signal(SIGNAL_NOTICE_SHOW), [
            [noticeShowKey, true],
            [noticeTextKey, errTextDecorator(err.toString(), err)]
        ]);

        throw err;
    });
};

module.exports = {
    noticeProgress
};
