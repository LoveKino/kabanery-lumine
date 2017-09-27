'use strict';

let {
    styles
} = require('../../util/helper');

let layout = require('./layout');

let {
    container
} = layout;

module.exports = (basics) => {
    let bulk = styles(container, {
        minWidth: 40,
        backgroundColor: basics.blockColor,
        color: basics.fontColor
    });

    let contrastBulk = styles(bulk, {
        backgroundColor: basics.contrastBlockColor,
        color: basics.contrastFontColor
    });

    let oneLineBulk = styles(bulk, {
        padding: basics.narrowPadding,
        fontSize: basics.normalSize,
        textAlign: 'center',
        lineHeight: 20,
        textDecoration: 'none',
        border: 'none',
        color: basics.fontColor
    });

    let flatOneLineBulk = styles(oneLineBulk, {
        display: 'inline-block',
        backgroundColor: basics.contrastBlockColor,
        color: basics.blockColor
    });

    let modalBulk = styles(oneLineBulk, contrastBulk, {
        display: 'inline-block',
        boxShadow: `3px 3px 5px ${basics.shadowColor}`
    });

    return {
        bulk,
        contrastBulk,
        oneLineBulk,
        modalBulk,
        flatOneLineBulk
    };
}
