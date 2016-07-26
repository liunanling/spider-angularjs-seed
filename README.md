angularjs-seed
---
基于 angularjs 的快速开发框架

集成模块
===
- `ui.router` 路由
- `angularLazyImg` 图片延迟加载
- `ngStorage` 存储
- `ik.ngLoadingBar` 加载
- `restangular` 接口请求
- `angular-cache` 缓存
- `ik.ngAliImg` 阿里云图片处理服务
- `angular.filter` 常用过滤器
- `angular-swiper` swiper指令
- `ik.ngHistory` 历史管理

如何安装
===
```
// 下载
$ git clone git@gitlab.it.inkey.com:spider/angularjs-seed.git

// or 直接下载到本地

// 进入根目录
$ cd angularjs-seed

// 安装开发依赖模块
$ npm i 

// 进入源码目录, 安装模块
$ cd app && cnpm i

// 编译
$ fis3 release -wclL

// 启动项目
$ cd ../ && gulp dev 

// 项目服务器
// http://localhost:6030 
// 文档服务器
// http://localhost:6040 
```

注意事项
===
> 某些情况下, 项目启动会出现异常情况。为了更好的使用第三方模块。模块如果未被规范化的, 请自行下载好模块之后, 修改其模块的 package.json 或 源码

- `package.json` 却少 `main` 字段

  ```
  // package.json
  {
    version: '0.0.1',
    main: 'dist/jQuery.js',
    // ...
  }

  // index.js
  var require('jQuery');
  ```

- 源码中出现 define 字样

  ```
  // 如果模块中有这段代码, 请自行屏蔽掉, 否则会报错
  define(function(require, exports, module) {
    module.exports = Scroll;
  })
  ```

启动之后需要修改的地方
===
- `package.json` 根目录下的, 非app目录
- `gulpfile.js`
- `app/fis-conf.js`
- `app/modules/config/constant.js`
- `app/modules/config/env.js`
- `app/modules/config/info.js`


ChangeLog
---
0.0.1

