import Block from '../../utils/Block';
import template from './input.pug';
import { ValidationSettings } from '../../utils/Validation';

import * as styles from './input.scss';

import { ErrorMsg } from '../ErrorMsg';
import { InputField } from '../InputField';

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
  inputClasses?: string,
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
    this.children.errorMsg = new ErrorMsg({
      errorMsg: '',
    });
    this.children.inputField = new InputField({
      idInput: this.props.idInput,
      name: this.props.idInput,
      type: this.props.type,
      classes: this.props.inputClasses,
      valueInput: this.props.valueInput,
      placeholderInput: this.props.placeholderInput,
      funBlur: (env: FocusEvent) => {
        const val = (env.target as HTMLInputElement).value;
        const valId = (env.target as HTMLInputElement).id;
        this.onValidate(val, valId);
      },
    });
  }

  public onValidate(val: string, valId: string) {
    if (val === undefined || val === null || val === '') {
      val = (this.children.inputField as Block).props.valueInput;
      valId = (this.children.inputField as Block).props.idInput;
    }
    const validationSettings = ValidationSettings(valId);
    const regIn = new RegExp(validationSettings[1], 'i');
    const isValid = val && regIn.test(val);
    const inputClasses = (this.children.inputField as Block).props.classes;
    const arrClasses = inputClasses.split(' ');
    if (!isValid) {
      (this.children.errorMsg as Block).setProps({ errorMsg: validationSettings[0] });
      if (!(arrClasses.indexOf('ya-field__input_error') > 0)) {
        (this.children.inputField as Block).setProps({ classes : inputClasses + ' ya-field__input_error', valueInput: val });
      } else {
        (this.children.inputField as Block).setProps({ classes : inputClasses, valueInput: val });
      }
    } else {
      (this.children.errorMsg as Block).setProps({ errorMsg: '' });
      const strClasses = arrClasses.filter((val:string) => val != 'ya-field__input_error').join(' ');
      (this.children.inputField as Block).setProps({ classes : strClasses, valueInput: val });
    }
    return isValid;
  }

  public getValue() {
    return (this.children.inputField as InputField).getValueIn();
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      styles,
      idInput: this.props.idInput,
    });
  }
}
