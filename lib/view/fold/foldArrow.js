'use strict';

let {
    n
} = require('kabanery');

let angle = require('../cssShapes/angle');
let lumineView = require('../../util/lumineView');

module.exports = lumineView(({
    props
}) => {
    return n('span', {
        style: {
            display: 'inline-block',
            padding: '0 8 0 8'
        }
    }, [angle({
        direction: props.hide ? 'bottom' : 'top',
        length: 5,
        color: '#666666'
    })]);
}, {
    defaultProps: {
        hide: false
    }
});
