import Block from '../../utils/Block';
import template from './profile.pug';
import { Button } from '../../components/Button';
import * as styles from './profile.scss';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import AuthController from '../../controllers/AuthController';
import { Link } from '../../components/Link';
import UserController from '../../controllers/UserController';
import { withStore } from '../../utils/Store';

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
    const avatar = new ButtonWithImage({
      label: '',
      events: {
        click: () => {
          const root = document.querySelector('#app')!;
          const changeAvatar = new ChangeAvatar({ 
						label: 'Загрузите файл@@', 
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
          root.innerHTML = '';
          root.append(changeAvatar.getContent()!);
        },
      },
      classes: 'header-profile__avatar header-profile__avatar_hover',
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
    });
    this.children.avatar = avatar;
		const profLink = new Link({
			label: '',
			classes: 'profile-back__text',
			to: '/messenger',
			src: './../../assets/img/arrow_back_.svg',
			alt: 'Стрелка назад',
		});
		this.children.profLink = profLink;
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
    this.children.footer = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title || 'Влад!', styles, display_name: this.props.display_name });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const Profile = withUser(ProfileBase);