'use strict';

let SimplePager = require('../../../lib/page/simplePager');
let {
  onSignalType,
  n,
  lumineView
} = require('../../..');

// views
let FunctionBar = require('../../../lib/view/header/functionBar');
let Vn = require('../../../lib/view/layout/vn');
let Block = require('../../../lib/view/block/block');
let Flat = require('../../../lib/view/block/flat');

/**
 * // some common signals
 * let {KABANERY_DO_RENDER} = require('kabanery-lumine/lib/flow/baseSignalActions');
 */

/**
 *  SimplePager encapsulate notice and loading view.
 *
 *      .notice.text
 *      .notice.show
 *      .loading.show
 */

/**
 * syncBindWithKeyMap:
 *     sync child props with parent props
 *     demo: n(Input, syncBindWithKeyMap(ctx, {[parent props]: 'value'}, {bindedProps: {}}))
 */

/**
 * deliver signal
 *     demo: n(Button, {onsignal: onSignalType('click', deliver(ctx, SIGNAL_TYPE))}, 'save')
 */

module.exports = SimplePager(lumineView(() => {
  return n(Vn, [
    n(FunctionBar, {
      title: 'kabanery lumine',
      rightLogos: [
        n('div', 'view demo'),
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
        if (signal.data.sourceType === 'rightLogos') {
          if (signal.data.index === 0) {
            window.location.href = '?page=viewDemo';
          }
        }
      })
    }),

    n('div', {
      style: {
        marginTop: 30,
        padding: 20,
        textAlign: 'center'
      }
    }, [
      n(Block, {
        style: {
          display: 'inline-block',
          fontSize: 30,
          padding: 12,
          marginBottom: 18
        }
      }, [
        'What you imagine, what you get.'
      ]),
      n('br'),

      n(Block, {
        style: {
          display: 'inline-block',
          fontSize: 20,
          padding: 8
        }
      }, 'DSL driven, Data migration from signal system, Common views integration Front End framework.')
    ]),

    n(Vn, {
      style: {
        container: {
          padding: 8
        }
      }
    }, [
      n(Flat, {
        style: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }, 'main features'),
      n(Flat, [
        n(Flat, 'A simple way to define view'),
        n(Flat, 'DSL driven, simple DSL for specific job.'),
        n(Flat, 'Data migration system'),
        n(Flat, 'Common views'),
        n(Flat, 'Theme system'),
        n(Flat, 'Skelton tools'),
        n(Flat, 'Other tools')
      ])
    ])
  ]);
}, {
  defaultProps: {}
}));
