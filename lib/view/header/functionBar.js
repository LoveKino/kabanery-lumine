'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');

let Button = require('../button/button');
let {
    Signal,
    onSignalType
} = require('../../util/signal');

module.exports = lumineView(({
    state,
    style,
    theme
}, {
    notify
}) => {
    let onLogoSignal = (sourceType, index) => {
        if (index !== undefined) {
            notify(Signal('click', {
                sourceType,
                index
            }));
        }
    };

    let logoRight = (logoRightNode, index) => {
        return Button({
            style: style.logoRight,
            state: {
                text: logoRightNode
            },
            theme,
            onsignal: onSignalType('click', () => onLogoSignal('rightLogo', index))
        });
    };

    let logoLeft = (logoLeftNode, index) => {
        return Button({
            style: style.logoLeft,
            state: {
                text: logoLeftNode
            },
            theme,
            onsignal: onSignalType('click', () => onLogoSignal('leftLogos', index))
        });
    };

    return n('div', {
        style: style.container
    }, [
        state.leftLogos.map(logoLeft),

        state.rightLogos.reduce((prev, logo, index) => {
            prev.unshift(logoRight(logo, index));
            return prev;
        }, []),

        n('div', {
            style: style.title
        }, state.title),

        n('div style="clear:both"')
    ]);
}, {
    defaultState: {
        title: '',
        leftLogos: [],
        rightLogos: [],
        signal: {
            type: 0,
            sourceType: null,
            index: null
        }
    },

    defaultStyle: (theme) => {
        return {
            title: {
                textAlign: 'center',
                color: 'white',
                fontSize: theme.basics.titleSize,
                lineHeight: 40
            },
            container: styles(theme.oneLineBulk, theme.actions.cling, {
                height: 40,
                width: '100%',
                overflow: 'hidden'
            }),
            logoLeft: {
                'float': 'left',
                height: 40,
                cursor: 'pointer'
            },
            logoRight: {
                'float': 'right',
                height: 40,
                cursor: 'pointer'
            }
        };
    }
});
