// TODO: Implement routing system
// app.get('/signin', () => {});
import hello from './controllers/hello';

import * as router from '@rebel/core/router';

router.get('/hello', hello);

router.post('/store', (request) => {
  console.log(request);
});

export default router;
