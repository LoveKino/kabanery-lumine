'use strict';

let {
    mount
} = require('kabanery');

let n = require('../lib/util/n');
let steadyTheme = require('../lib/theme/steady');

let {
    examples
} = require('./demoData');

let FunctionBar = require('../lib/view/header/functionBar');
let TestView = require('./view/testView');
let TOCView = require('../lib/view/toc/toc');
let Hn = require('../lib/view/layout/hn');
let Vn = require('../lib/view/layout/vn');

let getToc = () => {
    return examples.map(({
        name
    }) => {
        return {
            name
        };
    });
};

let Pager = n('div', {
    style: {
        width: '100%',
        height: '100%',
        backgroundColor: steadyTheme.basics.pageColor
    }
}, [
    n(Vn, [
        n(FunctionBar, {
            title: 'Demos of kabanery-lumine views',
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
        }),
        n(Hn, {
            mode: 'partion',
            leftPartions: [200]
        }, [
            n(TOCView, {
                toc: getToc()
            }),

            n(Vn, [
                examples.map((example) => n('div', {
                    id: example.name,
                    style: {
                        margin: 8,
                        padding: 8,
                        borderRadius: 8,
                        border: '1px solid rgba(100,100,100,0.5)',
                        boxShadow: '3px 3px 5px rgba(100, 100, 100, 0.5)'
                    }
                }, [
                    n(TestView, {
                        example
                    })
                ]))
            ])
        ])
    ])

]);

mount(Pager, document.body);
