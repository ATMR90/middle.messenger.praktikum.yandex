import { router } from '../..';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { render } from '../../utils/render';

import template from './profileChangePassword.pug';
import * as styles from './profileChangePassword.scss';

import { Button } from '../../components/Button';
import { ButtonWithImage } from '../../components/ButtonWithImage';
import { Input } from '../../components/Input';
import { InfoField } from '../../components/InfoField';

import { ChangeAvatar } from '../../components/ChangeAvatar';

import { UserAPIUpdatePassword } from '../../api/UserAPI';
import UserController from '../../controllers/UserController';

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
    super(props);
  }

  init() {
    this.children.avatar = new ButtonWithImage({
      label: '',
      events: {
        click: () => {
          const changeAvatar = new ChangeAvatar({
            label: 'Загрузите файл аватара',
            classes: 'ya-form',
            func: () => {
              const avatarInput = document.querySelector('#avatarInput') as HTMLInputElement;
              if (avatarInput !== null) {
                const { files }: { files: FileList | null } = (avatarInput as HTMLInputElement);
                const [file] = files;
                const formData = new FormData();
                formData.append('avatar', file);
                UserController.updateAvatar(formData);
              }
            },
          });
          render('#app', changeAvatar);
        },
      },
      classes: 'header-profile__avatar header-profile__avatar_hover',
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
    });
    this.children.fields = [
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
    this.children.footer = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
          const valid = this.children.fields.reduce((acc, val) => {
            const result = val.children.fieldValue.onValidate();
            return acc && result;
          }, true);
          const logOldPassword = document.querySelector(`#${this.children.fields[0].children.fieldValue.props.idInput}`)!.value;
          const logNewPassword = document.querySelector(`#${this.children.fields[1].children.fieldValue.props.idInput}`)!.value;
          if (valid && logOldPassword && logNewPassword) {
            const data = {
              'oldPassword': logOldPassword,
              'newPassword': logNewPassword,
            } as UserAPIUpdatePassword;
            UserController.updatePassword(data);
            setTimeout(() => {
              router.go('/settings');
            }, 200);
          }
        },
      },
      classes: 'ya-btn ya-btn_main user-info__field_btn',
    });
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfileChangePassword = withUser(ProfileChangePasswordBase);
