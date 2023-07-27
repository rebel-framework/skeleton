import routes from './routes';

const backend = async () => {
  const responseFromHello = await routes.handleRequest({
    method: 'GET',
    path: '/hello',
  });

  console.log('Response from /hello', responseFromHello);

  const responseFromStore = await routes.handleRequest({
    method: 'POST',
    path: '/store/789',
  });

  console.log('Response from /store', responseFromStore);

  const responseFromArticle = await routes.handleRequest({
    method: 'GET',
    path: '/article/1234',
  });

  console.log('Response from /article', responseFromArticle);
};

backend();
