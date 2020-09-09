import request from 'supertest';

import Server from 'shared/infra/http/server';
import { QuestionsRouter, FakeQuestion } from 'modules/questions';
import Database from '../util/Database';

describe('Create Questions - e2e', () => {
  let app: Server;
  let db: Database;

  beforeAll(async () => {
    db = new Database();
    await db.start();

    app = new Server({ routes: QuestionsRouter });
  });

  it('should be able to create a Question', async () => {
    const questionAttrs = FakeQuestion();

    const response = await request(app.getServer())
      .post('/')
      .send(questionAttrs);

    expect(response.status).toBe(200);
    const newQuestion = response.body;

    expect(newQuestion).toHaveProperty('id');
    expect(newQuestion).toHaveProperty('createdAt');
    expect(newQuestion).toHaveProperty('updatedAt');
    expect(newQuestion).toHaveProperty('title', questionAttrs.title);
    expect(newQuestion).toHaveProperty('text', questionAttrs.text);
  });

  afterAll(async () => {
    await db.truncate();
    await db.stop();
  });
});
