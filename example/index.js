'use strict';

let {
    mount, n
} = require('kabanery');

let FunctionBar = require('../lib/view/header/functionBar');
let Button = require('../lib/view/button/button');

let log = console.log; // eslint-disable-line

mount([

    FunctionBar({
        state: {
            title: 'demo',
            leftLogos: ['a', 'b'],
            rightLogos: ['c', 'd']
        }
    }),

    n('br'),

    Button({
        state: {
            text: 'demo'
        },

        onchange: (data) => {
            log(JSON.stringify(data));
        }
    })
], document.body);
