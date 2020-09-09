import ICreateQuestionDTO from '../dto/ICreateQuestionDTO';
import IQuestion from '../models/IQuestion';

export default interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<IQuestion>;
}
