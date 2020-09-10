import { inject, injectable } from 'tsyringe';

import { ServiceError } from 'modules/questions';
import IQuestionsRepository from '../repositories/IQuestionsRepository';
import Question from '../models/QuestionModel';

interface IRequestDTO {
  title: string;
  text: string;
}

@injectable()
export default class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) {}

  public async run({ title, text }: IRequestDTO): Promise<Question> {
    const checkTitleUsed = await this.questionsRepository.findByTitle(title);

    if (checkTitleUsed) {
      throw new ServiceError('This title already in use.');
    }

    const question = await this.questionsRepository.create({ title, text });

    return question;
  }
}
