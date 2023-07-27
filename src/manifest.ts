import { env, Manifest } from '@rebel/core';

const manifest: Manifest = {
  name: env('NAME', 'Example'),
  domain: env('DOMAIN', 'example.com'),
  environment: env('ENVIRONMENT', 'local'),
  debug: env('DEBUG', true),
  aws: {
    key: env('AWS_KEY'),
    secret: env('AWS_SECRET'),
    region: env('AWS_REGION', 'eu-west-1'),
  },
  database: {
    softDeletes: env('DATABASE_SOFT_DELETES', true),
  },
};

export default manifest;
