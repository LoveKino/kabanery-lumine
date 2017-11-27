'use strict';

const line = require('./line');
const {
    n
} = require('kabanery');

module.exports = ({
    length = 10,
    bold = 1,
    color = 'black',
    angle = 0,
    direction
} = {}) => {
    if (direction === 'left') {
        angle = 45;
    } else if (direction === 'top') {
        angle = 135;
    } else if (direction === 'right') {
        angle = 225;
    } else if (direction === 'bottom') {
        angle = 315;
    }
    return n('div', {
        style: {
            display: 'inline-block',
            transform: `rotate(${angle}deg)`
        }
    }, [
        line({
            color,
            bold,
            length
        }),

        n('div', {
            style: {
                marginLeft: length / 2 - bold / 2,
                marginTop: -1 * length / 2 - bold / 2
            }
        }, [
            line({
                color,
                bold,
                length,
                angle: 90
            })
        ])
    ]);
};
