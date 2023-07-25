type Controller = any;
type Response = any;
type Request = any;

export default async (request): Promise<Response> => {
  console.log('hello route handler!', { request });

  return {
    code: 200,
    message: 'Success',
  };
};
