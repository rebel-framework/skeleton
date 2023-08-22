import { Context, Handler, Middleware, Request } from '@rebel-framework/router';

export async function log(
  request: Request,
  context: Context,
  next: Handler
): Promise<any> {
  console.log(`Received ${request.method} request to ${request.path}`);
  return await next(request, context);
}
