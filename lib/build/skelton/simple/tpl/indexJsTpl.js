module.exports = ({
  pageSignalActionMapPath = './pageSignalAction',
  pageViewMapPath = './pageView',
  apiStubPath,
  defaultPage
}) => {
  return `'use strict';

let {
    SPA
} = require('kabanery-lumine/lib/page/flowPfcSPA');
let pageSignalActionMap = require('${pageSignalActionMapPath}');
let pageViewMap = require('${pageViewMapPath}');
${apiStubPath ? 'let apiStub = require(\'../../common/apiStub\');' : ''}

SPA({
    ${apiStubPath ? 'apiStub,' : ''}
    pageViewMap,
    pageSignalActionMap,
    pageOptionsMap: {},
    defaultPage: '${defaultPage}'
});`;
};
