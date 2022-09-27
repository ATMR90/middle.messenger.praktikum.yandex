import Block from '../../utils/Block';
import template from './inputField.pug';
import * as styles from './inputField.scss';

interface InputFieldProps {
  errorMsg?: string,
  idInput?: string,
  type?: string,
  events?: {
    click?: () => void,
    focusin?: () => void,
    focusout?: (env: Event) => void
  },
  classes?: string,
  inputClasses?: string,
  valueInput?: string,
  errorInput?: string,
  placeholderInput?: string,
  RegExp?: any,
  RegInput?: any,
  name?: string,
  funBlur?: (env: FocusEvent) => void
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super(props);
    this.props.events = {
      blur: this.props.funBlur,
    };
  }

	public getValueIn() {
		return (this.element as HTMLInputElement).value
	}

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
    });
  }
}
