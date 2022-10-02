import Block from '../../utils/Block';
import template from './button.pug';
import * as styles from './button.scss';

// const tmpl = require('./button.pug')

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

		// const html = tmpl({...this.props, styles})
		// console.log(html)
		// debugger
    return this.compile(template, { ...this.props, styles });
  }
}
