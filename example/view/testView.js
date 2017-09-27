'use strict';

let n = require('../../lib/util/n');
let lumineView = require('../../lib/util/lumineView');

let TextArea = require('../../lib/view/input/textarea');
let Fold = require('../../lib/view/fold/fold');
let Hn = require('../../lib/view/layout/hn');
let Vn = require('../../lib/view/layout/vn');
let {
    renderExample
} = require('../demoData');

let {
    onSignalType
} = require('../../lib/util/signal');

let {
    syncBindWithKeyMap
} = require('../../lib/view/compose/mapUI');

module.exports = lumineView(({
    props
}, ctx) => {
    return n(Vn, [
        n('h3 style="font-weight:bold;"', props.example.name),

        n(Hn, {
            mode: 'percentage',
            pers: [3, 5]
        }, [
            n(Fold, {
                hide: false
            }, [
                n('div style="display:inline-block"', 'code'),

                n(TextArea, syncBindWithKeyMap(ctx, {
                    'example.render': 'value'
                }, {
                    bindedProps: {
                        style: {
                            fontSize: 14,
                            width: "95%"
                        }
                    },

                    autoUpdate: true
                }))
            ]),

            n(Fold, {
                hide: false
            }, [
                n('div style="display:inline-block"', 'UI'),
                renderExample(props.example.render)
            ])
        ])
    ]);
});
