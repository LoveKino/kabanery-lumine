'use strict';

let {
    noticeProgress
} = require('../notice/notice');

let loadingProgress = (fn, ctx, loaderShowKey = 'show') => (...args) => {
    ctx.update(loaderShowKey, true);

    let ret = fn(...args);

    ret.then((data) => {
        ctx.update(loaderShowKey, false);

        return data;
    }).catch(err => {
        ctx.update(loaderShowKey, false);

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
