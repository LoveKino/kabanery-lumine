'use strict';

/**
 * @param direction string
 *  direction = up | down | left | right
 */
module.exports = ({
    left = 0,
    right = 0,
    top = 0,
    bottom = 0,
    color = 'black',
    direction = 'up'
}) => {
    if (direction === 'up') {
        return {
            width: 0,
            height: 0,
            'border-left': `${left}px solid transparent`,
            'border-right': `${right}px solid transparent`,
            'border-bottom': `${bottom}px solid ${color}`
        };
    } else if (direction === 'down') {
        return {
            width: 0,
            height: 0,
            'border-left': `${left}px solid transparent`,
            'border-right': `${right}px solid transparent`,
            'border-top': `${top}px solid ${color}`
        };
    } else if (direction === 'left') {
        return {
            width: 0,
            height: 0,
            'border-top': `${top}px solid transparent`,
            'border-bottom': `${bottom}px solid transparent`,
            'border-right': `${right}px solid ${color}`
        };
    } else if (direction === 'right') {
        return {
            width: 0,
            height: 0,
            'border-top': `${top}px solid transparent`,
            'border-bottom': `${bottom}px solid transparent`,
            'border-left': `${left}px solid ${color}`
        };
    } else {
        throw new Error(`unexpeced direction ${direction}`);
    }
};
