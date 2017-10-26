let n = require('../../../lib/util/n');
let lumineView = require('../../../lib/util/lumineView');
let {
    signalUpdateStateRunner
} = require('../../../lib/flow/updateFlow');
let {
    signalActionFlow
} = require('../../../lib/flow/actionFlow');
let {
    onSignalType
} = require('../../../lib/util/signal');
let {
    styles
} = require('../../../lib/util/helper');

let FunctionBar = require('../../../lib/view/header/functionBar');
let Button = require('../../../lib/view/button/button');
let FlatButton = require('../../../lib/view/button/flatButton');
let Input = require('../../../lib/view/input/input');
let TextArea = require('../../../lib/view/input/textarea');
let Hn = require('../../../lib/view/layout/hn');
let Vn = require('../../../lib/view/layout/vn');
let Notice = require('../../../lib/view/notice/notice');
let TextLoading = require('../../../lib/view/loading/textLoading');
//let TestSignalUpdateStateRunnerView = require('../testViews/TestSignalUpdateStateRunnerView');
//let TestSignalActionFlow = require('../testViews/TestSignalActionFlow');
let Modal = require('../../../lib/view/modal/modal');
let InputDialog = require('../../../lib/view/modal/inputDialog');
let Fold = require('../../../lib/view/fold/fold');
let Toc = require('../../../lib/view/toc/toc');
let Card = require('../../../lib/view/card/card')
// let PageMask = require('../../../lib/view/mask/pageMask');
// let PageLoading = require('../../../lib/view/loading/pageLoading');

//
 ChangeText = signalUpdateStateRunner('.viewState.props.text="changed!"');
let log = console.log; // eslint-disable-line

let logSignal = (signal, data) => {
    log(JSON.stringify(signal));
    log(JSON.stringify(data));
};

let examples = [

    {
        name: 'function bar',
        code: `// Head bar
n(FunctionBar, {
    title: 'demo',
    leftLogos: [n('div', '<'), 'a', 'b'],
    rightLogos: ['c', 'd']
})`
    },

    {
        name: 'button',
        code: `// normal button
n(Button, {}, ['demo'])`
    },

    {
        name: 'flat button',
        code: `// flat button
n(FlatButton, {}, ['demo'])`
    },

    {
        name: 'input',
        code: `// normal Input
n(Input, {
    value: 'abc'
})`
    },

    {
        name: 'hn',
        description: 'Layout children in horizontal direction.',
        code: `// horizontal layout
n('div', {
    style: {
        width: 400
    }
}, [n(Hn, {
    style: {
        childs: [
            {
                backgroundColor: 'blue'
            }, {
                backgroundColor: 'red'
            },
            {
                backgroundColor: 'yellow'
            }
        ]
    }
}, [
    n('span', 'this is 1'),
    n('span', 'this is 2..'),
    n('span', 'this is 3....')
])])`
    },

    {
        name: 'hn-percentage',
        description: 'In percentage mode, children will divide container in terms of percentage',
        code: `//horizontal layout by percentage
n('div', {
    style: {
        width: 400
    }
}, [n(Hn, {
    mode: 'percentage',
    pers: [4, 8, 3],
    style: {
        childs: [{
                backgroundColor: 'blue'
            }, {
                backgroundColor: 'red'
            },
            {
                backgroundColor: 'yellow'
            }
        ]
    }
}, [
    n('span', 'this is 1'),
    n('span', 'this is 2..'),
    n('span', 'this is 3....')
])])`
    },

    {
        name: 'hn-partion',
        description: 'In partion mode, one child\'s width will be flexible, the left and right of the child will have fixed width.',
        code: `// horizontal layout, partion mode
n('div', {
    style: {
        width: 400,
        height: 200
    }
}, [
    n(Hn, {
        mode: 'partion',
        leftPartions: [50, 30],
        rightPartions: [20, 25],
        style: {
            childs: [{
                    backgroundColor: 'blue'
                },
                {
                    backgroundColor: 'red'
                },
                {
                    backgroundColor: 'yellow'
                },
                {
                    backgroundColor: 'purple'
                },
                {
                    backgroundColor: 'green'
                }
            ]
        }
    }, [
        n('span', 'this is 1'), n('span', 'this is 2..'),
        n('div style="width:340px;background-color:white;"',
            'this is 3'),
        n('div', 'in bottom'), n('div', 'last in bottom')
    ])
])`
    },

    {
        name: 'vn',
        description: 'Layout children in vertical direction.',
        code: `// vertical layout
n('div', {
    style: {
        width: 400
    }
}, [n(Vn, {
    style: {
        childs: [{
                backgroundColor: 'blue'
            }, {
                backgroundColor: 'red'
            },
            {
                backgroundColor: 'yellow'
            }
        ]
    }
}, [
    n('span', 'this is 1'),
    n('span', 'this is 2..'),
    n('span', 'this is 3....')
])])`
    },

    {
        name: 'vn-percentage',
        code: `// vertical percentage
n('div', {
    style: {
        width: 400,
        height: 200
    }
}, [
    n(Vn, {
        mode: 'percentage',
        pers: [3, 6, 9],
        style: {
            childs: [{
                    backgroundColor: 'blue'
                },
                {
                    backgroundColor: 'red'
                },
                {
                    backgroundColor: 'yellow'
                }
            ]
        }
    }, [
        n('span', 'this is 1'), n('span', 'this is 2..'),
        n('span', 'this is 3....')
    ])
])`
    },
    {
        name: 'vn-partion',
        code: `// vertical layout: partion mode
n('div', {
    style: {
        width: 400,
        height: 200
    }
}, [n(Vn, {
    mode: 'partion',
    topPartions: [50, 30],
    bottomPartions: [20, 25],
    style: {
        childs: [{
                backgroundColor: 'blue'
            },
            {
                backgroundColor: 'red'
            },
            {
                backgroundColor: 'yellow'
            },
            {
                backgroundColor: 'purple'
            },
            {
                backgroundColor: 'green'
            }
        ]
    }
}, [
    n('span', 'this is 1'), n('span', 'this is 2..'),
    n('div', [${[1, 1, 1, 1, 1, 1, 1].map(
        (_, index) => `n('div', 'this is 3: ${index}....')`).join(',')}]),
    n('div', 'in bottom'), n('div', 'last in bottom')
])])`
    },

    {
        name: 'fold',
        code: `// fold
n(Fold, {hide: true, style: {title: {color: 'red'}}}, [n('span', 'head'), n('div', 'body')]);
`
    },

    {
        name: 'toc',
        code: `//toc 
n(Toc, {
    toc: [{
        name: 'chapter1',
        next: [{
           name: 'paragraph1'
        }, {
           name: 'paragraph2'
        }]
    }, {
        name: 'chapter2'
    }]
});
`
    },
    {
        name: 'card',
        code: `//card
n(Card, {
   title: 'card to test'
},[
    n('span', 1234)
])
`
    }

    /*
    {
        name: 'notice',

        code: ` // notice view
n(Notice, {
    text: 'notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................notice hint ...................',
    onsignal: logSignal
})`
    },

    {
        name: 'textLoading',
        code: `// textLoading
n(TextLoading)`
    },

    {
        name: 'TestSignalUpdateStateRunnerView',
        code: `// TestSignalUpdateStateRunnerView
n(TestSignalUpdateStateRunnerView, {
    text: 'init',
    onsignal: onSignalType('doTestSUS', ChangeText)
})`
    },

    {
        name: 'TestSignalActionFlow',
        code: `// TestSignalActionFlow
n(TestSignalActionFlow, {
    text: 'start',
    text2: 'start2',
    onsignal: signalActionFlow({
        'doTestSAF': [{
                type: 'updateState',
                content: '.viewState.props.text = "cccc!!!"'
            },
            {
                type: 'updateState',
                content: '.viewState.props.text2 = "eeee!!!"'
            }
        ]
    })
})`
    },
    */

    /*
    {
        name: 'Modal',
        code: `// Modal
n(Modal, {
    autoHide: true
}, [n('div', 123)])`
    },

    {
        name: 'InputDialog',
        code: `// InputDialog
n(InputDialog, {
    title: 'test',
    text: 'start',
    autoHide: true,
    placeholder: 'place something',
    onsignal: logSignal
})`
    },

    {
        name: 'pageMask',
        code: () => n(PageMask)
    },

    {
        name: 'PageLoading',
        code: () => n(PageLoading)
    }
    */
];

let renderExample = (exampleCode) => {
    try {
        return eval(exampleCode);
    } catch (err) {
        return n(ErrorView, {
            errMsg: err.toString()
        });
    }
};

let ErrorView = lumineView(({
    props
}) => {
    return n('div', {
        style: {
            color: 'red'
        }
    }, props.errMsg);
});

// TODO link view file code

module.exports = {
    examples,
    renderExample
};
