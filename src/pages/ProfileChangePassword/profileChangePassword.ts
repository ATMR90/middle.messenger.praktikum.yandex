import { ProfileChangePassword } from '.';

export function pageProfileChangePassword() {
  const root = document.querySelector('#app')!;

  const profileChangePassword = new ProfileChangePassword({ title: '' });

  root.innerHTML = '';
  root.append(profileChangePassword.getContent()!);
}
