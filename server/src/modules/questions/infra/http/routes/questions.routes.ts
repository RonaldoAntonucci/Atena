import { Router } from 'express';

import QuestionsController from '../controllers/QuestionsController';

import CreateQuestionValidator from '../validators/CreateQuestionValidator';

const questionsRouter = Router();

const questionsController = new QuestionsController();

questionsRouter.post(
  '/',
  CreateQuestionValidator(),
  questionsController.create,
);

export default questionsRouter;
