'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikHeader', ikHeader);

/**
 * 全局header指令
 * @name ikHeader
 * @memberof components#
 * @example
 * &lt;ik-header>&lt;/ik-header>
 * &lt;ik-header data-title="标题"
 *               right-name="右标题"
 *               right-class="类"
 *               left-action="动作"
 *               right-action="动作"
 *               hide-left="true"
 *               hide-right="true">&lt;/ik-header>
 */

function ikHeader(INFO, $rootScope, ENV, ikngHistory, $state, $q) {

  return {
    template: __inline('./index.html'),
    replace : true,
    restrict: 'E',
    link    : link,
    scope   : {
      'title'      : '@',
      'rightName'  : '@',
      'leftAction' : '&',
      'rightAction': '&',
      'hideLeft'   : '@',
      'hideRight'  : '@',
      'rightClass' : '@'
    }
  };

  function link(scope, ele, attr) {
    var tmp = scope.leftAction;
    var defaultPageName;

    // 不是微信打开 并且 非DEBUG
    // 移除顶部导航

    if (!$rootScope.isWeixin && !ENV.debug) {
      return $(ele[0]).remove();
    }

    try{
      defaultPageName = $state.$current.data.pageName || INFO.appName;
    }catch(e){
      defaultPageName = INFO.appName;
    }

    scope.title      = attr.title || defaultPageName;
    scope.leftAction = function () {
      $q.when(tmp()).then(function(){
        ikngHistory.back();
      });
    };
  }
}
