import hello from './controllers/hello';

import { createRouter, Middleware } from '@rebel/core';

const logMiddleware: Middleware = async (request, next) => {
  console.log(`Received ${request.method} request to ${request.path}`);
  // Call the next middleware or main route handler
  return await next();
};

const dummyMiddleware: Middleware = async (request, next) => {
  console.log(`Dummy Middleware`);
  // Call the next middleware or main route handler
  return await next();
};

const middleware: Middleware[] = [logMiddleware, dummyMiddleware];

const router = createRouter();

router.get('/hello', hello, middleware);

router.post(
  '/store',
  async ({ request }) => {
    return {
      code: 200,
      message: 'Success',
    };
  },
  middleware
);

router.get('/article/{id}', async ({ id }) => console.log('Deleting', id));

export default router;
