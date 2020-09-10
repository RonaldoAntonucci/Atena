import './container';

import AppError from 'shared/errors/AppError';

import QuestionsRouter from './infra/http/routes/questions.routes';
import FakeQuestion from './models/fakes/FakeQuestion';

const ServiceError = AppError;

export { QuestionsRouter, FakeQuestion, ServiceError };
