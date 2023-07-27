import router from './routes';

const backend = async () => {
  const responseFromHello = await router.handleRequest({
    method: 'GET',
    path: '/hello',
  });

  console.log('Response from /hello', responseFromHello);

  const responseFromStore = await router.handleRequest({
    method: 'POST',
    path: '/store/789',
  });

  console.log('Response from /store', responseFromStore);

  const responseFromArticle = await router.handleRequest({
    method: 'GET',
    path: '/article/1234',
  });

  console.log('Response from /article', responseFromArticle);
};

backend();
