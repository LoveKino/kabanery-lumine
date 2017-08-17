'use strict';

let styles = (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
};

module.exports = {
    styles
};
