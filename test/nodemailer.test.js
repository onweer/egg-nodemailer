'use strict';

const mock = require('egg-mock');

describe('test/nodemailer.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/nodemailer-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, nodemailer')
      .expect(200);
  });
});
