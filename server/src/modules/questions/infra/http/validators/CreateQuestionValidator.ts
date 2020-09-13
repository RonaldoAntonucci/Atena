import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      text: Joi.string().max(400).min(7).required(),
    },
  });
