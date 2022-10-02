import { router } from '../..';
import Block from '../../utils/Block';
import { render } from '../../utils/render';
import { withStore } from '../../utils/Store';

import template from './profileChangeUser.pug';
import * as styles from './profileChangeUser.scss';

import { Button } from '../../components/Button';
import { ButtonWithImage } from '../../components/ButtonWithImage';
import { Input } from '../../components/Input';
import { InfoField } from '../../components/InfoField';
import { Link } from '../../components/Link';

import { ChangeAvatar } from '../../components/ChangeAvatar';

import { UserAPIUpdateProfile } from '../../api/UserAPI';
import UserController from '../../controllers/UserController';

import arrowBack from './../../assets/img/arrow_back_.svg';

interface ProfileChangeUserProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class ProfileChangeUserBase extends Block {
  constructor(props: ProfileChangeUserProps) {
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
                const [file] = files as any;
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
    this.children.profLink = new Link({
      label: '',
      classes: 'profile-back__text',
      to: '/messenger',
      src: arrowBack,
      alt: 'Стрелка назад',
    });
    this.children.fields = [
      new InfoField({
        label: 'Поле',
        name: 'Почта',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'email',
          type: 'text',
          valueInput: this.props.email,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Логин',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'login',
          type: 'text',
          valueInput: this.props.login,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'first_name',
          type: 'text',
          valueInput: this.props.first_name,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Фамилия',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'second_name',
          type: 'text',
          valueInput: this.props.second_name,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя в чате',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'display_name',
          type: 'text',
          valueInput: this.props.display_name,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
      new InfoField({
        label: 'Поле',
        name: 'Телефон',
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'phone',
          type: 'text',
          valueInput: this.props.phone,
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
    ];
    this.children.footer = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
          const valid = (this.children.fields as Array<any>).reduce((acc, val) => {
            const result = val.children.fieldValue.onValidate();
            return acc && result;
          }, true);
          const logEmail = document.querySelector((`#${(this.children.fields as Array<any>)[0].children.fieldValue.props.idInput}`) as any).value;
          const logLog = document.querySelector((`#${(this.children.fields as Array<any>)[1].children.fieldValue.props.idInput}`) as any).value;
          const logFirstName = document.querySelector((`#${(this.children.fields as Array<any>)[2].children.fieldValue.props.idInput}`) as any).value;
          const logSecondName = document.querySelector((`#${(this.children.fields as Array<any>)[3].children.fieldValue.props.idInput}`) as any).value;
          const logDisplayName = document.querySelector((`#${(this.children.fields as Array<any>)[4].children.fieldValue.props.idInput}`) as any).value;
          const logPhone = document.querySelector((`#${(this.children.fields as Array<any>)[5].children.fieldValue.props.idInput}`) as any).value;
          if (valid && logEmail && logLog && logFirstName && logSecondName && logDisplayName && logPhone) {
            const data = {
              'first_name': logFirstName,
              'second_name': logSecondName,
              'login': logLog,
              'email': logEmail,
              'display_name': logDisplayName,
              'phone': logPhone,
            } as UserAPIUpdateProfile;
            UserController.updateProfile(data);
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

export const ProfileChangeUser = withUser(ProfileChangeUserBase);
