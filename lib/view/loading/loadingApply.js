'use strict';

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

module.exports = {
    loadingProgress
};
