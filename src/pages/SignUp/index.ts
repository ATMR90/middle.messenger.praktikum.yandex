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
