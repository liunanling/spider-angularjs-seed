'use strict';

/** @namespace services */

var InkeyMZ = require('@spider/inkeyjs/lib/mz');

angular
  .module('ink')
  .factory('login', login)
  .factory('safeApply', safeApply)
  .factory('saveToken', saveToken)
  .factory('TAPP', TAPP);

/**
 * 数据统计服务
 * @name TAPP
 * @param  {String} label 标签名
 * @memberof services#
 * @function
 * @example
 * TAPP('标签名')
 */

function TAPP(INFO, $state) {
  var tdapp = window._czc || {push: angular.noop};

  return function (label) {
    var d = $state.current.data || {pageName: ''};

    var eventId = INFO.appName + d.pageName;

    if (label) {
      tdapp.push(['_trackEvent', eventId, label]);
    } else {
      tdapp.push(['_trackEvent', eventId]);
    }
  }
}

/**
 * 设置token, 不存在就登录
 * @name saveToken
 * @memberof services#
 * @function
 */

function saveToken($sessionStorage, $location, login, cookies, ENV, CONST) {
  return function () {
    var token = $location.search().token || $sessionStorage.token || cookies('token');

    if (token) {
      if(ENV.enableCookie){
        cookies('token', token, {
          domain: '.inkey.com',
          expires: CONST.COOKIES_EXPIRES * 60
        });
      }else{
        $sessionStorage.token = token;
      }
    } else {
      login();
    }
  }
}

/**
 * 登录
 * @name login
 * @memberof services#
 * @function
 */

function login(CONST, redirect, $location, param, $rootScope, dialog, currentUrl, ENV, $state, $timeout) {

  $rootScope.$on(CONST.RES_STATUS['401'], main);

  return main;

  function main(){

    var timer = $timeout(function(){
      $timeout.cancel(timer);
      try{

        // 如果当前页面没有定义publicState, 那么默认该值为false

        _.defaults($state.$current.data, {
          publicState: false
        });

      }catch(e){
        _.defaults($state.$current, {
          data:{
            publicState: false
          }
        });
      }

      // 如果当前页面是公共页面, 则不执行登录

      if($state.$current.data.publicState){
        return false;
      }else{
        _login();
      }

    }, 0, false);
  }

  function _login(){

    var search;

    if (!ENV.debug && !$rootScope.isWeixin) {

      // 直接关闭WebView

      try{
        InkeyMZ.closeWebView();
      }catch(e){
        dialog({
          title:'提示',
          content:'关闭窗口失败, 当前非APP环境'
        });
      }

      return false;
    }

    search = $location.search();

    currentUrl = currentUrl.split('?')[0];

    // 删除当前url上的token 防止授权回来存在多个token

    delete search.token;

    // 当url存在其它参数时重新拼接url参数
    if(!_.isEmpty(search)){
      currentUrl = currentUrl + '?' + param(search);
    }

    redirect(ENV.LoginUrl + currentUrl);
  }
}

/**
 * 更新绑定
 * @name safeApply
 * @memberof services#
 * @function
 */

function safeApply($rootScope) {
  return function (fn, scope) {
    scope = scope ? scope : $rootScope;
    fn    = angular.isFunction(fn) ? fn : angular.noop;
    if (scope.$$phase === '$apply' || scope.$$phase === '$digest') {
      fn();
    } else {
      scope.$apply(fn);
    }
  };
}
