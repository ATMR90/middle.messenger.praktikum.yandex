import Block from './Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = '';
    root.append(block.getContent()!);
    return root;
  }
  return false;
}