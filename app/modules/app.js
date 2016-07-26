'use strict';

var share = require('@spider/share');
var userAgent = navigator.userAgent.toLowerCase();

angular
  .module('ink')
  .config(config)
  .run(run);

function config(CONST, inkRouterProvider, $httpProvider, RestangularProvider, $localStorageProvider, $sessionStorageProvider, ikngAliImgProvider) {

  // 配置路由初始化

  inkRouterProvider.configuration();

  // 设置阿里云图片服务

  ikngAliImgProvider.configuration({
    isWebp: CONST.ENABLE_WEB_P
  });

  RestangularProvider.setDefaultHttpFields({
    timeout: CONST.HTTP_TIME_OUT * 1000
  });

  // 设置存储前缀

  $localStorageProvider.setKeyPrefix(CONST.STORAGE_PREFIX);

  $sessionStorageProvider.setKeyPrefix(CONST.STORAGE_PREFIX);

  // 公共拦截器

  $httpProvider.interceptors.push('commonInterceptor');

  // 参数拦截器

  $httpProvider.interceptors.push('basicParamsInterceptor');

  // 添加请求锁拦截器

  $httpProvider.interceptors.push('lockQuestInterceptor');

  // 日志拦截器

  $httpProvider.interceptors.push('logInterceptor');
}

function run($rootScope, saveToken, $state, $stateParams, TAPP, ENV, INFO, CONST, imageClipping, ikngHistory) {

  // 保存token

  saveToken();

  /** @namespace $rootScope */

  /**
   * app基本信息
   * @type {Object}
   */

  $rootScope.INFO = INFO;

  /**
   * 环境变量
   * @type {Object}
   */

  $rootScope.ENV = ENV;

  /**
   * 常量
   * @type {Object}
   */

  $rootScope.CONST = CONST;

  /**
   * 图片裁剪
   * @type {Object}
   */

  $rootScope.imageClipping = imageClipping;

  /**
   * 想改变body样式, 可设置该对象
   * @type {Object}
   */

  $rootScope.bodyStyle = {};

  /**
   * 路由状态
   */

  $rootScope.$state = $state;

  /**
   * 路由参数
   * @type {Object}
   */

  $rootScope.$stateParams = $stateParams;

  /**
   * 屏幕宽度
   * @type {Number}
   */

  $rootScope.winWidth  = $(window).width();

  /**
   * 屏幕高度
   * @type {Number}
   */

  $rootScope.winHeight = $(window).height();

  /**
   * 判断是否是IOS
   * @type {Boolean}
   */

  $rootScope.isIOS = !!userAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/);

  /**
   * 判断是否是Android
   * @type {Boolean}
   */

  $rootScope.isAndroid = userAgent.indexOf('android') > -1 || userAgent.indexOf('linux') > -1;

  /**
   * 判断是否微信
   * @type {Boolean}
   */

  $rootScope.isWeixin = userAgent.indexOf('micromessenger') > -1;

  /**
   *  分享
   *  @type {Object}
   */

  $rootScope.share = share({
    mzAPI: ENV.mzAPI,
    wxAPI: ENV.WXCore,
    defaultShare: INFO.share,
    sessionTokenName: CONST.STORAGE_PREFIX + 'token'
  });

  $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
  $rootScope.$on('$stateChangeStart', stateChangeStart);
  $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

  function locationChangeSuccess(){
    $rootScope.share.signature();
  }

  function stateChangeStart(e) {

    // 页面切换前自动将body样式重置

    $rootScope.bodyStyle = {};

    // 跳转页面前关闭 dialog

    $('.ui-dialog').remove();

    // 设置默认分享

    $rootScope.share.revertDefault();

    // 添加监听

    ikngHistory.listenToChangeStart(e);
  }

  function stateChangeSuccess(){
    // 统计

    TAPP();

    // 添加监听

    ikngHistory.listenToChangeSuccess();
  }
}

