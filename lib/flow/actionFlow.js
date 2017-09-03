'use strict';

let {
    signalUpdateStateRunner,
    signalSendRequestRunner,
    responseUpdateStateRunner,
    responseErrorRunner
} = require('./updateFlow');

/**
 * action flow
 */
const ACTION_SIGNAL_UPDATE_STATE = 'updateState';
const ACTION_SIGNAL_SEND_REQUEST = 'sendRequest';

/**
 * variableMap: global variable map
 *
 * TODO support general action flow
 */
let signalActionFlow = (signalActionMap, pageEnv, variableMap = {}, {
    variableStub
} = {}) => {
    parseSignalActionMap(signalActionMap, variableMap, {
        variableStub
    });

    return (signal, viewState, ctx) => {
        let actions = signalActionMap[signal.type] || [];
        return runSignalActions(signal, actions, viewState, ctx, pageEnv);
    };
};

let runSignalActions = (signal, actions, viewState, ctx, pageEnv) => {
    return Promise.all(actions.map((action) => {
        return action.content(signal, viewState, ctx, pageEnv);
    }));
};

// TODO validate signalActionMap
let parseSignalActionMap = (signalActionMap, variableMap, {
    variableStub
}) => {
    for (let name in signalActionMap) {
        let actions = signalActionMap[name];
        if (!Array.isArray(actions)) {
            throw new Error(`Expect array for actions in signal action map. But got ${actions}.`);
        }
        for (let i = 0; i < actions.length; i++) {
            parseSignalAction(actions[i], variableMap, {
                variableStub
            });
        }
    }
};

let parseSignalAction = (signalAction, variableMap, {
    variableStub
}) => {
    let type = signalAction.type;
    let cnt = signalAction.content;
    if (type === ACTION_SIGNAL_UPDATE_STATE) {
        if (typeof cnt !== 'function') {
            /**
             * {
             *    type,
             *    content,
             *    variableMap,
             *    variableStub
             * }
             */
            // action code to update runner
            let signalUpdate = signalUpdateStateRunner(cnt,
                getVariableMap(variableMap, signalAction),

                {
                    variableStub: getVariableStub(variableStub, signalAction)
                });

            signalAction.content = (...args) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve(signalUpdate(...args));
                    } catch (err) {
                        reject(err);
                    }
                });
            };
        }
    } else if (type === ACTION_SIGNAL_SEND_REQUEST) {
        /**
         * {
         *   type,
         *   content,
         *   variableMap,
         *   variableStub,
         *   response: action,
         *   error: action
         * }
         */
        if (typeof cnt !== 'function') {
            let nextVariableMap = getVariableMap(variableMap, signalAction);
            let nextVariableStub = getVariableStub(variableStub, signalAction);
            let signalRequest = signalSendRequestRunner(cnt, nextVariableMap, {
                variableStub: nextVariableStub
            });

            let responseUpdate = signalAction.response && responseUpdateStateRunner(signalAction.response, nextVariableMap, {
                variableStub: nextVariableStub
            });

            let errorUpdate = signalAction.error && responseErrorRunner(signalAction.error, nextVariableMap, {
                variableStub: nextVariableStub
            });

            signalAction.content = (signal, data, ctx, pageEnv) => {
                return signalRequest(signal, data, ctx, pageEnv).then((response) => {
                    return responseUpdate && responseUpdate(response, data, ctx);
                }).catch((err) => {
                    errorUpdate && errorUpdate(err, data, ctx);
                    throw err;
                });
            };
        }
    } else {
        throw new Error(`unexpected action type for a signal action, type is ${type}`);
    }
};

let getVariableMap = (variableMap, action) => {
    if (!action.variableMap) return variableMap;
    return Object.assign({}, variableMap, action.variableMap);
};

let getVariableStub = (variableStub, action) => {
    if (!action.variableStub) return variableStub;
    return Object.assign({}, variableStub, action.variableStub);
};

module.exports = {
    signalActionFlow,
    runSignalActions
};
