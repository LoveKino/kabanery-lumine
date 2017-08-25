'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');

module.exports = lumineView(() => {
    return n('div', {
        style: {
            width: 0,
            height: 0
        }
    });
});
