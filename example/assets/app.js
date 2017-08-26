/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view
} = __webpack_require__(4);

let steadyTheme = __webpack_require__(14);

let {
    deepMergeMap,
    resolveFnValue
} = __webpack_require__(2);

let ClassTable = __webpack_require__(38);

let {
    Signal
} = __webpack_require__(6);

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       // public data
 *       props,
 *       children // child views
 *    }
 *
 *    props.onsigal
 *    props.theme
 *
 * 2. onsignal interface
 *
 *    onsignal: (signal, data, ctx) -> Any
 */

module.exports = (viewFun, {
    defaultProps = {},
    defaultChildren = [],
    theme = steadyTheme,
    classTable
} = {}) => {
    let defaultStyle = defaultProps.style || {};

    let defaultStyleValue = resolveFnValue(defaultStyle, theme);
    let classTableValue = resolveFnValue(classTable, theme);

    let {
        appendStyle,
        getClassName,
        updateClassTable
    } = ClassTable(classTableValue);

    return view((viewData, ctx) => {
        viewData.props = viewData.props || {};
        viewData.children = (viewData.children && viewData.children.length) ? viewData.children : defaultChildren;
        viewData.props.theme = viewData.props.theme || theme;

        appendStyle();
        // TODO check view Data

        // update defaultStyleValue
        if (viewData.props.theme && typeof defaultStyle === 'function') {
            defaultStyleValue = resolveFnValue(defaultStyle, viewData.props.theme);
        }

        // update class table
        if (viewData.theme && typeof classTable === 'function') {
            classTableValue = resolveFnValue(classTable, viewData.props.theme);
            updateClassTable(classTableValue);
        }

        // merge (deep merge)
        viewData.props.style = deepMergeMap(viewData.props.style, defaultStyleValue);
        viewData.props = deepMergeMap(viewData.props, defaultProps);

        let notify = (signal) => {
            viewData.props.onsignal && viewData.props.onsignal(signal, ctx.getData(), ctx);
        };

        let updateWithNotify = (signal, ...updateScript) => {
            signal = signal || Signal('update-view-data');
            ctx.update(...updateScript);
            // notify
            notify(signal);
        };

        ctx.notify = notify;
        ctx.updateWithNotify = updateWithNotify;
        ctx.getClassName = getClassName;

        return viewFun(viewData, ctx);
    });
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * basic types
 */

let truth = () => true;

let isUndefined = v => v === undefined;

let isNull = v => v === null;

let isFalsy = v => !v;

let likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);

let isArray = v => Array.isArray(v);

let isString = v => typeof v === 'string';

let isObject = v => !!(v && typeof v === 'object');

let isFunction = v => typeof v === 'function';

let isNumber = v => typeof v === 'number' && !isNaN(v);

let isBool = v => typeof v === 'boolean';

let isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node :
        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

let isRegExp = v => v instanceof RegExp;

let isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);

let isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);

/**
 * check type
 *
 * types = [typeFun]
 */
let funType = (fun, types = []) => {
    if (!isFunction(fun)) {
        throw new TypeError(typeErrorText(fun, 'function'));
    }

    if (!likeArray(types)) {
        throw new TypeError(typeErrorText(types, 'array'));
    }

    for (let i = 0; i < types.length; i++) {
        let typeFun = types[i];
        if (typeFun) {
            if (!isFunction(typeFun)) {
                throw new TypeError(typeErrorText(typeFun, 'function'));
            }
        }
    }

    return function() {
        // check type
        for (let i = 0; i < types.length; i++) {
            let typeFun = types[i];
            let arg = arguments[i];
            if (typeFun && !typeFun(arg)) {
                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);
            }
        }
        // result
        return fun.apply(this, arguments);
    };
};

let and = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (!typeFun(v)) {
                return false;
            }
        }
        return true;
    };
};

let or = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }

    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (typeFun(v)) {
                return true;
            }
        }
        return false;
    };
};

let not = (type) => {
    if (!isFunction(type)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => !type(v);
};

let any = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'list'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (!type(list[i])) {
            return false;
        }
    }
    return true;
};

let exist = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'array'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (type(list[i])) {
            return true;
        }
    }
    return false;
};

let mapType = (map) => {
    if (!isObject(map)) {
        throw new TypeError(typeErrorText(map, 'obj'));
    }

    for (let name in map) {
        let type = map[name];
        if (!isFunction(type)) {
            throw new TypeError(typeErrorText(type, 'function'));
        }
    }

    return (v) => {
        if (!isObject(v)) {
            return false;
        }

        for (let name in map) {
            let type = map[name];
            let attr = v[name];
            if (!type(attr)) {
                return false;
            }
        }

        return true;
    };
};

let listType = (type) => {
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    return (list) => any(list, type);
};

let typeErrorText = (v, expect) => {
    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;
};

module.exports = {
    isArray,
    likeArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise,
    isNull,
    isUndefined,
    isFalsy,
    isRegExp,
    isReadableStream,
    isWritableStream,

    funType,
    any,
    exist,

    and,
    or,
    not,
    mapType,
    listType,
    truth
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let styles = (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
};

let isMapObject = (v) => {
    return v && typeof v === 'object' && !Array.isArray(v);
};

let deepMergeMap = (tar, def, path = '', options = {}) => {
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

let resolveFnValue = (fn, ...args) => {
    if (typeof fn === 'function') {
        return resolveFnValue(fn(...args));
    }

    return fn;
};

let get = (obj, key = '') => {
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

let set = (obj, key = '', value) => {
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

let isObject = (v) => v && typeof v === 'object';

let likeArray = (v) => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
    styles,
    isMapObject,
    deepMergeMap,
    resolveFnValue,
    get,
    set,
    isObject,
    likeArray
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(1);

let iterate = __webpack_require__(11);

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact
} = __webpack_require__(22);

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(21);

/**
 * @readme-doc
 *
 * ## features
 *
 * - simple DOM DSL, construct dom tree quickly
 *
 * - data-driven view, include updating view by data
 *
 * - Just functions, easy to compose
 *
 * [readme-lang:zh]## 特征
 *
 * - 简单的DOM DSL，快速构建DOM结构
 *
 * - 数据驱动视图，包括通过数据更新视图
 *
 * - 以函数为核心，易于复合
 *
 */

/**
 * @readme-quick-run
 *
 * Using method n to construct dom node quickly.
 *
 * [readme-lang:zh]用方法n快速构造dom节点
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {n, mount} = kabanery;
 *
 * mount(n('div', {
 *   id: 'qu',
 *   style: {
 *      backgroundColor: 'red'
 *   }
 * }, [
 *      n('span class=go style="font-size:16px"', 'hello!')
 * ]), document.body);
 *
 * console.log(document.getElementById('qu').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Basic way to construct a view.
 *
 * [readme-lang:zh]构造一个组件的简单方法
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data) => {
 *      let {type} = data;
 *
 *      return n('div', {
 *         id: 'test1',
 *         style: {
 *            fontSize: 10
 *         }
 *      },[
 *          type === 2 && n('span', 'second'),
 *          type === 3 && n('div', 'third')
 *      ]);
 * });
 *
 * mount(MyView({type: 3}), document.body);
 *
 * console.log(document.getElementById('test1').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Using update api to update a view.
 *
 * [readme-lang:zh]运用update api去更新一个view
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data, {update}) => {
 *      return n('div', {
 *         id: 'a',
 *         style: {
 *            fontSize: 10
 *         },
 *         onclick: () => {
 *            update('show', !data.show);
 *         }
 *      }, [
 *          data.show && n('div', 'show text')
 *      ]);
 * });
 *
 * mount(MyView({show: false}), document.body);
 *
 * document.getElementById('a').click(); // simulate user action
 * console.log(document.getElementById('a').outerHTML); // print result
 */


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n,
    parseArgs
} = __webpack_require__(4);

module.exports = (...args) => {
    let tagName = args[0];

    if (typeof tagName === 'string') {
        return n(...args);
    } else {
        let {
            attributes,
            childs
        } = parseArgs(args, {
            doParseStyle: false
        });

        return tagName({
            props: attributes,
            children: childs
        });
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let Signal = (type, data) => {
    return {
        type,
        data
    };
};

let isSignalType = (s, type) => {
    return s.type === type;
};

let onSignalType = (expectType, fn) => (signal, ...rest) => {
    if (isSignalType(signal, expectType)) {
        return fn(signal, ...rest);
    }
};

let deliver = (ctx, type, extra) => (sourceSignal, sourceData, sourceCtx) => {
    ctx.notify(Signal(type, {
        sourceType: 'delivered',
        sourceSignal,
        sourceData,
        sourceCtx,
        extra
    }));
};

module.exports = {
    Signal,
    onSignalType,
    isSignalType,
    deliver
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    reduce
} = __webpack_require__(3);
let {
    funType, isObject, or, isString, isFalsy
} = __webpack_require__(1);

let defineProperty = (obj, key, opts) => {
    if (Object.defineProperty) {
        Object.defineProperty(obj, key, opts);
    } else {
        obj[key] = opts.value;
    }
    return obj;
};

let hasOwnProperty = (obj, key) => {
    if (obj.hasOwnProperty) {
        return obj.hasOwnProperty(key);
    }
    for (var name in obj) {
        if (name === key) return true;
    }
    return false;
};

let toArray = (v = []) => Array.prototype.slice.call(v);

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let set = (sandbox, name = '', value) => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    let parent = sandbox;
    if (!isObject(parent)) return;
    if (!parts.length) return;
    for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];
        parent = parent[part];
        // avoid exception
        if (!isObject(parent)) return null;
    }

    parent[parts[parts.length - 1]] = value;
    return true;
};

/**
 * provide property:
 *
 * 1. read props freely
 *
 * 2. change props by provide token
 */

let authProp = (token) => {
    let set = (obj, key, value) => {
        let temp = null;

        if (!hasOwnProperty(obj, key)) {
            defineProperty(obj, key, {
                enumerable: false,
                configurable: false,
                set: (value) => {
                    if (isObject(value)) {
                        if (value.token === token) {
                            // save
                            temp = value.value;
                        }
                    }
                },
                get: () => {
                    return temp;
                }
            });
        }

        setProp(obj, key, value);
    };

    let setProp = (obj, key, value) => {
        obj[key] = {
            token,
            value
        };
    };

    return {
        set
    };
};

let evalCode = (code) => {
    if (typeof code !== 'string') return code;
    return eval(`(function(){
    try {
        ${code}
    } catch(err) {
        console.log('Error happened, when eval code.');
        throw err;
    }
})()`);
};

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let runSequence = (list, params = [], context, stopV) => {
    if (!list.length) {
        return Promise.resolve();
    }
    let fun = list[0];
    let v = fun && fun.apply(context, params);
    if (stopV && v === stopV) {
        return Promise.resolve(stopV);
    }
    return Promise.resolve(v).then(() => {
        return runSequence(list.slice(1), params, context, stopV);
    });
};

module.exports = {
    defineProperty,
    hasOwnProperty,
    toArray,
    get,
    set,
    authProp,
    evalCode,
    delay,
    runSequence
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    map
} = __webpack_require__(3);
let {
    isObject, isNode
} = __webpack_require__(1);

let parseArgs = __webpack_require__(23);

let parseStyle = __webpack_require__(12);

const KABANERY_NODE = 'kabanery_node';

// TODO general proxy n way

let cn = (elementType) => {
    return (...args) => {
        let {
            tagName, attributes, childs
        } = parseArgs(args);

        if (isKabaneryNode(attributes)) {
            childs = [attributes];
            attributes = {};
        }

        // plugin
        runPlugins(attributes['plugin'], tagName, attributes, childs);

        let {
            attrMap, eventMap
        } = splitAttribues(attributes);

        return {
            tagName,
            attrMap,
            eventMap,
            elementType,
            type: KABANERY_NODE, childNodes: childs,
        };
    };
};

let isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

let bindPlugs = (typen, plugs = []) => (...args) => {
    let {
        tagName, attributes, childs
    } = parseArgs(args);

    let oriPlugs = attributes.plugin = attributes.plugin || [];
    attributes.plugin = oriPlugs.concat(plugs);

    let node = typen(tagName, attributes, childs);

    return node;
};

let runPlugins = (plugs = [], tagName, attributes, childExp) => {
    for (let i = 0; i < plugs.length; i++) {
        let plug = plugs[i];
        plug && plug(tagName, attributes, childExp);
    }
};

let splitAttribues = (attributes) => {
    let attrMap = {},
        eventMap = {};
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            eventMap[name.substring(2)] = item;
        } else if (name !== 'plugin') {
            attrMap[name] = item;
        }
    }
    return {
        attrMap,
        eventMap
    };
};

// TODO svg
let toHTML = (node) => {
    if (isNode(node)) {
        return node.outerHTML;
    } else if (isKabaneryNode(node)) {
        let {
            tagName, attrMap, childNodes
        } = node;
        let attrStr = map(attrMap, (value, key) => `${key}="${value}"`).join(' ');
        attrStr = attrStr ? ' ' + attrStr : '';
        return `<${tagName}${attrStr}>${map(childNodes, toHTML).join('')}</${tagName}>`;
    } else {
        return node + '';
    }
};

module.exports = {
    n: cn('html'),
    svgn: cn('svg'),
    cn,
    bindPlugs,
    isKabaneryNode,
    toHTML,
    parseArgs,
    parseStyle
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    createElement, createSvgElement
} = __webpack_require__(34);

let {
    bindEvents
} = __webpack_require__(10);

let {
    map
} = __webpack_require__(3);

let {
    isKabaneryNode
} = __webpack_require__(8);

let reduceNode = (node) => {
    if (isKabaneryNode(node)) {
        let tarNode = null;
        if (node.elementType === 'html') {
            tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        } else {
            tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        }

        bindEvents(tarNode, node.eventMap);
        return tarNode;
    } else {
        return node;
    }
};

module.exports = reduceNode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let EventMatrix = __webpack_require__(35);

let {
    listenEventType,
    attachDocument,
    dispatchEvent
} = EventMatrix();

let bindEvents = (node, eventMap) => {
    // hook event at node
    node.__eventMap = eventMap;

    for (let type in eventMap) {
        listenEventType(type);
    }
};

module.exports = {
    bindEvents,
    attachDocument,
    dispatchEvent
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, mapType
} = __webpack_require__(1);

/**
 *
 * preidcate: chose items to iterate
 * limit: when to stop iteration
 * transfer: transfer item
 * output
 */
let iterate = funType((domain = [], opts = {}) => {
    let {
        predicate, transfer, output, limit, def
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);

    let rets = def;
    let count = 0;

    if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let itemRet = iterateItem(domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let itemRet = iterateItem(domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
}, [
    or(isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateItem = (domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    let item = domain[name];
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = iterate;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString,
    isObject
} = __webpack_require__(1);

module.exports = (attr = '', {
    keyWrapper,
    valueWrapper
} = {}) => {
    if (isString(attr)) {
        return attr;
    }

    if (!isObject(attr)) {
        throw new TypeError(`Expect object for style object, but got ${attr}`);
    }
    let styles = [];
    for (let key in attr) {
        let value = attr[key];
        key = convertStyleKey(key);
        value = convertStyleValue(value, key);
        if (keyWrapper) {
            key = keyWrapper(key, value);
        }

        if (valueWrapper) {
            value = valueWrapper(value, key);
        }

        styles.push(`${key}: ${value};`);
    }
    return styles.join('');
};

let convertStyleKey = (key) => {
    return key.replace(/[A-Z]/, (letter) => {
        return `-${letter.toLowerCase()}`;
    });
};

let convertStyleValue = (value, key) => {
    if (typeof value === 'number' && key !== 'z-index') {
        return value + 'px';
    }
    if (key === 'padding' || key === 'margin') {
        let parts = value.split(' ');
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (!isNaN(Number(part))) {
                parts[i] = part + 'px';
            }
        }

        value = parts.join(' ');
    }
    return value;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    attachDocument
} = __webpack_require__(10);

let {
    isNode
} = __webpack_require__(1);

let {
    flat, forEach
} = __webpack_require__(3);

let reduceNode = __webpack_require__(9);

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
module.exports = (kabaneryRoots, parentNode) => {
    kabaneryRoots = flat(kabaneryRoots);

    forEach(kabaneryRoots, (item) => {
        item = reduceNode(item);
        if (isNode(item)) {
            parentNode.appendChild(item);
        }
    });

    // attach to document
    attachDocument(getDoc(parentNode));
};

let getDoc = (node) => {
    while (node.parentNode) {
        node = node.parentNode;
    }
    return node;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    styles
} = __webpack_require__(2);

let basics = {
    pageColor: '#e4e4e4',
    hoverColor: '#e9ece5',
    blockColor: '#3b3a36',
    borderColor: '#b3c2bf',
    veilColor: 'rgba(60,60,60,0.6)',
    fontColor: 'white',
    noticeColor: 'rgb(23, 21, 21)',

    titleSize: 20,
    normalSize: 16,

    narrowPadding: '4 8 4 8',

    contrastBlockColor: 'white',
    contrastFontColor: 'black'
};

let container = {
    position: 'relative',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    border: 0,
    borderRadius: 0,
    overflow: 'auto'
};

let fullParentHeight = {
    height: '100%'
};

let fullParentWidth = {
    width: '100%'
};

let fullWindow = styles(container, {
    position: 'fixed',
    left: 0,
    top: 0,
}, fullParentWidth, fullParentHeight);

let fullParent = styles(container, fullParentWidth, fullParentHeight);

let bulk = styles(container, {
    minWidth: 40,
    backgroundColor: basics.blockColor,
    color: basics.fontColor
});

let contrastBulk = styles(bulk, {
    backgroundColor: basics.contrastBlockColor,
    color: basics.contrastFontColor
});

let oneLineBulk = styles(bulk, {
    padding: basics.narrowPadding,
    fontSize: basics.normalSize,
    textAlign: 'center',
    lineHeight: 20,
    textDecoration: 'none',
    border: 'none',
    color: basics.fontColor
});

let flat = {
    appearance: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    boxShadow: 'none',
    borderRadius: 'none',
    border: 0
};

let inputBox = styles(contrastBulk, flat, {
    width: 260,
    padding: basics.narrowPadding,
    backgroundColor: basics.fontColor
});

let textAreaBox = styles(inputBox, {
    width: 360,
    height: 200,
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
    border: `1px solid ${basics.borderColor}`,
    borderRadius: 5,
    fontSize: 16
});

let underLineBorder = {
    border: 0,
    borderRadius: 0,
    'border-bottom': `1px solid ${basics.borderColor}`
};

let underLineFocus = {
    'border-bottom': `2px solid ${basics.blockColor}`
};

let actions = {
    cling: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },

    hover: {
        backgroundColor: basics.hoverColor
    },

    active: {
        backgroundColor: basics.hoverColor
    },

    focus: {
        outline: 'none'
    }
};

module.exports = {
    basics,

    bulk,
    oneLineBulk,
    inputBox,
    textAreaBox,
    underLineBorder,
    underLineFocus,
    container,

    fullWindow,
    fullParent,
    fullParentWidth,
    fullParentHeight,

    actions
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(4);
let lumineView = __webpack_require__(0);
let {
    Signal
} = __webpack_require__(6);
let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props,
    children
}, {
    notify,
    getClassName
}) => {
    // TODO validate
    let attributes = {
        'class': `${getClassName('btn')}`,
        style: props.style,
        onclick: () => {
            notify(Signal('click'));
        }
    };
    if (props.id) {
        attributes.id = props.id;
    }
    return n('button', attributes, children[0]);
}, {
    defaultProps: {
        style: (theme) => styles(theme.oneLineBulk)
    },

    classTable: (theme) => {
        return {
            'btn:hover': theme.actions.hover,
            'btn:active': theme.actions.signal,
            'btn:focus': theme.actions.focus
        };
    }
});


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(4);
let lumineView = __webpack_require__(0);
let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props,
    children
}) => {
    return n('div', {
        style: props.style
    }, children);
}, {
    defaultProps: {
        style: (theme) => styles(theme.fullParent)
    },

    defaultChildren: ['']
});


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
    MODE_PILE: 'pile',
    MODE_PERCENTAGE: 'percentage'
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(5);

let lumineView = __webpack_require__(0);

// TODO easy disappear for loading view
module.exports = lumineView(({
    props
}, {
    getClassName
}) => {
    return props.show ? n('div', {
        'class': getClassName('load-suffix'),
        style: props.style
    }, props.textPrefix) : n('div');
}, {
    defaultProps: {
        textPrefix: 'loading',
        show: true,
        style: {
            display: 'inline-block'
        }
    },

    classTable: {
        '@keyframes loading': `
    0% {
        content: ""
    }
    33% {
        content: "."
    }
    67% {
        content: ".."
    }
    100% {
        content: "..."
    }`,
        'load-suffix::after': ({
            getClassName
        }) => {
            return {
                content: JSON.stringify('.'),
                animation: `${getClassName('loading')} 3s infinite ease-in-out`
            };
        }
    }
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let FullWindow = __webpack_require__(44);
let lumineView = __webpack_require__(0);
let n = __webpack_require__(5);

module.exports = lumineView(({
    props,
    children
}) => {
    return n(FullWindow, props, children);
}, {
    defaultProps: {
        style: (theme) => {
            return {
                backgroundColor: theme.basics.veilColor,
                color: theme.basics.fontColor,
                zIndex: 1000
            };
        }
    }
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    mount
} = __webpack_require__(4);

let n = __webpack_require__(5);

let FunctionBar = __webpack_require__(37);
let Button = __webpack_require__(15);
let Input = __webpack_require__(39);
let TextArea = __webpack_require__(40);
let Hn = __webpack_require__(41);
let Vn = __webpack_require__(42);
let Notice = __webpack_require__(43);
let TextLoading = __webpack_require__(18);
let PageMask = __webpack_require__(19);
let PageLoading = __webpack_require__(45);

let steadyTheme = __webpack_require__(14);

let log = console.log; // eslint-disable-line

let logSignal = (signal, data) => {
    log(JSON.stringify(signal));
    log(JSON.stringify(data));
};

let examples = [

    {
        name: 'function bar',
        render: () => n(FunctionBar, {
            title: 'demo',
            leftLogos: [
                n('div', '<'), 'a', 'b'
            ],
            rightLogos: ['c', 'd'],

            onsignal: logSignal
        })
    },
    {
        name: 'button',
        render: () => n(Button, {
            onsignal: logSignal
        }, ['demo'])
    },

    {
        name: 'input',
        render: () => n(Input, {
            value: 'abc',
            onsignal: logSignal
        })
    },

    {
        name: 'hn',
        render: () => n('div', {
            style: {
                width: 400
            }
        }, [n(Hn, {
            style: {
                childs: [{
                    backgroundColor: 'blue'
                }, {
                    backgroundColor: 'red'
                }, {
                    backgroundColor: 'yellow'
                }]
            }
        }, [
            n('span', 'this is 1'),
            n('span', 'this is 2..'),
            n('span', 'this is 3....')
        ])])
    },

    {
        name: 'hn2: percentage',
        render: () => n('div', {
            style: {
                width: 400
            }
        }, [n(Hn, {
            mode: 'percentage',
            pers: [4, 8, 3],
            style: {
                childs: [{
                    backgroundColor: 'blue'
                }, {
                    backgroundColor: 'red'
                }, {
                    backgroundColor: 'yellow'
                }]
            }
        }, [
            n('span', 'this is 1'),
            n('span', 'this is 2..'),
            n('span', 'this is 3....')
        ])])
    },

    {
        name: 'vn',
        render: () => n('div', {
            style: {
                width: 400
            }
        }, [
            n(Vn, {
                style: {
                    childs: [{
                        backgroundColor: 'blue'
                    }, {
                        backgroundColor: 'red'
                    }, {
                        backgroundColor: 'yellow'
                    }]
                }
            }, [
                n('span', 'this is 1'),
                n('span', 'this is 2..'),
                n('span', 'this is 3....')
            ])
        ])
    },

    {
        name: 'vn2: MODE_PERCENTAGE',
        render: () => n('div', {
            style: {
                width: 400,
                height: 200
            }
        }, [
            n(Vn, {
                mode: 'percentage',
                pers: [3, 6, 9],
                style: {
                    childs: [{
                        backgroundColor: 'blue'
                    }, {
                        backgroundColor: 'red'
                    }, {
                        backgroundColor: 'yellow'
                    }]
                }
            }, [
                n('span', 'this is 1'),
                n('span', 'this is 2..'),
                n('span', 'this is 3....')
            ])
        ])
    },

    {
        name: 'notice',

        render: () => n(Notice, {
            text: 'notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................'
        })
    },

    {
        name: 'textLoading',
        render: () => n(TextLoading)
    },

    /*
    {
        name: 'pageMask',
        render: () => n(PageMask)
    },

    {
        name: 'PageLoading',
        render: () => n(PageLoading)
    },

    */
];

let Pager = n('div', {
    style: {
        width: '100%',
        height: '100%',
        backgroundColor: steadyTheme.basics.pageColor
    }
}, examples.map(({
    name,
    render
}) => {
    return n('div', {
        style: {
            padding: 8
        }
    }, [
        n('div style="font-weight:bold;"', {
            style: {
                width: '100%',
                backgroundColor: steadyTheme.basics.borderColor
            }
        }, name),

        n('div', {
            style: {
                padding: 8
            }
        }, [
            n('div', 'code'),
            n(TextArea, {
                value: render.toString()
            }),
            n('br'),

            n('div', 'UI'),
            render()
        ])
    ]);
}));

mount(Pager, document.body);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n, svgn, bindPlugs, toHTML, parseArgs, isKabaneryNode, cn, parseStyle
} = __webpack_require__(8);

let plugs = __webpack_require__(25);

let view = __webpack_require__(28);

let mount = __webpack_require__(13);

let N = __webpack_require__(36);

let reduceNode = __webpack_require__(9);

let {dispatchEvent} = __webpack_require__(10);

module.exports = {
    n,
    isKabaneryNode,
    cn,
    N,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount,
    toHTML,
    reduceNode,

    parseArgs,
    parseStyle,
    dispatchEvent
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let iterate = __webpack_require__(11);

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

module.exports = {
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let parseAttribute = __webpack_require__(24);

let {
    isString,
    isObject,
    isNode,
    likeArray,
    isNumber,
    isBool
} = __webpack_require__(1);

let parseArgs = (args, {
    doParseStyle = true
} = {}) => {
    let tagName,
        attributes = {},
        childExp = [];

    let first = args.shift();

    let parts = splitTagNameAttribute(first);

    if (parts.length > 1) { // not only tagName
        tagName = parts[0];
        attributes = parts[1];
    } else {
        tagName = first;
    }

    let next = args.shift();

    let nextAttr = {};

    if (likeArray(next) ||
        isString(next) ||
        isNode(next) ||
        isNumber(next) ||
        isBool(next)) {
        childExp = next;
    } else if (isObject(next)) {
        nextAttr = next;
        childExp = args.shift() || [];
    }

    attributes = parseAttribute(attributes, nextAttr, {
        doParseStyle
    });

    let childs = parseChildExp(childExp);

    return {
        tagName,
        attributes,
        childs
    };
};

let splitTagNameAttribute = (str = '') => {
    if (typeof str !== 'string') return [str];

    let tagName = str.split(' ')[0];
    let attr = str.substring(tagName.length);
    attr = attr && attr.trim();

    tagName = tagName.toLowerCase().trim();
    if (attr) {
        return [tagName, attr];
    } else {
        return [tagName];
    }
};

let parseChildExp = (childExp) => {
    let ret = [];
    if (isNode(childExp)) {
        ret.push(childExp);
    } else if (likeArray(childExp)) {
        for (let i = 0; i < childExp.length; i++) {
            let child = childExp[i];
            ret = ret.concat(parseChildExp(child));
        }
    } else if (childExp) {
        ret.push(childExp);
    }
    return ret;
};

module.exports = parseArgs;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString
} = __webpack_require__(1);

let parseStyle = __webpack_require__(12);

let {
    mergeMap
} = __webpack_require__(3);

const ITEM_REG = /([\w-]+)\s*=\s*(([\w-]+)|('.*?')|(".*?"))/;

// TODO better key=value grammer
// TODO refactor with grammerL: class grammer, id grammer, refer some popular grammer
let parseAttribute = (attributes, nextAttr, {
    doParseStyle
}) => {
    // key=value key=value
    // value='abc' value=true value=123 value="def"
    if (isString(attributes)) {
        let str = attributes.trim(),
            kvs = [];

        let stop = false;
        while (!stop) {
            let newstr = str.replace(ITEM_REG, (matchStr, $1, $2) => {
                kvs.push([$1, $2]);
                return '';
            }).trim();
            if (newstr === str) {
                stop = true;
            }
            str = newstr;
        }

        attributes = {};
        for (let i = 0; i < kvs.length; i++) {
            let [key, value] = kvs[i];
            if (value[0] === '\'' && value[value.length - 1] === '\'' ||
                value[0] === '"' && value[value.length - 1] === '"') {
                value = value.substring(1, value.length - 1);
            }
            attributes[key] = value;
        }
    }
    // merge
    attributes = mergeMap(attributes, nextAttr);

    if (attributes.style && doParseStyle) {
        attributes.style = parseStyle(attributes.style);
    }

    // TODO presudo
    /*
    if (attributes.presudo) {
        for (let name in attributes.presudo) {
            attributes.presudo[name] = parseStyle(attributes.presudo[name]);
        }
    }
   */

    return attributes;
};

module.exports = parseAttribute;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let twowaybinding = __webpack_require__(26);
let eventError = __webpack_require__(27);

module.exports = {
    twowaybinding,
    eventError
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    get, set
} = __webpack_require__(7);

module.exports = (obj, path) => (tagName, attributes, childExp) => {
    let value = get(obj, path, '');
    if (tagName === 'input') {
        attributes.value = value;
    } else {
        childExp.unshift(value);
    }

    if (!attributes.oninput) {
        attributes.oninput = (e) => {
            set(obj, path, e.target.value);
        };
    }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (catcher) => (tagName, attributes) => {
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            if (typeof item === 'function') {
                attributes[name] = wrapEventHandler(item, catcher);
            }
        }
    }
};

let wrapEventHandler = (fun, catcher) => {
    return function () {
        try {
            let ret = fun.apply(this, arguments);
            ret = Promise.resolve(ret);
            ret.catch(catcher);
            return ret;
        } catch (err) {
            return catcher(err);
        }
    };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    set
} = __webpack_require__(7);

let {
    isObject,
    isFunction,
    likeArray
} = __webpack_require__(1);

let {
    forEach
} = __webpack_require__(3);

let replace = __webpack_require__(29);

let reduceNode = __webpack_require__(9);

let mount = __webpack_require__(13);

/**
 * render function: (data) => node
 */

// TODO observable for update, append

// class level
let View = (view, construct, {
    afterRender
} = {}) => {
    // TODO class level API
    // instance level
    let viewer = (obj, initor) => {
        // create context
        let ctx = createCtx({
            view,
            afterRender
        });

        return createView(ctx, obj, initor, construct);
    };

    let viewerOps = (viewer) => {
        viewer.create = (handler) => {
            let ctx = createCtx({
                view,
                afterRender
            });

            handler && handler(ctx);

            let inst = (obj, initor) => {
                return createView(ctx, obj, initor, construct);
            };

            inst.ctx = ctx;

            return inst;
        };

        // extend some context
        viewer.expand = (ctxMap = {}) => {
            let newViewer = (...args) => {
                let obj = args[0];
                args[0] = View.ext(obj, ctxMap);

                return viewer(...args);
            };

            viewerOps(newViewer);
            return newViewer;
        };
    };

    viewerOps(viewer);

    return viewer;
};

View.ext = (data, ctxMap = {}) => (ctx) => {
    for (let name in ctxMap) {
        ctx[name] = ctxMap[name];
    }
    if (isFunction(data)) {
        return data(ctx);
    }
    return data;
};

let createView = (ctx, obj, initor, construct) => {
    let data = ctx.initData(obj, ctx);
    // only run initor when construct view
    initor && initor(data, ctx);
    construct && construct(data, ctx);

    // render node
    return ctx.replaceView();
};

let createCtx = ({
    view,
    afterRender
}) => {
    let node = null,
        data = null,
        render = null;

    let update = (...args) => {
        updateData(...args);
        return replaceView();
    };

    let updateData = (...args) => {
        if (args.length === 1 && likeArray(args[0])) {
            let arg = args[0];
            forEach(arg, (item) => {
                set(data, item[0], item[1]);
            });
        } else {
            let [path, value] = args;

            // function is a special data
            if (isFunction(value)) {
                value = value(data);
            }

            set(data, path, value);
        }
    };

    let appendView = (itemView) => {
        if (node) {
            mount(itemView, node);
        }
    };

    let replaceView = () => {
        let newNode = getNewNode();
        newNode = reduceNode(newNode);

        // type check for newNode

        node = replace(node, newNode);

        afterRender && afterRender(ctx);

        if (node) node.ctx = ctx;
        return node;
    };

    let getNewNode = () => {
        if (!render) render = view;
        let ret = render(data, ctx);
        if (isFunction(ret)) {
            render = ret;
            return render(data, ctx);
        } else {
            return ret;
        }
    };

    let initData = (obj = {}) => {
        data = generateData(obj, ctx);
        return data;
    };

    let getNode = () => node;

    let getData = () => data;

    let getCtx = () => ctx;

    // TODO refator
    let transferCtx = (newNode) => {
        node = newNode;
        newNode.ctx = ctx;
    };

    let ctx = {
        update,
        updateData,
        getNode,
        getData,
        transferCtx,
        initData,
        replaceView,
        appendView,
        getCtx
    };

    return ctx;
};

let generateData = (obj, ctx) => {
    let data = null;
    // data generator
    if (isFunction(obj)) {
        data = obj(ctx);
    } else {
        data = obj;
    }

    // TODO need mount event
    if (!isObject(data)) {
        throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
    }
    return data;
};

module.exports = View;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    toArray
} = __webpack_require__(7);

let {
    isNode
} = __webpack_require__(1);

let {
    forEach
} = __webpack_require__(3);

let applyAttibutes = __webpack_require__(30);

let replaceDirectly = (node, newNode) => {
    let parent = node.parentNode;
    if (parent) {
        // replace
        parent.replaceChild(newNode, node);
        return newNode;
    } else {
        return node;
    }
};

let removeOldNode = (oldNode) => {
    let parent = oldNode.parentNode;
    if (parent) {
        parent.removeChild(oldNode);
    }
};

// TODO using key
let diffNode = (node, newNode) => {
    if (!newNode) {
        return removeOldNode(node);
    }

    if (node.nodeType === 3 && newNode.nodeType === 3) {
        node.textContent = newNode.textContent;
    }

    if (isNode(node) && isNode(newNode)) {
        if (node.nodeType === 3 && newNode.nodeType === 3) {
            node.textContent = newNode.textContent;
            return node;
        }

        if (node.tagName !== newNode.tagName ||
            node.tagName === 'INPUT'
        ) {
            // TODO problems performance
            // TODO nodetype problem
            return replaceDirectly(node, newNode);
        } else {
            editNode(node, newNode);
        }
    }
    return node;
};

let editNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);

    // transfer context
    if (newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }

    // transfer event map
    if (newNode.__eventMap) {
        node.__eventMap = newNode.__eventMap;
    }

    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // TODO using key
    convertLists(orinChildNodes, newChildNodes, node);
};

let convertLists = (orinChildNodes, newChildNodes, parent) => {
    removeExtra(orinChildNodes, newChildNodes);

    // diff
    forEach(orinChildNodes, (orinChild, i) => {
        diffNode(orinChild, newChildNodes[i]);
    });

    appendMissing(orinChildNodes, newChildNodes, parent);
    return orinChildNodes;
};

let removeExtra = (orinChildNodes, newChildNodes) => {
    // remove
    for (let i = newChildNodes.length; i < orinChildNodes.length; i++) {
        removeOldNode(orinChildNodes[i]);
    }
};

let appendMissing = (orinChildNodes, newChildNodes, parent) => {
    // append
    for (let i = orinChildNodes.length; i < newChildNodes.length; i++) {
        let newChild = newChildNodes[i];
        parent.appendChild(newChild);
    }
};

module.exports = (node, newNode) => {
    let ret = null;

    if (!node) {
        ret = newNode;
    } else if (!newNode) {
        removeOldNode(node);
        ret = null;
    } else {
        ret = diffNode(node, newNode);
    }

    return ret;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    getAttributeMap
} = __webpack_require__(31);

let {
    hasOwnProperty
} = __webpack_require__(7);

let {
    forEach
} = __webpack_require__(3);

let applyAttibutes = (node, newNode) => {
    // attributes
    let orinAttrMap = getAttributeMap(node.attributes);
    let newAttrMap = getAttributeMap(newNode.attributes);

    // update and remove
    forEach(orinAttrMap, (orinValue, name) => {
        if (hasOwnProperty(newAttrMap, name)) {
            let newValue = newAttrMap[name];
            if (newValue !== orinValue) {
                node.setAttribute(name, newValue);
            }
        } else {
            node.removeAttribute(name);
        }
    });

    // append
    forEach(newAttrMap, (newAttr, name) => {
        if (!hasOwnProperty(orinAttrMap, name)) {
            node.setAttribute(name, newAttr);
        }
    });
};

module.exports = applyAttibutes;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = __webpack_require__(32);

let startMomenter = __webpack_require__(33);

let getX = (elem) => {
    var x = 0;
    while (elem) {
        x = x + elem.offsetLeft;
        elem = elem.offsetParent;
    }
    return x;
};

let getY = (elem) => {
    var y = 0;
    while (elem) {
        y = y + elem.offsetTop;
        elem = elem.offsetParent;
    }
    return y;
};

let getClientX = (elem) => {
    return getX(elem) - window.scrollX;
};

let getClientY = (elem) => {
    return getY(elem) - window.scrollY;
};

let removeChilds = (node) => {
    while (node && node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

let once = (node, type, handler, useCapture) => {
    let fun = function(e) {
        let ret = handler.apply(this, [e]);
        node.removeEventListener(type, fun, useCapture);
        return ret;
    };

    node.addEventListener(type, fun, useCapture);
};

let getAttributeMap = (attributes = []) => {
    let map = {};
    for (let i = 0; i < attributes.length; i++) {
        let {
            name, value
        } = attributes[i];
        map[name] = value;
    }
    return map;
};

let getClasses = (clz = '') => {
    let ret = [];
    let items = clz.split(' ');
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item = item.trim();
        if (item) {
            ret.push(item);
        }
    }
    return ret;
};

module.exports = {
    getX,
    getY,
    getClientX,
    getClientY,
    removeChilds,
    once,
    shadowFrame,
    getAttributeMap,
    startMomenter,
    getClasses
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = () => {
    let div = document.createElement('div');
    let sr = div.createShadowRoot();
    sr.innerHTML = '<div id="shadow-page"></div>';

    let frame = null;

    let create = () => {
        let html = document.getElementsByTagName('html')[0];
        html.appendChild(div);

        return sr.getElementById('shadow-page');
    };

    let start = () => {
        if (frame) {
            return frame;
        }
        frame = new Promise(resolve => {
            if (document.body) {
                resolve(create());
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    resolve(create());
                });
            }
        });
        return frame;
    };

    let close = () => {
        frame.then(() => {
            let parent = div.parentNode;
            parent && parent.removeChild(div);
        });
    };

    return {
        start,
        close,
        sr,
        rootDiv: div
    };
};

module.exports = shadowFrame;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let isDomReady = (doc) => doc.readyState === 'complete' ||
    (!doc.attachEvent && doc.readyState === 'interactive');

let startMomenter = (doc = document) => {
    let loadedFlag = false;

    let resolves = [];

    let docReady = () => {
        let ready = () => {
            if (loadedFlag) return;
            loadedFlag = true;
            for (let i = 0; i < resolves.length; i++) {
                resolves[i]();
            }
            resolves = [];
        };
        if (doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', ready);
            doc.addEventListener('DOMContentLoaded', ready);
        } else {
            doc.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    ready();
                }
            });
        }
    };

    docReady();

    // generalWaitTime is used for async rendering
    return ({
        generalWaitTime = 0, startTimeout = 10000
    } = {}) => new Promise((resolve, reject) => {
        if (loadedFlag || isDomReady(doc)) { // already ready
            setTimeout(resolve, generalWaitTime);
        } else { // wait for ready
            resolves.push(resolve);
            setTimeout(() => {
                reject(new Error('timeout'));
            }, startTimeout);
        }
    });
};

module.exports = startMomenter;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isNode
} = __webpack_require__(1);

const svgNS = 'http://www.w3.org/2000/svg';

let applyNode = (node, attributes, childs) => {
    for (let name in attributes) {
        let attr = attributes[name];
        node.setAttribute(name, attr);
    }

    for (let i = 0; i < childs.length; i++) {
        let child = childs[i];
        if (isNode(child)) {
            node.appendChild(child);
        } else {
            node.textContent = child + '';
        }
    }
};

let createElement = (tagName, attributes, childs) => {
    let node = document.createElement(tagName);
    applyNode(node, attributes, childs);
    return node;
};

let createSvgElement = (tagName, attributes, childs) => {
    let node = document.createElementNS(svgNS, tagName);
    applyNode(node, attributes, childs);
    return node;
};

module.exports = {
    createElement,
    createSvgElement
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    contain
} = __webpack_require__(3);

module.exports = () => {
    let docs = [];
    let eventTypeMap = {};
    let handlerMap = {};

    let listenEventType = (type) => {
        if (!eventTypeMap[type]) {
            updateDocs(type);
        }
        eventTypeMap[type] = true;
    };

    /**
     * attach document used to accept events
     */
    let attachDocument = (doc = document) => {
        if (!contain(docs, doc)) {
            for (let type in eventTypeMap) {
                // prevent multiple version of kabanery to binding multiple times
                let id = getGlobalEventTypeId(type);
                if (!doc[id]) {
                    addEventListenerToDoc(doc, type);
                    doc[id] = true;
                }
            }
            docs.push(doc);
        }
    };

    let updateDocs = (type) => {
        if (!docs.length) {
            docs.push(document);
        }
        for (let i = 0; i < docs.length; i++) {
            let doc = docs[i];
            addEventListenerToDoc(doc, type);
        }
    };

    let addEventListenerToDoc = (doc, type) => {
        let handler = null;
        if (handlerMap[type]) {
            handler = handlerMap[type];
        } else {
            handler = listener(type);
            handlerMap[type] = handler;
        }
        doc.addEventListener(type, handler);
    };

    /**
     * e = {
     *  target,
     *  stopPropagation [optional]
     * }
     */
    let listener = (type) => function(e) {
        let ctx = this;
        let target = e.target;

        // hack the stopPropagration function
        let oldProp = e.stopPropagation;
        e.stopPropagation = function(...args) {
            e.__stopPropagation = true;
            return oldProp && oldProp.apply(this, args);
        };

        let nodePath = getNodePath(target);

        for (let i = 0; i < nodePath.length; i++) {
            let node = nodePath[i];
            applyNodeHandlers(e, type, node, ctx);
        }
    };

    let applyNodeHandlers = (e, type, node, ctx) => {
        if (e.__stopPropagation) { // event already been stoped by child node
            return true;
        }

        let handler = getHandler(type, node);
        return handler && handler.apply(ctx, [e]);
    };

    let getHandler = (type, target) => {
        let eventMap = target && target.__eventMap;
        return eventMap && eventMap[type];
    };

    let dispatchEvent = (type, e) => {
        let handler = handlerMap[type];
        handler && handler(e);
    };

    return {
        listenEventType,
        attachDocument,
        dispatchEvent
    };
};

/**
 * get the path of node
 */
let getNodePath = (target) => {
    let paths = [];
    while (target) {
        paths.push(target);
        target = target.parentNode;
    }
    return paths;
};

let getGlobalEventTypeId = (type) => `__event_type_id_${type}`;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(8);

let {
    isArray, isFunction, isObject
} = __webpack_require__(1);

let {
    map
} = __webpack_require__(3);

module.exports = (...args) => {
    let tagName = args[0],
        attrs = {},
        childs = [];
    if (isArray(args[1])) {
        childs = args[1];
    } else if (isFunction(args[1])) {
        childs = [args[1]];
    } else {
        if (isObject(args[1])) {
            attrs = args[1];
            if (isArray(args[2])) {
                childs = args[2];
            } else if (isFunction(args[2])) {
                childs = [args[2]];
            }
        }
    }

    return (...params) => {
        let renderList = (list) => {
            return map(list, (viewer) => {
                if (isArray(viewer)) {
                    return renderList(viewer);
                } else if (isFunction(viewer)) {
                    return viewer(...params);
                } else {
                    return viewer;
                }
            });
        };

        return n(tagName, attrs, renderList(childs));
    };
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let lumineView = __webpack_require__(0);
let {
    styles
} = __webpack_require__(2);

let Button = __webpack_require__(15);
let {
    Signal,
    onSignalType
} = __webpack_require__(6);
let n = __webpack_require__(5);

module.exports = lumineView(({
    props
}, {
    notify
}) => {
    let onLogoSignal = (sourceType, index) => {
        if (index !== undefined) {
            notify(Signal('click', {
                sourceType,
                index
            }));
        }
    };

    let logoRight = (logoRightNode, index) => {
        return n(Button, {
            theme: props.theme,
            style: props.style.logoRight,
            onsignal: onSignalType('click', () => onLogoSignal('rightLogo', index))
        }, [logoRightNode]);
    };

    let logoLeft = (logoLeftNode, index) => {
        return n(Button, {
            theme: props.theme,
            style: props.style.logoLeft,
            onsignal: onSignalType('click', () => onLogoSignal('leftLogos', index))
        }, [logoLeftNode]);
    };

    return n('div', {
        style: props.style.container
    }, [
        props.leftLogos.map(logoLeft),

        props.rightLogos.reduce((prev, logo, index) => {
            prev.unshift(logoRight(logo, index));
            return prev;
        }, []),

        n('div', {
            style: props.style.title
        }, props.title),

        n('div style="clear:both"')
    ]);
}, {
    defaultProps: {
        title: '',
        leftLogos: [],
        rightLogos: [],
        signal: {
            type: 0,
            sourceType: null,
            index: null
        },

        style: (theme) => {
            return {
                title: {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: theme.basics.titleSize,
                    lineHeight: 40
                },
                container: styles(theme.oneLineBulk, theme.actions.cling, {
                    height: 40,
                    width: '100%',
                    overflow: 'hidden'
                }),
                logoLeft: {
                    'float': 'left',
                    height: 40,
                    cursor: 'pointer'
                },
                logoRight: {
                    'float': 'right',
                    height: 40,
                    cursor: 'pointer'
                }
            };
        }
    }
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isMapObject
} = __webpack_require__(2);

let {
    mount,
    n,
    parseStyle
} = __webpack_require__(4);

const VIEW_CLASS_PREFIX = 'kabanery-lumine';

let count = -1;

module.exports = (classTable) => {
    count++;

    let viewClassId = `${VIEW_CLASS_PREFIX}-${count}`;

    let getStyleRuleName = (name) => {
        if (name[0] === '@') {
            let prev = name.split(' ')[0];
            let next = name.substring(prev.length).trim();
            return `${prev} ${viewClassId}-${next}`;
        } else {
            return `.${viewClassId}-${name}`;
        }
    };

    let appendStyle = () => {
        if (styleCssRules) {
            mount(n('style', {
                id: viewClassId
            }, styleCssRules), document.head);
            styleCssRules = null;
        }
    };

    let getClassName = (name) => {
        if (name[0] === '@') {
            let prev = name.split(' ')[0];
            let next = name.substring(prev.length).trim();
            name = next;
        }

        return `${viewClassId}-${name.split(':')[0]}`;
    };

    let updateClassTable = (newClassTable) => {
        let node = document.getElementById(viewClassId);
        if (node) {
            node.parentNode.removeChild(node);
        }

        setStyleCssRules(newClassTable);
        appendStyle();
    };

    let styleCssRules = null;

    let setStyleCssRules = (classTable) => {
        if (isMapObject(classTable)) {
            styleCssRules = '';
            for (let name in classTable) {
                name = name.trim();
                let styleRuleName = getStyleRuleName(name);
                let classCnt = classTable[name];
                if (typeof classCnt === 'function') {
                    classCnt = classCnt({
                        getClassName
                    });
                }
                let styleRuleContent = parseStyle(classCnt, {
                    valueWrapper: (value) => `${value} !important`
                });
                styleCssRules += `\n${styleRuleName} {${styleRuleContent}}`;
            }
        }
    };

    setStyleCssRules(classTable);

    return {
        appendStyle,
        getClassName,
        updateClassTable
    };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(4);

let lumineView = __webpack_require__(0);

let {
    Signal
} = __webpack_require__(6);

let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props
}, {
    notify,
    getClassName
}) => {
    let attributes = {
        'class': `${getClassName('input')}`,
        style: props.style,
        type: props.type,
        placeholder: props.placeholder,
        oninput: (e) => {
            props.value = e.target.value;
            notify(Signal('input'));
        },
        value: props.value
    };
    if (props.id) {
        attributes.id = props.id;
    }
    return n('input', attributes);
}, {
    defaultProps: {
        value: '',
        type: 'value',
        placeholder: '',
        style: (theme) => styles(theme.inputBox, theme.underLineBorder)
    },

    classTable: (theme) => {
        return {
            'input:focus': styles(theme.actions.focus, theme.underLineFocus)
        };
    }
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(4);

let lumineView = __webpack_require__(0);

let {
    Signal
} = __webpack_require__(6);

let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props
}, {
    notify,
    getClassName
}) => {
    return n('textarea', {
        'class': `${getClassName('valuearea')}`,
        style: props.style,
        type: props.type,
        placeholder: props.placeholder,
        oninput: (e) => {
            props.value = e.target.value;
            notify(Signal('input'));
        }
    }, [props.value]);
}, {
    defaultProps: {
        value: '',
        type: 'value',
        placeholder: '',
        style: (theme) => styles(theme.textAreaBox)
    },

    classTable: (theme) => {
        return {
            'valuearea:focus': styles(theme.actions.focus)
        };
    }
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let lumineView = __webpack_require__(0);

let n = __webpack_require__(5);

let Full = __webpack_require__(16);

let {
    styles
} = __webpack_require__(2);

const {
    MODE_PERCENTAGE,
    MODE_PILE
} = __webpack_require__(17);

/**
 *
 * layout mode
 *
 *  percentage
 *  left pile
 *  right pile
 *
 *  flex
 */

module.exports = lumineView(({
    props,
    children
}) => {
    let {
        theme,
        style,
        mode,
        pers
    } = props;
    // TODO validate
    if (mode === MODE_PILE) {
        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentHeight, {
            'float': 'left'
        }, style.childs[index] || {}));
    } else if (mode === MODE_PERCENTAGE) {
        let sum = children.reduce((prev, _, index) => {
            let cur = pers[index];
            cur = cur === undefined ? 1 : cur;
            return prev + cur;
        }, 0);

        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentHeight, {
            'float': 'left',
            width: sum === 0 ? 0 : ((pers[index] === undefined ? 1 : pers[index]) / sum) * 100 + '%'
        }, style.childs[index] || {}));
    }

    return n(Full, {
        style: style.container,
        theme
    }, [
        children.map((child, index) => n('div', {
            style: style.childs[index]
        }, child)),

        (mode === MODE_PERCENTAGE || mode === MODE_PILE) && n('div style="clear:both"')
    ]);
}, {
    defaultProps: {
        mode: MODE_PILE,
        pers: [],
        style: {
            container: {},
            childs: []
        }
    }
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let lumineView = __webpack_require__(0);

let n = __webpack_require__(5);

let Full = __webpack_require__(16);

let {
    styles
} = __webpack_require__(2);

const {
    MODE_PILE,
    MODE_PERCENTAGE
} = __webpack_require__(17);

/**
 * top + bottom
 */

module.exports = lumineView(({
    props,
    children
}) => {
    let {
        theme,
        style,
        mode,
        pers
    } = props;

    // TODO validate

    if (mode === MODE_PERCENTAGE) {
        let sum = children.reduce((prev, _, index) => {
            let cur = pers[index];
            cur = cur === undefined ? 1 : cur;
            return prev + cur;
        }, 0);

        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentWidth, {
            height: sum === 0 ? 0 : ((pers[index] === undefined ? 1 : pers[index]) / sum) * 100 + '%'
        }, style.childs[index] || {}));
    } else if (mode === MODE_PILE) {
        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentWidth, style.childs[index] || {}));
    }

    return n(Full, {
        style: style.container,
        theme
    }, [
        children.map((child, i) => n('div', {
            style: style.childs[i]
        }, [child]))
    ]);
}, {
    defaultProps: {
        mode: MODE_PILE,
        pers: [],
        style: {
            container: {},
            childs: {}
        }
    }
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(5);
let lumineView = __webpack_require__(0);
let {
    Signal
} = __webpack_require__(6);

let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props
}, {
    updateWithNotify
}) => {
    if (props.show && props.duration !== 'forever') {
        setTimeout(() => {
            updateWithNotify(Signal('notice-hide'), 'props.show', false);
        }, props.duration);
    }
    return n('div', {
        style: {
            zIndex: 10000,
            position: 'fixed',
            width: '100%',
            height: 0,
            left: 0,
            top: '50%',
            textAlign: 'center'
        }
    }, [
        props.show && n('div', {
            style: props.style
        }, props.text)
    ]);
}, {
    defaultProps: {
        text: '',
        show: true,
        duration: 3000,
        style: (theme) => styles(theme.oneLineBulk, {
            display: 'inline-block',
            backgroundColor: theme.basics.noticeColor,
            maxWidth: 400,
            maxHeight: 200,
            top: -100,
            position: 'relative',
        })
    }
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(4);
let lumineView = __webpack_require__(0);
let {
    styles
} = __webpack_require__(2);

module.exports = lumineView(({
    props,
    children
}) => {
    return n('div', {
        style: props.style
    }, children);
}, {
    defaultProps: {
        style: (theme) => styles(theme.fullWindow)
    },

    defaultChildren: []
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(5);
let lumineView = __webpack_require__(0);

let TextLoading = __webpack_require__(18);
let PageMask = __webpack_require__(19);
let Empty = __webpack_require__(46);

module.exports = lumineView(({
    props,
    children
}) => {
    return props.show ? n(PageMask, {
        style: props.style
    }, children) : Empty();
}, {
    defaultProps: {
        show: true,
        style: {
            textAlign: 'center'
        }
    },
    defaultChildren: [n(TextLoading, {
        style: {
            position: 'relative',
            top: '50%',
            marginTop: -10
        }
    })]
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(5);
let lumineView = __webpack_require__(0);

module.exports = lumineView(() => {
    return n('div', {
        style: {
            width: 0,
            height: 0
        }
    });
});


/***/ })
/******/ ]);