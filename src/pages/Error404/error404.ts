import { Error404 } from '.';

export function pageError404() {
  const root = document.querySelector('#app')!;

  const error404 = new Error404({ title: 'Ошибка 404' });

  root.innerHTML = '';
  root.append(error404.getContent()!);
}
