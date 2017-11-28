'use strict';

let layout = require('./layout');
let Bulk = require('./bulk');
let Actions = require('./actions');
let Widget = require('./widget');

module.exports = (basics, custom = {}) => {
    let bulks = Bulk(basics);
    let actions = Actions(basics);
    let widgets = Widget(basics, layout, bulks);

    if (typeof custom === 'function') {
        custom = custom(basics, layout, bulks);
    }

    bulks = Object.assign(bulks, custom.bulks || {});
    actions = Object.assign(actions, custom.actions || {});
    widgets = Object.assign(widgets, custom.widgets || {});

    return Object.assign({
        basics,
        actions
    }, layout, bulks, actions, widgets);
};
