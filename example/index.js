'use strict';

let {
    mount,
    n
} = require('kabanery');

let FunctionBar = require('../lib/view/header/functionBar');
let Button = require('../lib/view/button/button');
let Input = require('../lib/view/input/input');
let HorizontalTwo = require('../lib/view/layout/horizontalTwo');

let log = console.log; // eslint-disable-line

let logSignal = (signal, data) => {
    log(JSON.stringify(signal));
    log(JSON.stringify(data));
};

mount([

    FunctionBar({
        state: {
            title: 'demo',
            leftLogos: [
                n('div', '<'), 'a', 'b'
            ],
            rightLogos: ['c', 'd']
        },

        onsignal: logSignal
    }),

    n('br'),

    Button({
        state: {
            text: 'demo'
        },

        onsignal: logSignal
    }),

    n('br'),

    Input({
        state: {
            text: 'abc'
        },
        onsignal: logSignal
    }),

    n('div', {
        style: {
            width: 200,
            height: 200
        }
    }, [
        HorizontalTwo({
            state: {
                left: n('span', 'this is left child'),
                right: n('span', 'this is right child'),
                leftWidthPer: 0.4
            },
            style: {
                container: {
                    backgroundColor: 'grey'
                },
                leftContainer: {
                    backgroundColor: 'blue'
                },
                rightContainer: {
                    backgroundColor: 'red'
                }
            }
        })
    ])
], document.body);
