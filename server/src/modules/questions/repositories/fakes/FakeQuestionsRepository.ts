import ICreateQuestionDTO from '@modules/questions/dto/ICreateQuestionDTO';
import IQuestion from '@modules/questions/models/IQuestion';
import IQuestionsRepository from '../IQuestionsRepository';

export default class FakeQuestionsRepository implements IQuestionsRepository {
  public async create(data: ICreateQuestionDTO): Promise<IQuestion> {
    const question: IQuestion = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: new Date().getTime().toString(),
    };

    return question;
  }
}
