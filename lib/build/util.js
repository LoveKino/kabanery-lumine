'use strict';

let promisify = require('es6-promisify');
let fs = require('fs');

let stat = promisify(fs.stat);
let writeFile = promisify(fs.writeFile);

let safeWrite = (filePath, cnt) => {
  return existsFile(filePath).then((has) => {
    if (!has) {
      return writeFile(filePath, cnt, 'utf-8');
    }
  });
};

let existsFile = (filePath) => {
  return new Promise((resolve) => {
    stat(filePath)
      .then((statObj) => { resolve(statObj.isFile()); })
      .catch(() => { resolve(false); });
  });
};

module.exports = {
  safeWrite,
  existsFile
};
