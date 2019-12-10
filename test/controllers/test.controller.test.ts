import request from 'supertest';
import { App } from '../../src/app';
import { Application } from 'express';

describe('Test /test', () => {
  let app: Application;

  beforeAll(async () => {
    const application = new App();
    await application.listen();
    app = application.getApp();
  });

  it('test controller', async () => {
    const res = await request(app).get('/test');
    expect(res.text).toBe('Test!');
  }, 10000);
});