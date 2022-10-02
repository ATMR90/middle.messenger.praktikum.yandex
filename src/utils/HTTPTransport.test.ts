import { HTTPTransport }  from './HTTPTransport';

const http = new HTTPTransport('https://jsonplaceholder.typicode.com/', '');

describe('HTTPTransport', () => {
  it('Get', (done) => {
    http
      .get(
        'comments',
        { data: { postId: 1 } },
      )
      .then(({ response }) => {
        const [{ postId }] = JSON.parse(response) || [];
        if (postId === 1) {
          done();
        } else {
          done(new Error('Ожидался массив объектов с ключом postId и значением 1'));
        }
      })
      .catch(done);
  });

  it('Post', (done) => {
    http
      .post('posts', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        data: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
      })
      .then(({ response }) => {
        const { title } = JSON.parse(response) || {};
        if (title === 'foo') {
          done();
        } else {
          done(new Error('Ожидался объект с ключом title и значением \'foo\''));
        }
      })
      .catch(done);
  });
});