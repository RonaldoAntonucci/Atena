import { container } from 'tsyringe';

import IQuestionsRepository from './repositories/IQuestionsRepository';
import QuestionsRepository from './infra/typeorm/repositories/QuestionsRepository';

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository,
);
