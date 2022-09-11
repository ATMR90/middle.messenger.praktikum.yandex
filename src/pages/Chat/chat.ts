import { Chat } from '.';

export function pageChat() {
  const root = document.querySelector('#app')!;

  const chat = new Chat({ title: '' });

  root.innerHTML = '';
  root.append(chat.getContent()!);
}
