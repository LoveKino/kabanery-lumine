'use strict';

const styles = (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
};

const isMapObject = (v) => {
    return v && typeof v === 'object' && !Array.isArray(v);
};

const deepMergeMap = (tar, def, path = '', options = {}) => {
    let blackList = options.blackList || [];
    if (blackList.findIndex((item) => item === path) !== -1) {
        return tar;
    }
    if (isMapObject(def)) {
        tar = tar || {};
        if (isMapObject(tar)) {
            for (let name in def) {
                tar[name] = deepMergeMap(tar[name], def[name], path === '' ? name : path + '.' + name, options);
            }
        }
        return tar;
    } else {
        if (tar === undefined) return def;
        return tar;
    }
};

const resolveFnValue = (fn, ...args) => {
    if (typeof fn === 'function') {
        return resolveFnValue(fn(...args));
    }

    return fn;
};

const get = (obj, key = '') => {
    key = key.trim();
    let parts = !key ? [] : key.split('.');

    let partLen = parts.length;
    for (let i = 0; i < partLen; i++) {
        let part = parts[i].trim();
        if (part) {
            obj = obj[part];
        }
    }

    return obj;
};

const set = (obj, key = '', value) => {
    key = key.trim();
    let parts = !key ? [] : key.split('.');
    if (!parts.length) return;
    let parent = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];
        part = part.trim();
        if (part) {
            let next = parent[part];
            if (!isObject(next)) {
                next = {};
                parent[part] = next;
            }
            parent = next;
        }
    }

    parent[parts[parts.length - 1]] = value;
    return obj;
};

const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const likeArray = (v) => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
    styles,
    isMapObject,
    deepMergeMap,
    resolveFnValue,
    get,
    set,
    isObject,
    likeArray,
    isString
};
