'use strict';

let {
    n
} = require('kabanery');

let line = require('./line');

module.exports = ({
    width,
    height,
    color,
    bold
}) => {
    return n('div', {
        style: {
            width,
            height,
            margin: 0,
            padding: 0
        }
    }, [
        n('div', {
            style: {
                position: 'relative',
                left: 0,
                top: (height - bold) / 2
            }
        }, [
            line({
                length: width,
                bold,
                color,
                direction: 'horizontal'
            })
        ]),

        n('div', {
            style: {
                position: 'relative',
                top: -1 * bold,
                left: (width - bold) / 2
            }
        }, [
            line({
                length: height,
                bold,
                color
            })
        ])
    ]);
};
