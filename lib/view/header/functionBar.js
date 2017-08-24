'use strict';

let lumineView = require('../../util/lumineView');
let {
    styles
} = require('../../util/helper');

let Button = require('../button/button');
let {
    Signal,
    onSignalType
} = require('../../util/signal');
let n = require('../../util/n');

module.exports = lumineView(({
    props
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
        return n(Button, {
            theme: props.theme,
            style: props.style.logoRight,
            onsignal: onSignalType('click', () => onLogoSignal('rightLogo', index))
        }, [logoRightNode]);
    };

    let logoLeft = (logoLeftNode, index) => {
        return n(Button, {
            theme: props.theme,
            style: props.style.logoLeft,
            onsignal: onSignalType('click', () => onLogoSignal('leftLogos', index))
        }, [logoLeftNode]);
    };

    return n('div', {
        style: props.style.container
    }, [
        props.leftLogos.map(logoLeft),

        props.rightLogos.reduce((prev, logo, index) => {
            prev.unshift(logoRight(logo, index));
            return prev;
        }, []),

        n('div', {
            style: props.style.title
        }, props.title),

        n('div style="clear:both"')
    ]);
}, {
    defaultProps: {
        title: '',
        leftLogos: [],
        rightLogos: [],
        signal: {
            type: 0,
            sourceType: null,
            index: null
        },

        style: (theme) => {
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
    }
});
