'use strict';

let n = require('../../util/n');

let lumineView = require('../../util/lumineView');

let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    props
}, {
    update,
    notify
}) => {
    if (props.show && props.duration !== 'forever') {
        setTimeout(() => {
            update('props.show', false);
            notify('noticeHide');
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
