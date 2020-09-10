import ICreateQuestionDTO from '@modules/questions/dto/ICreateQuestionDTO';
import Question from '@modules/questions/models/QuestionModel';
import IQuestionsRepository from '../IQuestionsRepository';

export default class FakeQuestionsRepository implements IQuestionsRepository {
  public async findByTitle(): Promise<Question | undefined> {
    return undefined;
  }

  public async create(data: ICreateQuestionDTO): Promise<Question> {
    const question = new Question();

    Object.assign(question, data);

    return question;
  }
}
