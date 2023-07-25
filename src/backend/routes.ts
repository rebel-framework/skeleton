import hello from './controllers/hello';

import { router, Middleware } from '@rebel/core';

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

export default router;
