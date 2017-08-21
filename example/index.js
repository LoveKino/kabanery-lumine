'use strict';

let {
    mount,
    n
} = require('kabanery');

let FunctionBar = require('../lib/view/header/functionBar');
let Button = require('../lib/view/button/button');
let Input = require('../lib/view/input/input');
let HorizontalTwo = require('../lib/view/layout/horizontalTwo');
let VerticalTwo = require('../lib/view/layout/verticalTwo');
let TextArea = require('../lib/view/input/textarea');

let steadyTheme = require('../lib/theme/steady');

let log = console.log; // eslint-disable-line

let logSignal = (signal, data) => {
    log(JSON.stringify(signal));
    log(JSON.stringify(data));
};

let examples = [

    {
        name: 'function bar',
        render: () => FunctionBar({
            state: {
                title: 'demo',
                leftLogos: [
                    n('div', '<'), 'a', 'b'
                ],
                rightLogos: ['c', 'd']
            },

            onsignal: logSignal
        })
    },
    {
        name: 'button',
        render: () => Button({
            state: {
                text: 'demo'
            },

            onsignal: logSignal
        })
    },

    {
        name: 'input',
        render: () => Input({
            state: {
                text: 'abc'
            },
            onsignal: logSignal
        })
    },

    {
        name: 'HorizontalTwo',
        render: () => n('div', {
            style: {
                width: 400,
                height: 100
            }
        }, [HorizontalTwo({
            state: {
                left: n('span', 'this is left child'),
                right: n('span', 'this is right child')
            },
            style: {
                container: {
                    backgroundColor: 'grey'
                },
                leftContainer: {
                    backgroundColor: 'blue'
                },
                rightContainer: {
                    backgroundColor: 'red'
                }
            }
        })])
    },

    {
        name: 'HorizontalTwo: compose to 3',
        render: () => n('div', {
            style: {
                width: 400,
                height: 100
            }
        }, [HorizontalTwo({
            state: {
                mode: 'percentage',
                left: HorizontalTwo({
                    state: {
                        mode: 'percentage',
                        left: '1',
                        right: '2'
                    },

                    style: {
                        leftContainer: {
                            backgroundColor: 'yellow'
                        }
                    }
                }),
                right: '3',
                leftWidthPer: 0.66
            },
            style: {
                container: {
                    backgroundColor: 'grey'
                },
                leftContainer: {
                    backgroundColor: 'blue'
                },
                rightContainer: {
                    backgroundColor: 'red'
                }
            }
        })])
    },

    {
        name: 'VerticalTwo',

        render: () => n('div', {
            style: {
                width: 400
            }
        }, [VerticalTwo({
            state: {
                top: n('span', 'this is top child'),
                bottom: n('span', 'this is bottom child')
            },

            style: {
                container: {
                    backgroundColor: 'grey'
                },
                topContainer: {
                    backgroundColor: 'blue'
                },
                bottomContainer: {
                    backgroundColor: 'red'
                }
            }
        })])
    }
];

let Pager = n('div', {
    style: {
        width: '100%',
        height: '100%',
        backgroundColor: steadyTheme.basics.pageColor
    }
}, examples.map(({
    name,
    render
}) => {
    return n('div', {
        style: {
            padding: 8
        }
    }, [
        n('div style="font-weight:bold;"', {
            style: {
                width: '100%',
                backgroundColor: steadyTheme.basics.borderColor
            }
        }, name),

        n('div', {
            style: {
                padding: 8
            }
        }, [
            n('div', 'code'),
            TextArea({
                state: {
                    text: render.toString()
                }
            }),
            n('br'),

            n('div', 'UI'),
            render()
        ])
    ]);
}));

mount(Pager, document.body);
