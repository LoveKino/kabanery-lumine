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

let signalUpdateStateRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = getTreeScriptAst(code, variableStub);

    return (signal, viewState, ctx) => {
        let data = Object.assign({
            signal,
            viewState
        }, clientState);
        updateTree(data, ast, variableMap, variableStub);
        // update page
        ctx.updateWithNotify();
    };
};

let signalSendRequestRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = getTreeScriptAst(code, variableStub);

    return (signal, viewState, ctx, {
        runApi,
        apiMap
    }) => {
        let data = Object.assign({
            signal,
            viewState
        }, clientState);
        return runApi(updateTree(data, ast, Object.assign({}, variableMap, apiMap), variableStub));
    };
};

let responseUpdateStateRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = getTreeScriptAst(code, variableStub);

    return (response, viewState, ctx) => {
        updateTree(Object.assign({
            response,
            viewState
        }, clientState), ast, variableMap, variableStub);
        // update page
        ctx.updateWithNotify();
    };
};

let responseErrorRunner = (code, variableMap, {
    variableStub
} = {}) => {
    let ast = getTreeScriptAst(code, variableStub);

    return (error, viewState, ctx) => {
        updateTree(Object.assign({
            errorMsg: error.toString(),
            error,
            viewState,
            ctx
        }, clientState), ast, variableMap, variableStub);
        // update page
        ctx.updateWithNotify();
    };
};

let getTreeScriptAst = (code, variableStub) => {
    let ast = parseStrToAst(code);

    if (variableStub) {
        checkAST(ast, {
            variableStub
        });
    }

    return ast;
};

let updateTree = (source, ast, variableMap, variableStub) => {
    let tree = JsonTree(source);

    return executeAST(ast, {
        queryByPath: tree.queryByPath,
        setByPath: tree.setByPath,
        removeByPath: tree.removeByPath,
        appendByPath: tree.appendByPath,
        variableMap,
        variableStub
    });
};

module.exports = {
    signalUpdateStateRunner,
    signalSendRequestRunner,
    responseUpdateStateRunner,
    responseErrorRunner
};
