import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(3).max(40).required(),
      text: Joi.string().max(400).min(7).required(),
    },
  });
