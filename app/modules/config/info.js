'use strict';

/** @namespace INFO */

module.exports = {

  /**
   * 项目名
   * @type {String}
   * @memberof INFO
   */

  appName: '',

  /**
   * 分享配置
   * @type {Object}
   * @memberof INFO
   * @example
   * // 具体配置看 http://gitlab.it.inkey.com/spider/share
   */

  share: {
    byContent: {
      content: {
        desc: '我是描述',
        title: '我是标题',
        link: 'http://baidu.com?a=1',
        imgUrl: 'http://img.inkey.com/oper/business/2015/1021/15/90d5520a-def5-c180-7b64-08d2d9e82c6d?_t=20151021152101453'
      },
      log: {
        RefType: 16, // 活动分享
        Key: '4734d1b3-6f40-8bb5-478a-f689e0fbc21e', // 活动ID
        RefId: '4734d1b3-6f40-8bb5-478a-f689e0fbc21e', // 活动ID
        RefCode: 0, // 活动编号, 没有为0
        RefName: '22' // 活动名称
      }
    }
  }
};
