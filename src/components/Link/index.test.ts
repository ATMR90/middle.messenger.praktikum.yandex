import { Link } from './index';
import { expect } from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {
  it('should render', () => {
    new Link({ to: '/' });
  });

  it('element should return div', () => {
    const link = new Link({ to: '/' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLDivElement)
  });

  it('should go to passed route on click', () => {
    // const newRouter = new Router('#app');
    // newRouter.go = sinon.fake();
    // const oldGo = newRouter.go;

    const newRouter = new Router('#app');

    const link = new Link({ to: '/' });
    const spy = sinon.spy(newRouter, 'go');
    const element = link.element as HTMLDivElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);

    // newRouter.go = oldGo;
  });
});