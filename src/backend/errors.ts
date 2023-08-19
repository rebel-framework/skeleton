import { response } from '@rebel-framework/response';
import { MethodNotAllowedError, NotFoundError } from '@rebel-framework/router';

export function errorHandler(error: Error) {
  console.error(error);

  if (error instanceof MethodNotAllowedError) {
    return response(405, {
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return response(404, {
      message: error.message,
    });
  }

  // Fallback for unknown errors
  return response(500, {
    message: 'Internal Server Error',
  });
}
