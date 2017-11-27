'use strict';

const {
    n
} = require('kabanery');

module.exports = ({
    color = 'black',
    bold = 3,
    length = 20,
    direction = 'vertical',
    angle = 0
} = {}) => {
    return direction === 'vertical' ?
        n('div', {
            style: {
                width: bold,
                height: length,
                backgroundColor: color,
                transform: `rotate(${angle}deg)`
            }
        }) : n('div', {
            style: {
                height: bold,
                width: length,
                backgroundColor: color,
                transform: `rotate(${angle}deg)`
            }
        });
};
