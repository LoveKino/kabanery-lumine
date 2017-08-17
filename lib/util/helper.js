'use strict';

let styles = (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
};

let isMapObject = (v) => {
    return v && typeof v === 'object' && !Array.isArray(v);
};

module.exports = {
    styles,
    isMapObject
};
