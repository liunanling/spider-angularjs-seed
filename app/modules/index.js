'use strict';

document.addEventListener('touchstart', function () {}, false);

// common css

require('@spider/frozenui');
require('swiper/dist/css/swiper');
require('/styls/base/reset.styl');
require('/styls/component/animate.styl');
require('/styls/component/icons.styl');
require('/styls/base/base.styl');

// common js

require('@spider/zepto');
require('@spider/zepto/src/event');
require('@spider/zepto/src/ajax');
require('@spider/zepto/src/touch');
require('@spider/zepto/src/deferred');
require('@spider/zepto/src/callbacks');
require('swiper');
require('@spider/frozenui/js/frozen');
require('fastclick')(document.body);
require('angular');
require('angular-filter');
require('angular-ui-router');
require('@spider/angular-lazy-img');
require('angular-cache');
require('angular-swiper');
require('@spider/restangular');
require('ngstorage');
require('@spider/ikngLoadingBar');
require('@spider/ikngAliImg');
require('@spider/ikngHistory');

// 异常监控

require('raven-js')
  .config(require('./config/constant').SENTRY_DSN, {
    release: require('./config/constant').VERSION,
    whitelistUrls: [/https?:\/\/h5\.inkey\.com/]
  })
  .addPlugin(require('raven-js/plugins/angular'), angular)
  .install();

angular
  .module('ink', ['ngRaven', 'ksSwiper', 'ui.router', 'angularLazyImg', 'ngStorage', 'ik.ngLoadingBar', 'restangular', 'angular-cache', 'ik.ngAliImg', 'angular.filter', 'ik.ngHistory'])
  .constant('INFO', require('./config/info'))
  .constant('ENV', require('./config/env')[window.H5_ENV || 'develop'])
  .constant('CONST', require('./config/constant'));

// modules

require('./services/pack');
require('./services/api');
require('./services/interceptor');
require('./services/router');
require('./services/services');
require('./services/cache');

require('./components/header');

require('./directives/directive');

require('./filters/filter');

// 入口

require('./app');
