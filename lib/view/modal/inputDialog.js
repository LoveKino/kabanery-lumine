'use strict';

let lumineView = require('../../util/lumineView');
let n = require('../../util/n');
let {
    onSignalType,
    deliver
} = require('../../util/signal');
let Modal = require('./modal');
let Input = require('../input/input');
let FlatButton = require('../button/flatButton');
let {
    syncBindWithKeyMap
} = require('../compose/mapUI');
let {
    styles
} = require('../../util/helper');

module.exports = lumineView(({
    props
}, ctx) => {
    return n(Modal, syncBindWithKeyMap(ctx, {
        'show': 'show',
        'autoHide': 'autoHide',
        'style.modalStyle': 'style'
    }, {
        bindedProps: {
            theme: props.theme
        }
    }), [
        props.title && n('h4', {
            style: props.style.titleStyle
        }, props.title),
        n(Input, syncBindWithKeyMap(ctx, {
            'text': 'value'
        }, {
            bindedProps: {
                placeholder: props.placeholder,
                theme: props.theme
            }
        })),

        n('br'),

        n(FlatButton, {
            style: props.style.cancelBtnStyle,
            onsignal: onSignalType('click', deliver(ctx, 'cancel-dialog')),
        }, [props.cancelBtnText]),

        n(FlatButton, {
            style: props.style.okBtnStyle,
            onsignal: onSignalType('click', deliver(ctx, 'ok-dialog')),
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
