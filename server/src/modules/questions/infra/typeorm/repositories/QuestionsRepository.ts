import { getRepository, Repository } from 'typeorm';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import ICreateQuestionDTO from '@modules/questions/dto/ICreateQuestionDTO';
import Question from '../entities/Question';

export default class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public async findByTitle(title: string): Promise<Question | undefined> {
    const question = this.ormRepository.findOne({ title });

    return question;
  }

  public async create({ title, text }: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create({ title, text });

    await this.ormRepository.save(question);

    return question;
  }
}
