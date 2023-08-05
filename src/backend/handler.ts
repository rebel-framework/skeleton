import { Request, Context } from '@rebel/core';

import router from './routes';

export async function handler(request: Request, context: Context) {
  console.log('ROUTES: \\n' + JSON.stringify(router.routes, null, 2));
  console.log('REQUEST: \\n' + JSON.stringify(request, null, 2));
  console.log('CONTEXT: \\n' + JSON.stringify(context, null, 2));

  return await router.handle(request, context);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
}
