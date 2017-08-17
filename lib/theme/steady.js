'use strict';

let basics = {
    pageColor: '#e4e4e4',
    hoverColor: '#e9ece5',
    blockColor: '#3b3a36',
    borderColor: '#b3c2bf',

    fontColor: 'white',

    titleSize: 20,
    normalSize: 16
};

let bulk = {
    minWidth: 40,
    boxSizing: 'border-box',
    backgroundColor: basics.blockColor,
    color: basics.fontColor
};

let oneLineBulk = Object.assign({}, bulk, {
    padding: '4 8 4 8',
    fontSize: basics.normalSize,
    textAlign: 'center',
    lineHeight: 20,
    textDecoration: 'none',
    border: 'none',
    color: basics.fontColor
});

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

    actions
};
