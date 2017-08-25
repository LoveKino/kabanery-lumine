'use strict';

let {
    mount
} = require('kabanery');

let n = require('../lib/util/n');

let FunctionBar = require('../lib/view/header/functionBar');
let Button = require('../lib/view/button/button');
let Input = require('../lib/view/input/input');
let TextArea = require('../lib/view/input/textarea');
let Hn = require('../lib/view/layout/hn');
let Vn = require('../lib/view/layout/vn');
let Notice = require('../lib/view/notice/notice');

let steadyTheme = require('../lib/theme/steady');

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
    }
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
