import { Profile } from '.';

export function pageProfile() {
  const root = document.querySelector('#app')!;

  const profile = new Profile({ title: 'Иван' });

  root.innerHTML = '';
  root.append(profile.getContent()!);
}
