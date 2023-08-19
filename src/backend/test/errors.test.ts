import { errorHandler } from '../errors';
import { MethodNotAllowedError, NotFoundError } from '@rebel-framework/router';
import { response } from '@rebel-framework/response';

describe('Error handler', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('should handle NotFoundError', () => {
    const error = new NotFoundError();
    const res = errorHandler(error);

    expect(errorSpy).toHaveBeenCalledWith(error);
    expect(res).toEqual(response(404, { message: error.message }));
  });

  it('should handle MethodNotAllowedError', () => {
    const error = new MethodNotAllowedError();
    const res = errorHandler(error);

    expect(errorSpy).toHaveBeenCalledWith(error);
    expect(res).toEqual(response(405, { message: error.message }));
  });

  it('should handle unknown errors', () => {
    const error = new Error('Unknown error');
    const res = errorHandler(error);

    expect(errorSpy).toHaveBeenCalledWith(error);
    expect(res).toEqual(response(500, { message: 'Internal Server Error' }));
  });
});
