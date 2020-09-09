import request from 'supertest';

import Server from 'shared/infra/http/server';
import { QuestionsRouter, FakeQuestion } from 'modules/questions';

describe('Create Questions - e2e', () => {
  let app: Server;

  beforeAll(async () => {
    app = new Server({ routes: QuestionsRouter });
  });

  it('should be able to create a Question', async () => {
    const questionAttrs = FakeQuestion({ id: '1' });

    const response = await request(app.getServer())
      .post('/')
      .send(questionAttrs);

    expect(response.status).toBe(200);
    const newQuestion = response.body;

    expect(newQuestion).toHaveProperty('id');
    expect(newQuestion).toHaveProperty('title', questionAttrs.title);
    expect(newQuestion).toHaveProperty('text', questionAttrs.text);
  });
});
