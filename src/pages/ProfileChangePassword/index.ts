import Block from '../../utils/Block';
import template from './profileChangePassword.pug';
import { Button } from '../../components/Button';
import * as styles from './profileChangePassword.scss';
import { Input } from '../../components/Input';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import { router } from '../..';
import { withStore } from '../../utils/Store';

interface ProfileChangePasswordProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class ProfileChangePasswordBase extends Block {
  constructor(props: ProfileChangePasswordProps) {
    super( props);
  }

  init() {
    const avatar = new ButtonWithImage({
      label: '',
      events: {
        click: () => {
          const root = document.querySelector('#app')!;

          const changeAvatar = new ChangeAvatar({ label: 'Загрузите файл', classes: 'ya-form' });

          root.innerHTML = '';
          root.append(changeAvatar.getContent()!);
        },
      },
      classes: 'header-profile__avatar header-profile__avatar_hover',
      src: './../../assets/img/default_square_image.svg',
    });
    this.children.avatar = avatar;

    const fields = [
      new InfoField({
        label: 'Поле',
        name: 'Старый пароль',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'oldPassword',
          type: 'password',
          valueInput: '',
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Новый пароль',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'newPassword',
          type: 'password',
          valueInput: '',
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Повторите новый пароль',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'passwordYet',
          type: 'password',
          valueInput: '',
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
    ];
    this.children.fields = fields;

    this.children.footer = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
					router.go('/settings')
					// console.log('clicked!')
				},
      },
      classes: 'ya-btn ya-btn_main user-info__field_btn',
      url: '/profile',
    });
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfileChangePassword = withUser(ProfileChangePasswordBase);
