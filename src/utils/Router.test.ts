import { expect } from 'chai';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  const router = new Router('.app');

  class HomePage extends Block {}
  class AboutPage extends Block {}
  class InfoPage extends Block {}

  router
    .use('/', HomePage)
    .use('/about', AboutPage)
    .use('/info', InfoPage)
    .start();

  it('Change route', () => {
    router.go('/');
    router.go('/about');
    expect(router.history.length).to.eq(3);
  });

  it('Get pathname', () => {
    router.go('/info');
    const { pathname } = router.currentRoute || {};
    expect(pathname).to.eq('/info');
  });
});
