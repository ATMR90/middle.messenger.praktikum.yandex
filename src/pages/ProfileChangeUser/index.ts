import Block from '../../utils/Block';
import template from './profileChangeUser.pug';
import { Button } from '../../components/Button';
import * as styles from './profileChangeUser.scss';
import { Input } from '../../components/Input';
import { InfoField } from '../../components/InfoField';
import ButtonWithImage from '../../components/ButtonWithImage';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import { withStore } from '../../utils/Store';
import { router } from '../..';
import UserController from '../../controllers/UserController';
import { UserAPIUpdateProfile } from '../../api/UserAPI';

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
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
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
    this.children.fields = fields;

    this.children.footer = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
					// console.log(this.children.fields[0].children)
            const valid = this.children.fields.reduce((acc, val) => {
							// console.log(val.children.fieldValue)
              const result = val.children.fieldValue.onValidate();
              return acc && result;
            }, true);
            const logEmail = document.querySelector(`#${this.children.fields[0].children.fieldValue.props.idInput}`)!.value;
            const logLog = document.querySelector(`#${this.children.fields[1].children.fieldValue.props.idInput}`)!.value;
            const logFirstName = document.querySelector(`#${this.children.fields[2].children.fieldValue.props.idInput}`)!.value;
            const logSecondName = document.querySelector(`#${this.children.fields[3].children.fieldValue.props.idInput}`)!.value;
            const logDisplayName = document.querySelector(`#${this.children.fields[4].children.fieldValue.props.idInput}`)!.value;
            const logPhone = document.querySelector(`#${this.children.fields[5].children.fieldValue.props.idInput}`)!.value;
            if (valid) {
              const data = {
								"first_name": logFirstName,
								"second_name": logSecondName,
								"login": logLog,
								"email": logEmail,
								"display_name": logDisplayName,
								"phone": logPhone,
              } as UserAPIUpdateProfile;
							console.log('prof-change-log',data)
							UserController.updateProfile(data)
							setTimeout(() => {
								console.log('timeout')
								router.go('/settings')
							}, 200)
							// router.go('/settings')
						}
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

export const ProfileChangeUser = withUser(ProfileChangeUserBase);
