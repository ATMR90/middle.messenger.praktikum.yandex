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
  classInput?: string,
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
    // this.element!.classList.add('ya-field__input');
    // this.element!.id = this.props.idInput;
    // this.element!.name = this.props.idInput;
    // this.element!.type = this.props.type;
    //this.element!.classes = this.props.classInput;
    this.props.events = {
      blur: this.props.funBlur,
    };
  }

  render() {
    return this.compile(template, {
      idInput: this.props.idInput,
      type: this.props.type,
      classes: this.props.classInput,
      valueInput: this.props.valueInput,
      errorMsg: this.props.errorMsg,
			placeholderInput: this.props.placeholderInput,
      styles,
    });
  }
}
