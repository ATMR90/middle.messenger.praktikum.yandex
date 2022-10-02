import Block from '../../utils/Block';
import template from './changeAvatar.pug';
import * as styles from './changeAvatar.scss';

import { Button } from '../Button';
import { Input } from '../Input';

interface ChangeAvatarProps {
  label: string,
  events?: {
    click: () => void
  },
  classes?: string,
  func?: () => void,
}

export class ChangeAvatar extends Block {
  constructor(props: ChangeAvatarProps) {
    super(props);
  }

  init() {
    this.children.inputAvatar = new Input({
      label: 'Выбрать файл на компьютере',
      idInput: 'avatar',
      type: 'file',
      classes: 'ya-form__field ya-field_file ya-field',
      inputClasses: 'ya-field__input',
    });
    this.children.button = new Button({
      label: 'Поменять',
      classes: 'ya-btn ya-btn_main ya-form__btn',
      events: {
        click: this.props.func,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
