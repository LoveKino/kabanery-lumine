'use strict';

let {
    n,
    parseArgs
} = require('kabanery');

module.exports = (...args) => {
    let tagName = args[0];

    if (typeof tagName === 'string') {
        return n(...args);
    } else {
        let {
            attributes,
            childs
        } = parseArgs(args, {
            doParseStyle: false
        });

        return tagName({
            props: attributes,
            children: childs
        });
    }
};
