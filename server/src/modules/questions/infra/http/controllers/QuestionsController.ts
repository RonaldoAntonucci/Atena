import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateQuestionService from '@modules/questions/services/CreateQuestionService';

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, text } = request.body;

    const createQuestion = container.resolve(CreateQuestionService);

    const question = await createQuestion.run({ title, text });

    return response.json(question);
  }
}
