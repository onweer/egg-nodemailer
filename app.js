'use strict';

const nodemailer = require('./lib/nodemailer');

module.exports = app => {
  if (app.config.nodemailer) nodemailer(app);
};
