# kabanery-lumine

[中文文档](./README_zh.md)   [document](./README.md)

Common UIs
- [install](#install)
- [features](#features)
- [document site](#document-site)
- [usage](#usage)
  * [CLI quick run](#cli-quick-run)
  * [CLI options](#cli-options)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i kabanery-lumine --save` or `npm i kabanery-lumine --save-dev`

Install on global, using `npm i kabanery-lumine -g`

## features

 Front end framework, which provides:

  - the simple way to define view
  
  - data migration system
  
    signal system
  
    simple DSL to update page
  
    simple DSL to request and response data
  
  - common views
  
  - theme system
  
  - skelton tools
  
  - other tools

## document site

 [http://lovekino.github.io/project/kabanery-lumine/index.html](http://lovekino.github.io/project/kabanery-lumine/index.html)

## usage

### CLI quick run

- lumine-skelton


### CLI options

- lumine-skelton

```shell

$ ./node_modules/kabanery-lumine/bin/lumine-skelton -h

Usage: lumine-skelton
    -d [web module direcotry]


Options:
  -h, --help  Show help                                                [boolean]


```







## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──bin    
│   └──lumine-skelton    
│──docSite    
│   │──assets    
│   │   └──app.js    
│   │──demoData    
│   │   └──index.js    
│   │──index.html    
│   │──index.js    
│   │──testViews    
│   │   │──TestSignalActionFlow.js    
│   │   └──TestSignalUpdateStateRunnerView.js    
│   └──webpack.config.js    
│──index.js    
│──lib    
│   │──build    
│   │   │──readme.md    
│   │   │──skelton    
│   │   │   └──index.js    
│   │   └──util.js    
│   └──flow    
│       │──actionFlow.js    
│       │──baseSignalActions.js    
│       └──updateFlow.js    
│──package.json    
└──test    
    └──__test     
```


### run tests

`npm test`

## license

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
