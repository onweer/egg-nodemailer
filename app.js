'use strict';
const nodemailer = require('nodemailer');

module.exports = app => {
  app.addSingleton('nodemailer', createNodemailer);
};

/**
 * @param  {Object} config   框架处理之后的配置项，如果应用配置了多个 MySQL 实例，会将每一个配置项分别传入并调用多次 createMysql
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 MySQL 实例
 */
function createNodemailer(config, app) {
  const { host, port = 587, secure = false, auth } = config;
  if (!host) {
    throw new Error('configure must require a host');
  }
  if (!auth) {
    throw new Error('configure must require a auth');
  }
  // 创建实例
  const client = new Mysql(config);

  // 做启动应用前的检查
  app.beforeStart(async function startMysql() {
    const rows = await client.query('select now() as currentTime;');
    const index = count++;
    app.coreLogger.info(`[egg-mysql] instance[${index}] status OK, rds currentTime: ${rows[0].currentTime}`);
  });

  return client;
}