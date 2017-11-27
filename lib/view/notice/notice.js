'use strict';

let n = require('../../util/n');
let lumineView = require('../../util/lumineView');
let {
    Signal
} = require('lumine-signal');

let {
    styles
} = require('../../util/helper');

let {
    compileTreeScript
} = require('../../util/treeScript');

let S_HideNotice = compileTreeScript('.props.show=false');

module.exports = lumineView(({
    props
}, {
    updateTree
}) => {
    if (props.show && props.duration !== 'forever') {
        setTimeout(() => {
            updateTree(S_HideNotice, null, Signal('notice-hide'));
        }, props.duration);
    }

    return n('div', {
        style: {
            zIndex: 10000,
            position: 'fixed',
            width: '100%',
            height: 0,
            left: 0,
            top: '50%',
            textAlign: 'center'
        }
    }, [
        props.show && n('div', {
            style: props.style
        }, props.text)
    ]);
}, {
    defaultProps: {
        text: '',
        show: true,
        duration: 3000,
        style: (theme) => styles(theme.oneLineBulk, {
            display: 'inline-block',
            backgroundColor: theme.basics.noticeColor,
            maxWidth: 400,
            maxHeight: 200,
            top: -100,
            position: 'relative',
        })
    }
});
