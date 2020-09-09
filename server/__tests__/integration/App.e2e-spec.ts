import request from 'supertest';

import Server from 'shared/infra/http/server';
import Routes from 'shared/infra/http/routes/index.routes';

describe('App Test', () => {
  let app: Server;

  beforeAll(async () => {
    app = new Server({ routes: Routes });
  });

  it('should be return code 200', async () => {
    const response = await request(app.getServer()).get('/');

    expect(response.status).toBe(200);
  });
});
