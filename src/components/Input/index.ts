import Block from '../../utils/Block';
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
        focusout: (env: FocusEvent) => {
          const val = (env.target as HTMLInputElement).value;
          this.onValidate(val);
        },
      };
  }

  protected onValidate(val: string) {
    const regIn = new RegExp(this.props.RegInput, 'i');
    if (!(regIn.test(val))) {
      this.props.errorMsg = this.props.errorInput;
      this.props.valueInput = val;
      const arr = this.props.classInput.indexOf(' ') ? this.props.classInput.split(' ') : [this.props.classInput];
      if (!(arr.indexOf('ya-field__input_error') > 0)) {
        this.props.classInput = this.props.classInput + ' ya-field__input_error';
      }
    } else {
      this.props.errorMsg = '';
      this.props.valueInput = val;
      const arr = this.props.classInput.indexOf(' ') ? this.props.classInput.split(' ') : [this.props.classInput];
      this.props.classInput = arr.filter(val => val != 'ya-field__input_error').join(' ');
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
