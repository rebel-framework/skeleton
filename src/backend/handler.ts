import { Request, Response, Context, errorHandler } from '@rebel/core';

import router from './routes';

/**
 * Mono lambda handler for the whole project.
 * Comes with error handling out of the box.
 *
 * @param {Request} request
 * @param {Context} context
 * @returns {Response}
 */
export async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  try {
    return await router.handle(request, context);
  } catch (error) {
    return errorHandler(error);
  }
}
