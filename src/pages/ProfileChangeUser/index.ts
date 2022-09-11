import Block from '../../utils/Block';
import template from './profileChangeUser.pug';
import { Button } from '../../components/Button';
import * as styles from './profileChangeUser.scss';
import { Input } from '../../components/Input';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';

interface ProfileChangeUserProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class ProfileChangeUser extends Block {
  constructor(props: ProfileChangeUserProps) {
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
        classes: 'user-info__field',
        fieldValue: new Input({
          label: '',
          idInput: 'email',
          type: 'text',
          valueInput: 'pochta@yandex.ru',
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
          valueInput: 'ivanivanov',
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
          valueInput: 'Иван',
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
          valueInput: 'Иванов',
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
          valueInput: 'Иван',
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
          valueInput: '+7 (909) 967 30 30',
          inputClasses: 'info-field__value info-field__value_right',
        }),
      }),
    ];
    this.children.fields = fields;

    this.children.footer = new Button({
      label: 'Сохранить',
      events: {
        click: () => console.log('clicked!'),
      },
      classes: 'ya-btn ya-btn_main user-info__field_btn',
      url: '/profile',
    });
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
