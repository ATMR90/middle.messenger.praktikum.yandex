import Block from '../../utils/Block';
import template from './error404.pug';
import * as styles from './error404.scss';

interface Error404Props {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class Error404 extends Block {
  constructor(props: Error404Props) {
    super(props);
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
