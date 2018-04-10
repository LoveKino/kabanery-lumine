'use strict';

let {
  examples
} = require('../demoData');
let {
  onSignalType, n, lumineView
} = require('../../..');
let FunctionBar = require('../../../lib/view/header/functionBar');
let TestView = require('../view/testView');
let TOCView = require('../../../lib/view/toc/toc');
let Hn = require('../../../lib/view/layout/hn');
let Vn = require('../../../lib/view/layout/vn');

let getToc = () => {
  return examples.map(({
    name
  }) => {
    return {
      name
    };
  });
};

module.exports = lumineView(({
  props
}) => n('div', {
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: props.theme.basics.pageColor
  }
}, [
  n(Vn, [
    n(FunctionBar, {
      title: 'Demos of kabanery-lumine views',
      leftLogos: [
        n('div', '<')
      ],

      rightLogos: [
        n('a href="https://github.com/LoveKino/kabanery-lumine" target="_blank"', {
          style: {
            color: 'white',
            'text-decoration': 'none',
            'display': 'block',
            'height': '100%',
            'line-height': '30px'
          }
        }, 'github')
      ],

      onsignal: onSignalType('click', (signal) => {
        if (signal.data.sourceType === 'leftLogos') {
          if (signal.data.index === 0) {
            window.location.href = '?page=indexPage';
          }
        }
      })
    }),
    n(Hn, {
      mode: 'partion',
      leftPartions: [200]
    }, [
      n(TOCView, {
        toc: getToc()
      }),

      n(Vn, [
        examples.map((example) => n('div', {
          id: example.name,
          style: {
            margin: 8,
            padding: 8,
            borderRadius: 8,
            border: '1px solid rgba(100,100,100,0.5)',
            boxShadow: '3px 3px 5px rgba(100, 100, 100, 0.5)'
          }
        }, [
          n(TestView, {
            example
          })
        ]))
      ])
    ])
  ])
]));
