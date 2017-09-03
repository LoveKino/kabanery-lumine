'use strict';

let {
    router,
    queryPager
} = require('kabanery-spa');
let {
    mount
} = require('kabanery');
let n = require('../util/n');
let pfcApis = require('../request/pfcApis');
let {
    signalActionFlow
} = require('../flow/actionFlow');
let {
    Signal
} = require('../util/signal');
let {
    wrapPagePropsWithStore
} = require('../store');

const PAGE_RENDER_SIGNAL = 'kabanery_page_render';

let SPA = ({
    apiPath = '/api/pfc',
    apiStub = {},
    containerId = 'pager',
    pageMap = {},
    defaultPage
}) => {
    // TODO validate params
    let {
        apiMap,
        runApi
    } = pfcApis(apiPath, apiStub);

    mount(n(`div id="${containerId}"`), document.body); // pager as container

    let pageEnv = {
        apiMap,
        runApi
    };

    let {
        forward,
        redirect,
        reload
    } = router(
        // pages
        queryPager(pageMap, defaultPage || Object.keys(pageMap)[0]),

        // page env
        pageEnv,

        {
            containerId
        }
    );

    pageEnv.forward = forward;
    pageEnv.redirect = redirect;
    pageEnv.reload = reload;

    forward(window.location.href);
};

let page = (PageView, signalActionMap, pageEnv, {
    localStateStore = true,
    localStateStoreBlackList = []
} = {}) => {
    let props = {
        onsignal: signalActionFlow(signalActionMap, pageEnv)
    };

    if (localStateStore) {
        props = wrapPagePropsWithStore(props, {
            blackList: localStateStoreBlackList
        });
    }

    let pageView = n(PageView, props);

    pageView.ctx.notify(Signal(PAGE_RENDER_SIGNAL));

    return pageView;
};

module.exports = {
    SPA,
    page
};
