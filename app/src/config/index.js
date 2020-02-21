import { config } from 'dotenv';

const env = {
  development: '.env.dev',
  production: '.env',
  test: '.env.test'
};

config({ path: env[process.env.NODE_ENV] });
