'use strict';

let SimplePager = require('../../../lib/page/simplePager');
let lumineView = require('../../../lib/util/lumineView');
let n = require('../../../lib/util/n');
let {
    syncBindWithKeyMap
} = require('../../../lib/view/compose/mapUI');
let {
    deliver,
    onSignalType
} = require('../../../lib/util/signal');
let {
    // SIGNAL CONSTANTS
} = require('../signals');


// views
let FunctionBar = require('../../../lib/view/header/functionBar');
let Hn = require('../../../lib/view/layout/hn');
let Vn = require('../../../lib/view/layout/vn');

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
    return n(Vn, [
        n(FunctionBar, {
            title: 'kabanery lumine',
            rightLogos: [
                n('a href="https://github.com/LoveKino/kabanery-lumine" target="_blank"', {
                    style: {
                        color: 'white',
                        'text-decoration': 'none',
                        'display': 'block',
                        'height': '100%',
                        'line-height': '30px'
                    }
                }, 'github')
            ]
        })
    ])
}, {
    defaultProps: {}
}));
