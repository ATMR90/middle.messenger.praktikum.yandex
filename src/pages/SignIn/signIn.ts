import { SignIn } from '.';

export function pageSignIn() {
  const root = document.querySelector('#app')!;

  const signIn = new SignIn({ title: 'Вход' });

  root.innerHTML = '';
  root.append(signIn.getContent()!);
}
