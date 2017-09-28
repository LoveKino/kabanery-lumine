'use strict';

let n = require('../../../lib/util/n');
let lumineView = require('../../../lib/util/lumineView');

let TextArea = require('../../../lib/view/input/textarea');
let Fold = require('../../../lib/view/fold/fold');
let Hn = require('../../../lib/view/layout/hn');
let Vn = require('../../../lib/view/layout/vn');
let {
    renderExample
} = require('../demoData');

let {
    onSignalType
} = require('../../../lib/util/signal');

let {
    syncBindWithKeyMap
} = require('../../../lib/view/compose/mapUI');

module.exports = lumineView(({
    props
}, ctx) => {
    return n(Vn, [
        n('h3 style="font-weight:bold;"', props.example.name),
        props.example.description && n('div', {
            style: {
                margin: '0 0 18 0'
            }
        }, props.example.description),

        n(Hn, {
            mode: 'percentage',
            pers: [3, 5]
        }, [
            n(Fold, {
                hide: false
            }, [
                n('div style="display:inline-block"', 'code'),

                n(TextArea, syncBindWithKeyMap(ctx, {
                    'example.code': 'value'
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

            renderExample(props.example.code)
        ])
    ]);
});
