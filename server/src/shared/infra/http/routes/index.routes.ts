import { Router } from 'express';

import { QuestionsRouter } from 'modules/questions';

const routes = Router();

routes.use('/questions', QuestionsRouter);

export default routes;
