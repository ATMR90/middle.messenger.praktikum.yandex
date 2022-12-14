import Block from '../../utils/Block';
import template from './button.pug';
import * as styles from './button.scss';

interface ButtonProps {
  label: string,
  events?: {
    click: (e?:Event) => void
  },
  classes?: string,
  type?: string
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
