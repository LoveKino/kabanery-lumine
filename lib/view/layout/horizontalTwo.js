'use strict';

let lumineView = require('../../util/lumineView');

let {
    n
} = require('kabanery');

let Full = require('./full');

let {
    styles
} = require('../../util/helper');

const {
    MODE_PERCENTAGE,
    MODE_PILE
} = require('./const');

/**
 * left + right
 */

module.exports = lumineView(({
    state,
    theme,
    style
}) => {
    if (state.mode === MODE_PILE) {
        style.leftContainer = styles(style.leftContainer, {
            'float': 'left'
        });
    } else if (state.mode === MODE_PERCENTAGE) {
        // TODO validate state.left
        style.leftContainer = styles(style.leftContainer, {
            width: state.leftWidthPer * 100 + '%',
            'float': 'left'
        });

        style.rightContainer = styles(style.rightContainer, {
            width: (1 - state.leftWidthPer) * 100 + '%',
            'float': 'right'
        });
    }

    return Full({
        state: {
            content: [
                // left
                n('div', {
                    style: style.leftContainer
                }, [state.left]),

                // right
                n('div', {
                    style: style.rightContainer
                }, [state.right]),

                (state.mode === MODE_PERCENTAGE || state.mode === MODE_PILE) && n('div style="clear:both"')
            ]
        },
        style: style.container,
        theme
    });
}, {
    defaultState: {
        mode: MODE_PILE,
        leftWidthPer: 0.5
    },

    defaultStyle: (theme) => {
        return {
            container: {},

            leftContainer: styles(theme.container, theme.fullParentHeight),

            rightContainer: styles(theme.container, theme.fullParentHeight)
        };
    }
});
