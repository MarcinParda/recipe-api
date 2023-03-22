import * as Joi from 'joi';

export const envValidationConfig = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_USER: Joi.string().required(),

  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
