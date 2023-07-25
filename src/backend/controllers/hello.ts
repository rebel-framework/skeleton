type Controller = any;
type Response = any;
type Request = any;

export default (request): Response => {
  console.log('hello route handler!', { request });

  return {
    code: 200,
    message: 'Success',
  };
};
