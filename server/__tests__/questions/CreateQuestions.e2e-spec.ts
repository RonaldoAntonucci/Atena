import 'express-async-errors';
import request from 'supertest';
import { Repository, getRepository } from 'typeorm';

import { QuestionsRouter, FakeQuestion } from 'modules/questions';
import Question from '@modules/questions/infra/typeorm/entities/Question';
import App from '../util/TestApp';

describe('Create Questions - e2e', () => {
  let app: App;
  let questionsRepo: Repository<Question>;

  beforeAll(async () => {
    app = new App();
    await app.start({ routes: QuestionsRouter });

    questionsRepo = getRepository(Question);
  });

  it('should be able to create a Question. - e2e', async () => {
    const questionAttrs = FakeQuestion();

    const response = await request(app.http())
      .post('/')
      .send({ title: questionAttrs.title, text: questionAttrs.text });

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

  it('should not be able to create new Questions with used title. - e2e', async () => {
    const existentQuestion = questionsRepo.create(FakeQuestion());
    await questionsRepo.save(existentQuestion);

    const response = await request(app.http())
      .post('/')
      .send({ title: existentQuestion.title, text: 'new text' });

    expect(response.status).toBe(400);
    const { body } = response;

    expect(body).toHaveProperty('status', 'error');
    expect(body).toHaveProperty('message', 'This title already in use.');
  });

  beforeEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
