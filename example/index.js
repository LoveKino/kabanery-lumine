'use strict';

let {
    mount
} = require('kabanery');

let FunctionBar = require('../lib/view/header/functionBar');

mount(FunctionBar({
    state: {
        title: 'demo'
    }
}), document.body);
