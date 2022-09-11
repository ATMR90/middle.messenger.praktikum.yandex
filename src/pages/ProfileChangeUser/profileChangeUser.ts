import { ProfileChangeUser } from '.';

export function pageProfileChangeUser() {
  const root = document.querySelector('#app')!;

  const profileChangeUser = new ProfileChangeUser({ title: '' });

  root.innerHTML = '';
  root.append(profileChangeUser.getContent()!);
}
