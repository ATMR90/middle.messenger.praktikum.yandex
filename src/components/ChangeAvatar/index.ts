import Block from '../../utils/Block';
import { Button } from '../Button';
import { Input } from '../Input';
import template from './changeAvatar.pug';
import * as styles from './changeAvatar.scss';

interface ChangeAvatarProps {
  label: string,
  events?: {
    click: () => void
  },
  classes?: string,
  url?: string
}

export class ChangeAvatar extends Block {
  constructor(props: ChangeAvatarProps) {
    super('div', props);
  }

  init() {
    const inputAvatar = new Input({
      label: 'Выбрать файл на компьютере',
      idInput: 'avatar',
      type: 'file',
      classes: 'ya-form__field ya-field_file ya-field',
      classInput: 'ya-field__input',
    });
    this.children.inputAvatar = inputAvatar;
    const button = new Button({
      label: 'Поменять',
      classes: 'ya-btn ya-btn_main ya-form__btn',
      events: {
        click: () => { console.log('button'); },
      },
    });
    this.children.button = button;
  }

  render() {
    return this.compile(template, { label: this.props.label, styles, url: this.props.url || '#' });
  }
}
