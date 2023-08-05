import { Request, Context, errorHandler } from '@rebel/core';

import router from './routes';

export async function handler(request: Request, context: Context) {
  try {
    return await router.handle(request, context);
  } catch (error) {
    return errorHandler(error);
  }
}
