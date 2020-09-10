import { v4 as uuidv4 } from 'uuid';
import Chance from 'chance';

import Question from '../QuestionModel';

const chance = new Chance();

export default (attrs: Partial<Question> = {}): Question => ({
  id: uuidv4(),

  title: chance.string({ length: 40 }),

  text: chance.string({ length: 400 }),

  updatedAt: new Date(),

  createdAt: new Date(),
  ...attrs,
});
