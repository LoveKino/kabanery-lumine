'use strict';

const lumineView = require('../../util/lumineView');

const n = require('../../util/n');

const Full = require('./full');

const {
    MODE_PERCENTAGE,
    MODE_PILE,
    MODE_PARTION
} = require('./const');

let {
    getChildStylesInPercentage,
    getChildStylesInPile,
    getChildStylesInPartion
} = require('./util');

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
        pers,
        leftPartions,
        rightPartions
    } = props;
    // TODO validate
    if (mode === MODE_PILE) {
        style.childs = getChildStylesInPile(children, theme, style.childs, 'width');
    } else if (mode === MODE_PERCENTAGE) {
        style.childs = getChildStylesInPercentage(children, pers, style.childs,
            theme, 'width');
    } else if (mode === MODE_PARTION) {
        style.childs = getChildStylesInPartion(leftPartions, rightPartions,
            style.childs, theme, 'width');
    }

    return n(Full, {
        style: style.container,
        theme
    }, [
        children.map((child, index) =>
            n('div', {
                style: style.childs[index]
            }, child)),

        (mode === MODE_PERCENTAGE || mode === MODE_PILE) &&
        n('div style="clear:both"')
    ]);
}, {
    defaultProps: {
        mode: MODE_PILE,
        pers: [], // percentage distribution
        leftPartions: [], // fixed width or height in top direction

        rightPartions: [], // fixed width or height in bottom direction
        style: {
            container: {},
            childs: []
        }
    }
});
