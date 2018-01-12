'use strict';
const assert = require('assert');
const nodemailer = require('nodemailer');

module.exports = app => {
  app.addSingleton('nodemailer', createNodemailer);
};

/**
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 Nodemailer 实例
 */
function createNodemailer(config, app) {
  assert(config.host && config.port && config.auth.user && config.auth.pass,
    `[egg-nodemailer] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.auth.user}', 'pass: ${config.auth.pass}' are required on config`);
  const transporter = nodemailer.createTransport(config);
  app.beforeStart(function* () {
    app.coreLogger.info('[egg-nodemailer] status OK');
  });
  return transporter;
}