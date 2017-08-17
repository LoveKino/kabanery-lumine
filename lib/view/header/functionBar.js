'use strict';

let {
    n
} = require('kabanery');
let lumineView = require('../../util/lumineView');

module.exports = lumineView(({
    state,
    style = {}
}) => {
    let logoRight = (logoRightNode) => {
        return n('button', {
            style: style.logoRight
        }, [logoRightNode]);
    };

    let logoLeft = (logoLeftNode) => {
        return n('button', {
            style: style.logoLeft
        }, [logoLeftNode]);
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

        n('div', {
            style: style.title
        }, state.title),

        state.rightLogos.reduce((prev, logo) => {
            prev.unshift(logoRight(logo));
            return prev;
        }, [])
    ]);
}, {
    defaultState: {
        title: '',
        leftLogos: [],
        rightLogos: []
    },
    defaultStyle: {
        title: {
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            lineHeight: 40
        },
        container: {
            height: 40,
            boxSizing: 'border-box',
            backgroundColor: '#3b3a36',
            margin: 0,
            width: '100%',
            overflow: 'hidden'
        },
        logoLeft: {
            fontSize: 16,
            padding: 0,
            'float': 'left',
            color: 'white',
            cursor: 'pointer'
        },
        logoRight: {
            fontSize: 16,
            padding: 0,
            'float': 'right',
            color: 'white',
            cursor: 'pointer'
        }
    }
});
