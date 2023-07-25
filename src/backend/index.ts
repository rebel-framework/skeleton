import router from './routes';

const backend = async () => {
  const responseFromHello = await router.handleRequest({
    method: 'GET',
    path: '/hello',
  });

  console.log('Response from /hello', responseFromHello);

  const responseFromStore = await router.handleRequest({
    method: 'POST',
    path: '/store',
  });

  console.log('Response from /store', responseFromStore);
};

backend();
