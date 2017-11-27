'use strict';

const n = require('../../util/n');
const lumineView = require('../../util/lumineView');

module.exports = lumineView(() => {
    return n('div', {
        style: {
            width: 0,
            height: 0
        }
    });
});
