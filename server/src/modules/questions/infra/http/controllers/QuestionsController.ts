import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Question from '../../typeorm/entities/Question';

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, text } = request.body;

    const repo = getRepository(Question);

    const question = repo.create({ title, text });
    await repo.save(question);

    return response.json(question);
  }
}
