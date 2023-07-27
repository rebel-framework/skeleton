import hello from './controllers/hello';

import { useRouter, Middleware } from '@rebel/core';

const logMiddleware: Middleware = async (request, next) => {
  console.log(`Received ${request.method} request to ${request.path}`);
  // Call the next middleware or main route handler
  return await next(request);
};

const dummyMiddleware: Middleware = async (request, next) => {
  console.log(`Dummy Middleware`);
  // Call the next middleware or main route handler
  return await next(request);
};

const middleware: Middleware[] = [logMiddleware, dummyMiddleware];

const router = useRouter();

router.get('/hello', hello, middleware);

router.post(
  '/store/:id',
  async ({ request }) => {
    return {
      code: 200,
      message: 'Success',
    };
  },
  middleware
);

router.get('/article/:id', async (args) => args, middleware);

export default router;
