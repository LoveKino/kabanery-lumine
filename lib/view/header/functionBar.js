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
let Block = require('../block/block');

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
            onsignal: onSignalType('click', () => onLogoSignal('rightLogos', index))
        }, [logoRightNode]);
    };

    let logoLeft = (logoLeftNode, index) => {
        return n(Button, {
            theme: props.theme,
            style: props.style.logoLeft,
            onsignal: onSignalType('click', () => onLogoSignal('leftLogos', index))
        }, [logoLeftNode]);
    };

    return n(Block, {
        style: props.style.container
    }, [
        n('div', {
            style: props.style.title
        }, props.title),

        props.leftLogos.map(logoLeft),

        props.rightLogos.reduce((prev, logo, index) => {
            prev.unshift(logoRight(logo, index));
            return prev;
        }, []),

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
                    lineHeight: 40,
                    position: 'absolute',
                    width: '100%'
                },
                container: styles(theme.oneLineBulk, theme.actions.cling, {
                    margin: 0,
                    padding: 0,
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
