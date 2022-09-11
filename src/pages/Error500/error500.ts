import { Error500 } from '.';

export function pageError500() {
  const root = document.querySelector('#app')!;

  const error500 = new Error500({ title: '500' });

  root.innerHTML = '';
  root.append(error500.getContent()!);
}
