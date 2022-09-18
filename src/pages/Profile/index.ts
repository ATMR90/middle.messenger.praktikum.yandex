import Block from '../../utils/Block';
import template from './profile.pug';
import { Button } from '../../components/Button';
import * as styles from './profile.scss';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { User } from '../../api/AuthAPI';
import { Link } from '../../components/Link';

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
		console.log('init',this.props)
		AuthController.fetchUser();
		// let data = store.getState().user as User;
		// console.log(this.props.email)
		// console.log(this.props.test)
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
    this.children.fields = fields;

    const buttons = [
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
					label: 'Изменить данные',
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
						click: (e) => {
							// e.preventDefault();
							AuthController.logout();
						}
					}
        }),
        value: '',
        classes: 'user-info__field',
      }),
    ];
    this.children.footer = buttons;
  }

  render() {
		// console.log('render', this.props.email)
    return this.compile(template, { title: this.props.title, styles });
  }
}


const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(ProfileBase);