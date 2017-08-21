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
    MODE_PILE,
    MODE_PERCENTAGE
} = require('./const');

/**
 * top + bottom
 */

module.exports = lumineView(({
    state,
    theme,
    style
}) => {
    if (state.mode === MODE_PERCENTAGE) {
        // TODO validate state.topHeightPer
        style.topContainer = styles(style.topContainer, {
            height: state.topHeightPer * 100 + '%'
        });

        style.bottomContainer = styles(style.bottomContainer, {
            height: (1 - state.topHeightPer) * 100 + '%'
        });
    }

    return Full({
        state: {
            content: [
                // top
                n('div', {
                    style: style.topContainer
                }, [state.top]),

                // bottom
                n('div', {
                    style: style.bottomContainer
                }, [state.bottom])
            ]
        },
        style: style.container,
        theme
    });
}, {
    defaultState: {
        mode: MODE_PILE,
        topHeightPer: 0.5
    },

    defaultStyle: (theme) => {
        return {
            container: {},

            topContainer: styles(theme.container, theme.fullParentWidth),

            bottomContainer: styles(theme.container, theme.fullParentWidth)
        };
    }
});
