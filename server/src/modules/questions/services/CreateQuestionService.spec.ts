import 'reflect-metadata';

import CreateQuestionService from './CreateQuestionService';
import FakeQuestionsRepository from '../repositories/fakes/FakeQuestionsRepository';
import Question from '../models/QuestionModel';
import FakeQuestion from '../models/fakes/FakeQuestion';
import { ServiceError } from '..';

describe('Create Question', () => {
  let service: CreateQuestionService;
  let repo: FakeQuestionsRepository;

  let createQuestion: jest.SpyInstance;
  let checkTitle: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeQuestionsRepository();
    service = new CreateQuestionService(repo);

    createQuestion = jest.spyOn(repo, 'create');
    checkTitle = jest.spyOn(repo, 'findByTitle');
  });

  it('should be able to create a new Question', async () => {
    const questionData = FakeQuestion();

    const newQuestion = await service.run(questionData);

    expect(createQuestion).toBeCalledWith({
      title: questionData.title,
      text: questionData.text,
    });

    expect(newQuestion).toBeInstanceOf(Question);
  });

  it('should not able to create a Question with used name.', async () => {
    const questionData = FakeQuestion();

    checkTitle.mockImplementation(async () => {
      return new Question();
    });

    await expect(service.run(questionData)).rejects.toEqual(
      new ServiceError('This title already in use.'),
    );

    expect(checkTitle).toBeCalledWith(questionData.title);
    expect(createQuestion).not.toBeCalled();
  });
});
