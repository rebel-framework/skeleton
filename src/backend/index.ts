import router from './routes';

console.log('hello', router.routes);

const response = router.handleRequest({
  method: 'GET',
  path: '/hello',
});

console.log(response);
