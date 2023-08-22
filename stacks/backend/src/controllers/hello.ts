import { Context, Request } from '@rebel-framework/router';
import { Response, response } from '@rebel-framework/response';

export default async function hello(
  request: Request,
  context: Context
): Promise<Response> {
  console.log('HELLO');

  return response(200, { message: 'Hello from Lambda!' });
}
