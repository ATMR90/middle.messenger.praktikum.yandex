import Block from '../../utils/Block';
import template from './signUp.pug';
import { Button } from '../../components/Button';
import * as styles from './signUp.scss';
import { Input } from '../../components/Input';
import { SignUpData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import { router } from '../..';
import { Link } from '../../components/Link';

interface SignUpProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class SignUp extends Block {
  constructor(props: SignUpProps) {
    super(Object.assign(
			{
					title: 'Регистрация',
			},
			props
		));
  }

  init() {
    const fields = [
      new Input({
        label: 'Почта',
        idInput: 'email',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          click: () => {},
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[0].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[1].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Имя',
        idInput: 'first_name',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[2].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Фамилия',
        idInput: 'second_name',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[3].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Телефон',
        idInput: 'phone',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[4].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Пароль',
        idInput: 'password',
        type: 'password',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[5].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
      new Input({
        label: 'Пароль (еще раз)',
        idInput: 'passwordYet',
        type: 'password',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[6].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: 'Зарегистрироваться',
        events: {
          click: () => {
            event.preventDefault();
            const valid = this.children.fields.reduce((acc, val) => {
              const result = val.onValidate();
							// console.log(result)
              return acc && result;
            }, true);
            const logEmail = document.querySelector(`#${this.children.fields[0].props.idInput}`)!.value;
            const logLog = document.querySelector(`#${this.children.fields[1].props.idInput}`)!.value;
            const logFirstName = document.querySelector(`#${this.children.fields[2].props.idInput}`)!.value;
            const logSecondName = document.querySelector(`#${this.children.fields[3].props.idInput}`)!.value;
            const logPhone = document.querySelector(`#${this.children.fields[4].props.idInput}`)!.value;
            const logPass = document.querySelector(`#${this.children.fields[5].props.idInput}`)!.value;
            if (valid) {
              const data = {
								"first_name": logFirstName,
								"second_name": logSecondName,
								"login": logLog,
								"email": logEmail,
								"password": logPass,
								"phone": logPhone,
              } as SignUpData;
							AuthController.signup(data)
							console.log('SignUp-log',data)
            }
          },
        },
        classes: 'ya-btn ya-btn_main ya-form__btn',
        type: 'submit',
      }),
      new Link({
        label: 'Регистрация',
        classes: 'ya-btn ya-form__btn',
				to: '/',
      }),
    ];
    this.children.footer = buttons;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
