'use strict';

/** @namespace ENV */

module.exports = {
  develop: {

    /**
     * debug模式
     * @type {Boolean}
     * @memberof ENV
     */

    debug: true,

    /**
     * 是否启用cookie模式
     * @type {Boolean}
     * @memberof ENV
     */

    enableCookie: false,

    /**
     * 活动API地址
     * @type {String}
     * @memberof ENV
     */

    activeAPI: 'http://172.16.0.201:7000/m/',

    /**
     * 秒赚API地址
     * @type {String}
     * @memberof ENV
     */

    mzAPI: 'http://192.168.0.201:8421/api/',

    /**
     * 微信API地址
     * @type {String}
     * @memberof ENV
     */

    WXCore: 'http://weixin.test.inkey.com/',

    /**
     * 前端项目地址
     * @type {String}
     * @memberof ENV
     */

    h5: 'http://h5.test.inkey.com/',

    /**
     * 微信支付地址
     * @type {String}
     * @memberof ENV
     */

    WXPayment: 'http://weixin.test.inkey.com/weixinPay/index.html',

    /**
     * 授权地址
     * @type {String}
     * @memberof ENV
     */

    LoginUrl: 'http://172.16.0.201:7010/user/getCode?port=8421&uname=13990004001&pwd=123456&state='
  },
  test: {
    debug: false,
    enableCookie: false,
    activeAPI: 'http://192.168.0.201:8403/api/',
    mzAPI: 'http://192.168.0.201:8421/api/',
    WXCore: 'http://weixin.test.inkey.com/',
    h5: 'http://h5.test.inkey.com/',
    WXPayment: 'http://weixin.test.inkey.com/weixinPay/index.html',
    LoginUrl: 'http://weixin.test.inkey.com/WXCore/Entry?redirect_uri='
  },
  prepare: {
    debug: false,
    enableCookie: true,
    activeAPI: 'http://acti.ready.inkey.com/api/',
    mzAPI: 'http://mzapi.ready.inkey.com/api/',
    WXCore: 'http://mzmp.ready.inkey.com/',
    h5: 'http://h5.ready.inkey.com/',
    WXPayment: 'http://mzmp.ready.inkey.com/weixinPay/index.html',
    LoginUrl: 'http://mzmp.ready.inkey.com/WXCore/Entry?redirect_uri='
  },
  production: {
    debug: false,
    enableCookie: true,
    activeAPI: 'https://acti.inkey.com/api/',
    mzAPI: 'https://mzapi.inkey.com/api/',
    WXCore: 'https://mzmp.inkey.com/',
    h5: 'https://h5.inkey.com/',
    WXPayment: 'https://h5.inkey.com/platforms/weixinPay/index.html',
    LoginUrl: 'https://mzmp.inkey.com/WXCore/Entry?redirect_uri='
  }
};
