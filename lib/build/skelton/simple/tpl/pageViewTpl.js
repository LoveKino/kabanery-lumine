module.exports = () => `'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const lumineView = require('kabanery-lumine/lib/util/lumineView');
const n = require('kabanery-lumine/lib/util/n');
/*
const {
    syncBindWithKeyMap
} = require('kabanery-lumine/lib/view/compose/mapUI');
const {
    deliver,
    onSignalType
} = require('kabanery-lumine/lib/util/signal');
const {
   // SIGNAL CONSTANTS
} = require('../signals');
*/

// common views
// const Hn = require('kabanery-lumine/lib/view/layout/hn');
// const Vn = require('kabanery-lumine/lib/view/layout/vn');

/**
 * // some common signals
 * const {KABANERY_DO_RENDER} = require('kabanery-lumine/lib/flow/baseSignalActions');
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
