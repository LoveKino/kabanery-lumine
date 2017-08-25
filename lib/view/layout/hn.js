'use strict';

let lumineView = require('../../util/lumineView');

let n = require('../../util/n');

let Full = require('./full');

let {
    styles
} = require('../../util/helper');

const {
    MODE_PERCENTAGE,
    MODE_PILE
} = require('./const');

/**
 *
 * layout mode
 *
 *  percentage
 *  left pile
 *  right pile
 *
 *  flex
 */

module.exports = lumineView(({
    props,
    children
}) => {
    let {
        theme,
        style,
        mode,
        pers
    } = props;
    // TODO validate
    if (mode === MODE_PILE) {
        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentHeight, {
            'float': 'left'
        }, style.childs[index] || {}));
    } else if (mode === MODE_PERCENTAGE) {
        let sum = children.reduce((prev, _, index) => {
            let cur = pers[index];
            cur = cur === undefined ? 1 : cur;
            return prev + cur;
        }, 0);

        style.childs = children.map((_, index) => styles(theme.container, theme.fullParentHeight, {
            'float': 'left',
            width: sum === 0 ? 0 : ((pers[index] === undefined ? 1 : pers[index]) / sum) * 100 + '%'
        }, style.childs[index] || {}));
    }

    return n(Full, {
        style: style.container,
        theme
    }, [
        children.map((child, index) => n('div', {
            style: style.childs[index]
        }, child)),

        (mode === MODE_PERCENTAGE || mode === MODE_PILE) && n('div style="clear:both"')
    ]);
}, {
    defaultProps: {
        mode: MODE_PILE,
        pers: [],
        style: {
            container: {},
            childs: []
        }
    }
});
