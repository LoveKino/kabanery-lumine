'use strict';

let {
    parseStrToAst,
    checkAST
} = require('tree-script');

let compileTreeScript = (treeScriptCode, {
    variableStub
} = {}) => {
    let ast = parseStrToAst(treeScriptCode);

    if (variableStub) {
        checkAST(ast, {
            variableStub
        });
    }

    return {
        ast,
        variableStub
    };
};

module.exports = {
    compileTreeScript
};
