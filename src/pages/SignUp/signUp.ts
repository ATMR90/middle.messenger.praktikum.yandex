import { SignUp } from '.';

export function pageSignUp() {
  const root = document.querySelector('#app')!;

  const signUp = new SignUp({ title: 'Регистрация' });

  root.innerHTML = '';
  root.append(signUp.getContent()!);
}
