import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { render } from '../../utils/render';

import template from './profile.pug';
import * as styles from './profile.scss';

import { Button } from '../../components/Button';
import { InfoField } from '../../components/InfoField';
import { ButtonWithImage } from '../../components/ButtonWithImage';
import { Link } from '../../components/Link';

import { ChangeAvatar } from '../../components/ChangeAvatar';

import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

interface ProfileProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  },
  email: string,
  test: string
}

export class ProfileBase extends Block {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    AuthController.fetchUser();
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
    this.children.profLink = new Link({
      label: '',
      classes: 'profile-back__text',
      to: '/messenger',
      src: './../../assets/img/arrow_back_.svg',
      alt: 'Стрелка назад',
    });
    this.children.fields = [
      new InfoField({
        label: 'Поле',
        name: 'Почта',
        value: this.props.email,
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Логин',
        value: this.props.login,
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя',
        value: this.props.first_name,
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Фамилия',
        value: this.props.second_name,
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя в чате',
        value: this.props.display_name,
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Телефон',
        value: this.props.phone,
        classes: 'user-info__field',
      }),
    ];
    this.children.footer = [
      new InfoField({
        label: 'Поле',
        fieldName: new Link({
          label: 'Изменить данные',
          classes: 'ya-btn user-info__btn',
          to: '/profile',
        }),
        value: '',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        fieldName: new Link({
          label: 'Изменить пароль',
          classes: 'ya-btn user-info__btn',
          to: '/password',
        }),
        value: '',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        fieldName: new Button({
          label: 'Выйти',
          classes: 'ya-btn user-info__btn user-info__btn_red',
          events: {
            click: () => {
              AuthController.logout();
            },
          },
        }),
        value: '',
        classes: 'user-info__field',
      }),
    ];
  }

  render() {
    return this.compile(template, { title: this.props.title || 'Влад!', styles, display_name: this.props.display_name });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const Profile = withUser(ProfileBase);
