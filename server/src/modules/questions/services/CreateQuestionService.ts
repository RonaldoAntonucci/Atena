import { inject, injectable } from 'tsyringe';
import IQuestionsRepository from '../repositories/IQuestionsRepository';
import IQuestion from '../models/IQuestion';

interface IRequestDTO {
  title: string;
  text: string;
}

@injectable()
export default class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async run({ title, text }: IRequestDTO): Promise<IQuestion> {
    const question = await this.questionsRepository.create({ title, text });

    return question;
  }
}
