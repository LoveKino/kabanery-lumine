'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');

let Button = require('../button/button');

module.exports = lumineView(({
    state,
    style = {},
    theme
}) => {
    let logoRight = (logoRightNode) => {
        return Button({
            style: style.logoRight,
            state: {
                text: logoRightNode
            },
            theme
        });
    };

    let logoLeft = (logoLeftNode) => {
        return Button({
            style: style.logoLeft,
            state: {
                text: logoLeftNode
            },
            theme
        });
    };

    return n('div', {
        style: style.container
    }, [
        state.back ? logoLeft(n('div', {
            href: `single://${state.back}`,
            style: {
                padding: 10
            }
        }, '<')) : null,

        state.leftLogos.map(logoLeft),

        state.rightLogos.reduce((prev, logo) => {
            prev.unshift(logoRight(logo));
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
        rightLogos: []
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
