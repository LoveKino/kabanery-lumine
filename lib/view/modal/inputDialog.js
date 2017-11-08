'use strict';

const lumineView = require('../../util/lumineView');
const n = require('../../util/n');
const Modal = require('./modal');
const Input = require('../input/input');
const FlatButton = require('../button/flatButton');
const {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    props
}, ctx) => {
    return ctx.bn({
        'show': 'show',
        'autoHide': 'autoHide',
        'style.modalStyle': 'style'
    })(Modal, {
        theme: props.theme
    }, [
        props.title && n('h4', {
            style: props.style.titleStyle
        }, props.title),

        ctx.bn({
            'text': 'value'
        })(Input, {
            placeholder: props.placeholder,
            theme: props.theme
        }),

        n('br'),

        n(FlatButton, {
            style: props.style.cancelBtnStyle,
            onsignal: ctx.pass('click', 'cancel-dialog'),
        }, [props.cancelBtnText]),

        n(FlatButton, {
            style: props.style.okBtnStyle,
            onsignal: ctx.pass('click', 'ok-dialog')
        }, [props.okBtnText])
    ]);
}, {
    defaultProps: {
        show: true,
        autoHide: false,
        title: '',
        text: '',
        cancelBtnText: 'cancel',
        okBtnText: 'ok',
        style: (theme) => {
            return {
                modalStyle: {},
                titleStyle: styles(theme.container, {
                    padding: theme.basics.narrowPadding
                }),
                cancelBtnStyle: {
                    width: 100,
                    margin: theme.basics.narrowMargin
                },
                okBtnStyle: {
                    width: 100,
                    margin: theme.basics.narrowMargin
                }
            };
        }
    }
});
