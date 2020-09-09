import request from 'supertest';
import { Repository, getRepository } from 'typeorm';

import Server from 'shared/infra/http/server';
import { QuestionsRouter, FakeQuestion } from 'modules/questions';
import Question from '@modules/questions/infra/typeorm/entities/Question';
import Database from '../util/Database';

describe('Create Questions - e2e', () => {
  let app: Server;
  let db: Database;
  let questionsRepo: Repository<Question>;

  beforeAll(async () => {
    db = new Database();
    await db.start();
    questionsRepo = getRepository('Question');

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

    const persistedQuestion = await questionsRepo.findOne(newQuestion.id);
    expect(persistedQuestion).toHaveProperty('id', newQuestion.id);
    expect(persistedQuestion).toHaveProperty(
      'createdAt',
      new Date(newQuestion.createdAt),
    );
    expect(persistedQuestion).toHaveProperty(
      'updatedAt',
      new Date(newQuestion.updatedAt),
    );
    expect(persistedQuestion).toHaveProperty('title', newQuestion.title);
    expect(persistedQuestion).toHaveProperty('text', newQuestion.text);
  });

  afterAll(async () => {
    await db.truncate();
    await db.stop();
  });
});
