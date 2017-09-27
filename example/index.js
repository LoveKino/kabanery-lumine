'use strict';

let {
    mount
} = require('kabanery');

let n = require('../lib/util/n');
let steadyTheme = require('../lib/theme/steady');
let lumineView = require('../lib/util/lumineView');

let TextArea = require('../lib/view/input/textarea');
let Fold = require('../lib/view/fold/fold');
let Hn = require('../lib/view/layout/hn');
let Vn = require('../lib/view/layout/vn');

let {
    onSignalType
} = require('../lib/util/signal');

let {
    syncBindWithKeyMap
} = require('../lib/view/compose/mapUI');

let {
    examples,
    renderExample
} = require('./demoData');

let TestView = lumineView(({
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

let Pager = n('div', {
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: steadyTheme.basics.pageColor
        }
    },
    examples.map((example) => n(TestView, {
        example
    })));

mount(Pager, document.body);
