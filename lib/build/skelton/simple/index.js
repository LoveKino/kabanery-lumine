'use strict';

let promisify = require('es6-promisify');
let fs = require('fs');
let path = require('path');
let mkdirp = promisify(require('mkdirp'));
let indexHtmlTpl = require('./tpl/indexHtmlTpl');
let indexJsTpl = require('./tpl/indexJsTpl');
let signalsJsTpl = require('./tpl/signalJsTpl');
let pageSignalActionJsTpl = require('./tpl/pageSignalActionJsTpl');
let pageViewIndexJsTpl = require('./tpl/pageViewIndexJsTpl');
let webpackConfigTpl = require('./tpl/webpackConfigTpl');
let pageViewTpl = require('./tpl/pageViewTpl');
let {safeWrite} = require('../../util');

let stat = promisify(fs.stat);
let writeFile = promisify(fs.writeFile);

/**
 *
 * skelton = { // for a SPA module
 *      index.html
 *     -asset
 *     -lib
 *           index.js
 *          -pageView
 *              index.js
 *          -pageSignalAction
 *              index.js
 *          -signals
 * }
 */
module.exports = (options) => {
  let indexHtmlPath =
      path.join(options.webDir, options.indexName || 'index.html');
  let assetDir = path.join(options.webDir, options.assetName || 'asset');
  let libDir = path.join(options.webDir, options.libName || 'lib');
  let libIndexJs = path.join(libDir, options.libIndexName || 'index.js');

  options.pageSignalActionMapPath =
      options.pageSignalActionMapPath || './pageSignalAction';
  options.pageViewMapPath = options.pageViewMapPath || './pageView';
  options.defaultPage = options.defaultPage || 'indexPage';

  let pageSignalActionDir = path.join(libDir, options.pageSignalActionMapPath);
  let pageViewDir = path.join(libDir, options.pageViewMapPath);

  let pageSignalActionIndexJs = path.join(pageSignalActionDir, 'index.js');
  let pageViewIndexJs = path.join(pageViewDir, 'index.js');
  let defaultPageViewJs = path.join(pageViewDir, options.defaultPage + '.js');

  let signalsJs = path.join(libDir, options.signalsName || 'signals.js');

  let webpackConfigTplJs = path.join(options.webDir, 'webpack.config.js');

  return mkdirp(options.webDir).then(() => {
    return Promise.all([
      mkdirp(assetDir),

      safeWrite(webpackConfigTplJs, webpackConfigTpl()),

      mkdirp(libDir).then(() => {
        return Promise.all([
          mkdirp(pageSignalActionDir).then(() => {
            return safeWrite(pageSignalActionIndexJs,
                             pageSignalActionJsTpl(options));
          }),
          mkdirp(pageViewDir).then(() => {
            return Promise.all([
              safeWrite(pageViewIndexJs, pageViewIndexJsTpl(options)),
              safeWrite(defaultPageViewJs, pageViewTpl())
            ]);
          }),
          safeWrite(signalsJs, signalsJsTpl()),
          safeWrite(libIndexJs, indexJsTpl(options))
        ]);
      }),

      safeWrite(indexHtmlPath, indexHtmlTpl(options))
    ]);
  });
};
