import Block from '../../utils/Block';
import { InputError } from '../InputError';
import { InputField } from '../InputField';
import template from './input.pug';
import * as styles from './input.scss';

interface InputProps {
  label: string,
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
  errorMsg?: string,
  errorInput?: string,
  RegExp?: any,
  RegInput?: any,
	placeholderInput?: string
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  init() {
    this.children.errorMsg = new InputError({
      errorMsg: '',
    });
    this.children.inputField = new InputField({
      idInput: this.props.idInput,
      name: this.props.idInput,
      type: this.props.type,
      classes: this.props.classInput,
			valueInput: this.props.valueInput,
			placeholderInput: this.props.placeholderInput,
      funBlur: (env: FocusEvent) => {
        const val = (env.target as HTMLInputElement).value;
        this.onValidate(val);
      },
    });
  }

  protected onValidate(val: string) {
		if (val == undefined) {
			val = this.children.inputField.props.valueInput;
		}
    const regIn = new RegExp(this.props.RegInput, 'i');
    if (!(regIn.test(val))) {
      this.children.errorMsg.setProps({ errorMsg: this.props.errorInput });
      const classInput = this.children.inputField.props.classes;
      const arr = classInput.indexOf(' ') ? classInput.split(' ') : [classInput];
      if (!(arr.indexOf('ya-field__input_error') > 0)) {
				this.children.inputField.setProps({ classes : classInput + ' ya-field__input_error', valueInput: val });
      } else {
				this.children.inputField.setProps({ classes : classInput, valueInput: val });
				
			}
    } else {
      this.children.errorMsg.setProps({ errorMsg: '' });
      const classInput = this.children.inputField.props.classes;
      const arr = classInput.indexOf(' ') ? classInput.split(' ') : [classInput];
      const mas = arr.filter(val => val != 'ya-field__input_error').join(' ');
      this.children.inputField.setProps({ classes : mas, valueInput: val });
    }
		return regIn.test(val);
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      styles,
      idInput: this.props.idInput,
    });
  }
}
