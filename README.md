# egg-nodemailer

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-nodemailer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-nodemailer
[travis-image]: https://img.shields.io/travis/eggjs/egg-nodemailer.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-nodemailer
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-nodemailer.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-nodemailer?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-nodemailer.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-nodemailer
[snyk-image]: https://snyk.io/test/npm/egg-nodemailer/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-nodemailer
[download-image]: https://img.shields.io/npm/dm/egg-nodemailer.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-nodemailer

<!--
Description here.
-->

## Install

```bash
$ npm i egg-nodemailer --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.nodemailer = {
  enable: true,
  package: 'egg-nodemailer-extra',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.nodemailer = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```
// app/config/config.default.js
module.exports = appInfo => {
  const config = exports = {};

  config.nodemailer = {
    host: 'smtp.exmail.qq.com', // your email smtp server
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'example@qq.com', // generated ethereal user
      pass: 'password', // generated ethereal password
    },
  };
  return config;
};



// app.js
module.exports = app => {
  app.transporter = app.nodemailer.create(app.config.nodemailer, app);
};


// controller/post.js
const Controller = require('egg').Controller;
class PostController extends Controller {
  async create() {
    const { app } = this;
    let mailOptions = {
      from: 'example@qq.com', // sender address
      to: 'youremail@qq.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };
    
   app.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      ctx.body = info;
      ctx.status = 200;
    });
    
   
  }
}
module.exports = PostController;


```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
