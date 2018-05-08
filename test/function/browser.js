'use strict';

let browserJsEnv = require('browser-js-env');
let promisify = require('es6-promisify');
let fs = require('fs');
let path = require('path');
let readFile = promisify(fs.readFile);

let runFileInBrowser = async(file) => {
  let str = await readFile(file, 'utf-8');
  await browserJsEnv(str, {
    testDir: path.join(path.dirname(file), `../../__test/${path.basename(file)}`),
    //clean: true
  });
};

let testFiles = {
  'base': path.join(__dirname, '../browser/case/base.js'),
  'syncBindWithKeyMap:base': path.join(__dirname, '../browser/case/syncBindWithKeyMap/base.js')
};

describe('browser', () => {
  for (let name in testFiles) {
    it(name, () => {
      return runFileInBrowser(testFiles[name]);
    });
  }
});
