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
} = require('kabanery-signal-flow');
let {
    Signal
} = require('../util/signal');
let {
    wrapPagePropsWithStore
} = require('../store/storeProps');

const PAGE_RENDER_SIGNAL = 'kabanery_page_render';

let SPA = ({
    // fo pfc apis
    apiPath = '/api/pfc',
    apiStub = {},

    runApi,
    apiMap,

    containerId = 'pager',

    // page configs
    pageViewMap = {},
    pageSignalActionMap = {},
    pageOptionsMap = {},

    defaultPage
}) => {
    let pageEnv = {};

    if (runApi) {
        pageEnv.runApi = runApi;
        pageEnv.apiMap = apiMap;
    } else { // default usage
        // TODO validate params
        let apier = pfcApis(apiPath, apiStub);
        pageEnv.runApi = apier.runApi;
        pageEnv.apiMap = apier.apiMap;
    }

    // create page map
    let pageMap = {};

    for (let name in pageViewMap) {
        let options = pageOptionsMap[name] || {};
        let PageView = pageViewMap[name];
        let signalActionMap = pageSignalActionMap[name] || {};
        pageMap[name] = {
            title: options[name] || name,
            render: page(PageView, signalActionMap, options)
        };
    }

    mount(n(`div id="${containerId}"`), document.body); // pager as container

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
        });

    pageEnv.forward = forward;
    pageEnv.redirect = redirect;
    pageEnv.reload = reload;

    forward(window.location.href);
};

let page = (PageView, signalActionMap, {
    localStateStore = false,
    localStateStoreWhiteList = []
} = {}) =>
    (pageEnv) => {
        let props = {
            onsignal: signalActionFlow(signalActionMap, pageEnv)
        };

        if (localStateStore) {
            props = wrapPagePropsWithStore(props, {
                whiteList: localStateStoreWhiteList
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
