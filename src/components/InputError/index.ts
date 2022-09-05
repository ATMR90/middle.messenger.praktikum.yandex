import Block from '../../utils/Block';
import template from './inputError.pug';
import * as styles from './inputError.scss';

interface InputErrorProps {
  errorMsg: string,
  idInput?: string,
  type?: string,
  events?: {
    click?: () => void,
    focusin?: () => void,
    focusout?: (env: Event) => void
  },
  classes?: string,
  classInput?: string,
  valueInput?: string,
  errorInput?: string,
  RegExp?: any,
  RegInput?: any
}

export class InputError extends Block {
  constructor(props: InputErrorProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, {
      errorMsg: this.props.errorMsg,
      styles,
    });
  }
}
