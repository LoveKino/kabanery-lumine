'use strict';

let {
    parseStrToAst,
    checkAST,
    executeAST
} = require('tree-script');
let JsonTree = require('tree-script/lib/jsonTree');

/**
 *
 * atom updating
 *
 * 1. signal to update client state, like page UI.
 *
 * 2. signal to send request
 *
 * 3. response (from server or other) update client state, like page UI
 */

const clientState = {
    localStorage: typeof localStorage !== 'undefined' && localStorage
};

let getSignalUpdateStateMap = (signal, viewState) => {
    return Object.assign({
        signal,
        viewState
    }, clientState);
};

let getResponseUpdateStateMap = (response, viewState) => {
    return Object.assign({
        response,
        viewState
    }, clientState);
};

let signalUpdateStateRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = parseStrToAst(code);

    checkAST(ast, {
        variableStub
    });

    return (signal, viewState, ctx) => {
        let data = getSignalUpdateStateMap(signal, viewState);
        let tree = JsonTree(data);

        executeAST(ast, {
            queryByPath: tree.queryByPath,
            setByPath: tree.setByPath,
            removeByPath: tree.removeByPath,
            appendByPath: tree.appendByPath,
            variableMap,
            variableStub
        });

        // update page
        ctx.updateWithNotify();
    };
};

let responseUpdateStateRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = parseStrToAst(code);

    checkAST(ast, {
        variableStub
    });

    return (response, viewState, ctx) => {
        let data = getResponseUpdateStateMap(response, viewState);
        let tree = JsonTree(data);

        executeAST(ast, {
            queryByPath: tree.queryByPath,
            setByPath: tree.setByPath,
            removeByPath: tree.removeByPath,
            appendByPath: tree.appendByPath,
            variableMap,
            variableStub
        });

        // update page
        ctx.updateWithNotify();
    };
};

module.exports = {
    signalUpdateStateRunner,
    responseUpdateStateRunner
};
