'use strict';

let {
    noticeProgress
} = require('../notice/noticeApply');
let {
    Signal
} = require('../../util/signal');

const SIGNAL_LOADER_SHOW = 'loader-show';
const SIGNAL_LOADER_HIDE = 'loader-hide';

let loadingProgress = (promise, ctx, {
    loaderShowKey = 'showLoading'
} = {}) => {
    ctx.updateWithNotify(Signal(SIGNAL_LOADER_SHOW), loaderShowKey, true);

    return Promise.resolve(promise).then((data) => {
        ctx.updateWithNotify(Signal(SIGNAL_LOADER_HIDE), loaderShowKey, false);

        return data;
    }).catch(err => {
        ctx.updateWithNotify(Signal(SIGNAL_LOADER_HIDE), loaderShowKey, false);

        throw err;
    });
};

let loadingNoticeProgress = (promise, ctx, {
    loaderShowKey,
    noticeShowKey,
    noticeTextKey
} = {}) => {
    return loadingProgress(noticeProgress(promise, ctx, {
        noticeShowKey,
        noticeTextKey
    }), ctx, {
        loaderShowKey
    });
};

module.exports = {
    loadingProgress,
    loadingNoticeProgress
};
