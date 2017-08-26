'use strict';

let querystring = require('querystring');

let {
    deepMergeMap
} = require('../util/helper');

// TODO opt performance

let pagePropsStore = (options = {}) => {
    let {
        version = 1.0
    } = options;

    let key = options.key || getDefaultKey(options);

    let set = (props) => {
        localStorage[key] = JSON.stringify({
            version,
            props
        });
    };

    let get = (originProps = {}) => {
        let dataStr = localStorage[key];
        if (!dataStr) return responseOriginProps(originProps);

        try {
            let data = JSON.parse(dataStr);
            if (data.version < version) {
                return responseOriginProps(originProps);
            } else if (data.version < version) {
                console.error(`unexpected situation happened, storaged data version is bigger than current version. Storaged data version is ${data.version}. Current version is ${version}.`); // eslint-disable-line
                return responseOriginProps(originProps);
            } else {
                // merge dataProps and stored props
                return deepMergeMap(originProps, data.props);
            }
        } catch (err) {
            return responseOriginProps(originProps);
        }
    };

    let responseOriginProps = (originProps) => {
        set(originProps);
        return originProps;
    };

    return {
        get,
        set
    };
};

let getDefaultKey = ({
    pageQueryKey = 'page'
} = {}) => { // key should reflect a page
    let key = `${document.title}-${window.location.pathname}`;

    let obj = querystring.parse(window.location.search.substring(1));

    if (obj && obj[pageQueryKey] !== undefined) {
        key = `${key}?page=${obj[pageQueryKey]}`;
    }

    return key;
};

let wrapPagePropsWithStore = (props, options = {}) => {
    let {
        get,
        set
    } = pagePropsStore(options);

    let originOnsignal = props.onsignal;

    props.onsignal = (signal, data, ctx) => {
        if (options.signalTypes) {
            if (options.signalTypes.findIndex((type) => signal.type === type) !== -1) {
                set(data.props);
            }
        } else {
            set(data.props);
        }
        return originOnsignal && originOnsignal(signal, data, ctx);
    };

    return get(props);
};

module.exports = {
    pagePropsStore,
    wrapPagePropsWithStore
};
