import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('dev', 'pdn', 'local')
    .default('local'),
  PORT: Joi.number().default(3000),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
});
