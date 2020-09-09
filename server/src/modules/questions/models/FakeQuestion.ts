import { uuid } from 'uuidv4';
import Chance from 'chance';

import IQuestion from './IQuestion';

const chance = new Chance();

export default (attrs: Partial<IQuestion> = {}): IQuestion => ({
  id: uuid(),

  title: chance.string({ length: 40 }),

  text: chance.string({ length: 400 }),
  ...attrs,
});
