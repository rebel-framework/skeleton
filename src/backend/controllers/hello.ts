import { Context, Request, Response, response } from '@rebel/core';

export default async function hello(
  request: Request,
  context: Context
): Promise<Response> {
  console.log('HELLO');

  return response(200, { message: 'Hello from Lambda!' });
}
