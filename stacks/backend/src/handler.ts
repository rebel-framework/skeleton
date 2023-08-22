import { Request, Context } from '@rebel-framework/router';
import { Response } from '@rebel-framework/response';

import router from './routes';
import { errorHandler } from './errors';

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
    return (await router.handle(request, context)) as Response;
  } catch (error) {
    return errorHandler(error);
  }
}
