'use strict';

let {
    styles
} = require('../util/helper');

let basics = {
    pageColor: '#e4e4e4',
    hoverColor: '#e9ece5',
    blockColor: '#3b3a36',
    borderColor: '#b3c2bf',
    fontColor: 'white',
    noticeColor: 'rgb(23, 21, 21)',

    titleSize: 20,
    normalSize: 16,

    narrowPadding: '4 8 4 8',

    contrastBlockColor: 'white',
    contrastFontColor: 'black'
};

let container = {
    position: 'relative',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    border: 0,
    borderRadius: 0,
    overflow: 'auto'
};

let fullParentHeight = {
    height: '100%'
};

let fullParentWidth = {
    width: '100%'
};

let fullParent = styles(container, fullParentWidth, fullParentHeight);

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

let flat = {
    appearance: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    boxShadow: 'none',
    borderRadius: 'none',
    border: 0
};

let inputBox = styles(contrastBulk, flat, {
    width: 260,
    padding: basics.narrowPadding,
    backgroundColor: basics.fontColor
});

let textAreaBox = styles(inputBox, {
    width: 360,
    height: 200,
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
    border: `1px solid ${basics.borderColor}`,
    borderRadius: 5,
    fontSize: 16
});

let underLineBorder = {
    border: 0,
    borderRadius: 0,
    'border-bottom': `1px solid ${basics.borderColor}`
};

let underLineFocus = {
    'border-bottom': `2px solid ${basics.blockColor}`
};

let actions = {
    cling: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },

    hover: {
        backgroundColor: basics.hoverColor
    },

    active: {
        backgroundColor: basics.hoverColor
    },

    focus: {
        outline: 'none'
    }
};

module.exports = {
    basics,

    bulk,
    oneLineBulk,
    inputBox,
    textAreaBox,
    underLineBorder,
    underLineFocus,
    container,
    fullParent,
    fullParentWidth,
    fullParentHeight,

    actions
};
