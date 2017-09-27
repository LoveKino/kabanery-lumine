# kabanery-lumine

[中文文档](./README_zh.md)   [document](./README.md)

Common UIs
- [安装](#%E5%AE%89%E8%A3%85)
- [features](#features)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [命令行快速运行](#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
  * [CLI 选项](#cli-%E9%80%89%E9%A1%B9)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i kabanery-lumine --save` 或者 `npm i kabanery-lumine --save-dev`

全局安装, 使用 `npm i kabanery-lumine -g`

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
 document address [http://lovekino.github.io/project/kabanery-lumine/index.html](http://lovekino.github.io/project/kabanery-lumine/index.html)

## 使用方法

### 命令行快速运行

- lumine-skelton


### CLI 选项

- lumine-skelton

```shell

$ ./node_modules/kabanery-lumine/bin/lumine-skelton -h

Usage:
/Users/yuer/workspaceforme/work/basis/ui/kabanery-lumine/bin/lumine-skelton
    -d [web module direcotry]


Options:
  -h, --help  Show help                                                [boolean]


```







## 开发

### 文件结构

```
.    
│──LICENSE    
│──README.md    
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


### 运行测试用例

`npm test`

## 许可证

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
