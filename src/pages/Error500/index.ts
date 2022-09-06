import Block from '../../utils/Block';
import template from './error500.pug';
import * as styles from './error500.scss';

interface Error500Props {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class Error500 extends Block {
  constructor(props: Error500Props) {
    super(props);
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
