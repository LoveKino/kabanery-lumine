'use strict';

let lumineView = require('../util/lumineView');
let n = require('../util/n');
let PageLoading = require('../view/loading/pageLoading');
let Notice = require('../view/notice/notice');
let {syncBindWithKeyMap} = require('../view/compose/mapUI');
let Full = require('../view/layout/full');

/**
 *
 * define a simple page view class, which contains page loading and notice.
 */

module.exports = (PageView) => {
  let fun = ({props, children}, ctx) => {
    return n(Full, {}, [
      n(PageLoading, syncBindWithKeyMap(ctx, {'loading.show' : 'show'})),

      n(Notice, syncBindWithKeyMap(
                    ctx, {'notice.show' : 'show', 'notice.text' : 'text'})),

      n(PageView, props, children)
    ]);
  };

  return lumineView(fun, {
    defaultProps : {
      // loading in page level
      loading : {show : false},
      // notice window
      notice : {show : false, text : ''}
    }
  });
};
