import Block from '../../utils/Block';
import template from './profile.pug';
import { Button } from '../../components/Button';
import * as styles from './profile.scss';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';

interface ProfileProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class Profile extends Block {
  constructor(props: ProfileProps) {
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
        name: 'Почта',
        value: 'pochta@yandex.ru',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Логин',
        value: 'ivanivanov',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя',
        value: 'Иван',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Фамилия',
        value: 'Иванов',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Имя в чате',
        value: 'Иван',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        name: 'Телефон',
        value: '+7 (909) 967 30 30',
        classes: 'user-info__field',
      }),

    ];
    this.children.fields = fields;

    const buttons = [
      new InfoField({
        label: 'Поле',
        fieldName: new Button({
          label: 'Изменить данные',
          classes: 'ya-btn user-info__btn',
					url: '/profile-change-user',
        }),
        value: '',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        fieldName: new Button({
          label: 'Изменить пароль',
          classes: 'ya-btn user-info__btn',
					url: '/profile-change-password',
        }),
        value: '',
        classes: 'user-info__field',
      }),
      new InfoField({
        label: 'Поле',
        fieldName: new Button({
          label: 'Выйти',
          classes: 'ya-btn user-info__btn user-info__btn_red',
          url: '/',
        }),
        value: '',
        classes: 'user-info__field',
      }),
    ];
    this.children.footer = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
