import { env, Config } from '@rebel/core';

export const config: Config = {
  app: {
    // Define any project-specific properties here
  },
  name: env('NAME', 'Example'),
  domain: env('DOMAIN', 'example.com'),
  environment: env('ENVIRONMENT', 'dev'),
  debug: env('DEBUG', true),
  aws: {
    key: env('AWS_KEY', ''),
    secret: env('AWS_SECRET', ''),
    region: env('AWS_REGION', 'eu-west-1'),
  },
  database: {
    softDeletes: env('DATABASE_SOFT_DELETES', true),
  },
};

export default config;
