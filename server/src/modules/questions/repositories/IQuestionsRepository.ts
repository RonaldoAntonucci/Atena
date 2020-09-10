import ICreateQuestionDTO from '../dto/ICreateQuestionDTO';
import Question from '../models/QuestionModel';

export default interface IQuestionsRepository {
  findByTitle(title: string): Promise<Question | undefined>;

  create(data: ICreateQuestionDTO): Promise<Question>;
}
