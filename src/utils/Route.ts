import Block from "./Block";

function isEqual(lhs: string, rhs: string) {
  // console.log('isEqual', lhs,rhs, lhs === rhs)
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    // console.log('root', root, query, block)
		root.innerHTML = ''
    root.append(block.getContent()!);
    return root;
  }
  // console.log('false', root, query, block)
  return false;
}

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
		this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      // console.log('render',this._block, this._props.rootQuery)
      render(this._props.rootQuery, this._block);
      return;
    }

		//зачем?
    // this._block.show();
  }
}

export default Route;