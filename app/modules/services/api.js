'use strict';

/** @namespace services.api */

angular
  .module('ink')
  .factory('WXBaseAPI', WXBaseAPI)
  .factory('MZBaseAPI', MZBaseAPI)
  .factory('ActiveBaseAPI', ActiveBaseAPI)
  .factory('WXCoreAPI', WXCoreAPI);


function WXCoreAPI(WXBaseAPI) {
  return WXBaseAPI.service('WXCore');
}

/**
 * 秒赚基础API
 * @name MZBaseAPI
 * @memberof services.api#
 */

function MZBaseAPI(Restangular, getCommonHeader, ENV) {

  return Restangular.withConfig(function (restangularConfig) {
    restangularConfig.setBaseUrl(ENV.mzAPI);

    if(ENV.enableCookie){

      // 增加对cookie传递的支持

      restangularConfig.setDefaultHttpFields({ withCredentials: true });

      restangularConfig.setDefaultHeaders(getCommonHeader());
    }
  });
}

/**
 * 活动基础API
 * @name ActiveBaseAPI
 * @memberof services.api#
 */

function ActiveBaseAPI(Restangular, ENV) {

  return Restangular.withConfig(function (restangularConfig) {
    restangularConfig.setBaseUrl(ENV.activeAPI);
  });

}

/**
 * 微信基础API
 * @name WXBaseAPI
 * @memberof services.api#
 */

function WXBaseAPI(Restangular, ENV) {

  return Restangular.withConfig(function (restangularConfig) {
    restangularConfig.setBaseUrl(ENV.WXCore);
  });

}
