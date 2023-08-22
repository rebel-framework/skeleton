import hello from './controllers/hello';

import { useRouter, Middleware } from '@rebel-framework/router';

import { log } from './middleware/log';

const middleware: Middleware[] = [log];

const router = useRouter();

router.get('/hello', hello, middleware);

router.post(
  '/store/:id',
  async ({ request, context }) => {
    return {
      code: 200,
      message: 'Success',
    };
  },
  middleware
);

router.get('/article/:id', async (args) => args, middleware);

export default router;
