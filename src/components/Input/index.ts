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
  RegInput?: any
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('div', props);
      this.props.events = {
        // focusin: () => {
        // 	const arr = this.props.classInput.indexOf(' ') ? this.props.classInput.split(' ') : [this.props.classInput]
        // 	this.props.classInput = arr.filter(val => val != 'ya-field__input_error').join(' ')
        // },
        // focusout: (env: FocusEvent) => {
        //   const val = (env.target as HTMLInputElement).value;
        //   this.onValidate(val);
        // },
      };
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
      funBlur: (env: FocusEvent) => {
        const val = (env.target as HTMLInputElement).value;
        // console.log('blur', this)
        this.onValidate(val);
      },
    });
  }

  protected onValidate(val: string) {
    const regIn = new RegExp(this.props.RegInput, 'i');
    if (!(regIn.test(val))) {
      // console.log(this)
      this.children.errorMsg.setProps({ errorMsg: this.props.errorInput });
      const classInput = this.children.inputField.props.classes;
      // console.log('классы', classInput)
      this.props.valueInput = val;
      const arr = classInput.indexOf(' ') ? classInput.split(' ') : [classInput];
      if (!(arr.indexOf('ya-field__input_error') > 0)) {
        this.children.inputField.setProps({ classes : classInput + ' ya-field__input_error' });
      }
      this.children.inputField.setProps({ classes : classInput });
    } else {
      this.children.errorMsg.setProps({ errorMsg: '' });
      this.props.valueInput = val;
      const classInput = this.children.inputField.props.classes;
      const arr = classInput.indexOf(' ') ? classInput.split(' ') : [classInput];
      const mas = arr.filter(val => val != 'ya-field__input_error').join(' ');
      this.children.inputField.setProps({ classes : mas });
    }
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      styles,
      idInput: this.props.idInput,
      type: this.props.type,
      classInput: this.props.classInput,
      valueInput: this.props.valueInput,
      errorMsg: this.props.errorMsg,
    });
  }
}
