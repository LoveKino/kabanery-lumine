module.exports = () => `'use strict';

let SimplePager = require('kabanery-lumine/lib/page/simplePager');
let lumineView = require('kabanery-lumine/lib/util/lumineView');
let n = require('kabanery-lumine/lib/util/n');
let {
    syncBindWithKeyMap
} = require('kabanery-lumine/lib/view/compose/mapUI');
let {
    deliver,
    onSignalType
} = require('kabanery-lumine/lib/util/signal');
let {
   // SIGNAL CONSTANTS
} = require('../signals');

// common views
// let Hn = require('kabanery-lumine/lib/view/layout/hn');
// let Vn = require('kabanery-lumine/lib/view/layout/vn');

/**
 * // some common signals
 * let {KABANERY_DO_RENDER} = require('kabanery-lumine/lib/flow/baseSignalActions');
 */

/**
 *  SimplePager encapsulate notice and loading view.
 *  
 *      .notice.text
 *      .notice.show
 *      .loading.show
 */

/**
 * syncBindWithKeyMap:
 *     sync child props with parent props
 *     demo: n(Input, syncBindWithKeyMap(ctx, {[parent props]: 'value'}, {bindedProps: {}}))
 */

/**
 * deliver signal 
 *     demo: n(Button, {onsignal: onSignalType('click', deliver(ctx, SIGNAL_TYPE))}, 'save')
 */

module.exports = SimplePager(lumineView(({}, ctx) => {
   //
   return n('div', 'hello lumine page!');
}, {
    defaultProps: {
    }
}));`;
