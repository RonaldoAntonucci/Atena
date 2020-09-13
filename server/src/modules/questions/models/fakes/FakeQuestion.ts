import Chance from 'chance';

import Question from '../QuestionModel';

const chance = new Chance();

export default (attrs: Partial<Question> = {}): Question => ({
  title: chance.string({ length: 40 }),

  text: chance.string({ length: 400 }),

  ...attrs,
});
