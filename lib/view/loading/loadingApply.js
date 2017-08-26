'use strict';

let {
    noticeProgress
} = require('../notice/noticeApply');
let {
    Signal
} = require('../../util/signal');

const SIGNAL_LOADER_SHOW = 'loader-show';
const SIGNAL_LOADER_HIDE = 'loader-hide';

let loadingProgress = (fn, ctx, loaderShowKey = 'show') => (...args) => {
    ctx.updateWithNotify(Signal(SIGNAL_LOADER_SHOW), loaderShowKey, true);

    let ret = fn(...args);

    ret.then((data) => {
        ctx.updateWithNotify(Signal(SIGNAL_LOADER_HIDE), loaderShowKey, false);

        return data;
    }).catch(err => {
        ctx.updateWithNotify(Signal(SIGNAL_LOADER_HIDE), loaderShowKey, false);

        throw err;
    });

    return ret;
};

let loadingNoticeProgress = (fn, ctx, loaderShowKey, noticeShowKey, noticeTextKey) => {
    return loadingProgress(noticeProgress(fn, ctx, noticeShowKey, noticeTextKey), ctx, loaderShowKey);
};

module.exports = {
    loadingProgress,
    loadingNoticeProgress
};
