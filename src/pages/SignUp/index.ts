import Block from '../../utils/Block';
import template from './signUp.pug';
import { Button } from '../../components/Button';
import * as styles from './signUp.scss';
import { Input } from '../../components/Input';

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
    super(props);
  }

  init() {
    const fields = [
      new Input({
        label: 'Почта',
        idInput: 'email',
        type: 'text',
        classes: 'ya-field ya-form__field',
        classInput: 'ya-field__input',
        errorInput: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть @ и точка после нее, но перед точкой обязательно должны быть буквы',
        RegInput: '^[a-z0-9._%$#+-]+@[a-z0-9]*[a-z]+\.[a-z]+$',
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
        classInput: 'ya-field__input',
        errorInput: 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
        RegInput: '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
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
        classInput: 'ya-field__input',
        errorInput: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        RegInput: '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
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
        classInput: 'ya-field__input',
        errorInput: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        RegInput: '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
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
        classInput: 'ya-field__input',
        errorInput: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
        RegInput: '^[0-9+][0-9]{9,14}$',
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
        classInput: 'ya-field__input',
        errorInput: 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра',
        RegInput: '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
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
        classInput: 'ya-field__input',
        errorInput: 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра',
        RegInput: '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
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
							return acc && result;
						}, true);
            const logEmail = document.querySelector(`#${this.children.fields[0].props.idInput}`)!.value;
            const logLog = document.querySelector(`#${this.children.fields[1].props.idInput}`)!.value;
            const logFirstName = document.querySelector(`#${this.children.fields[2].props.idInput}`)!.value;
            const logSecondName = document.querySelector(`#${this.children.fields[3].props.idInput}`)!.value;
            const logPhone = document.querySelector(`#${this.children.fields[4].props.idInput}`)!.value;
            const logPass = document.querySelector(`#${this.children.fields[5].props.idInput}`)!.value;
						if (valid) {
							console.log({
								Почта: logEmail, Логин: logLog, Имя: logFirstName, Фамилия: logSecondName, Телефон: logPhone, Пароль: logPass,
							});
						}
          },
        },
        classes: 'ya-btn ya-btn_main ya-form__btn',
				type: 'submit',
      }),
      new Button({
        label: 'Войти',
        classes: 'ya-btn ya-form__btn',
        url: '/auth',
      }),
    ];
    this.children.footer = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
