import { Request, Response } from 'express';

import Question from '../../../models/FakeQuestion';

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, text } = request.body;

    const question = Question({ title, text });

    return response.json(question);
  }
}
