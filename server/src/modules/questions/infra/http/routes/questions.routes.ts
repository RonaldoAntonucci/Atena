import { Router } from 'express';

import IQuestion from '@modules/questions/models/IQuestion';

const questionsRouter = Router();

questionsRouter.post('/', (request, response) => {
  const { title, text } = request.body;

  const question: IQuestion = { id: 'id', title, text };

  return response.json(question);
});

export default questionsRouter;
