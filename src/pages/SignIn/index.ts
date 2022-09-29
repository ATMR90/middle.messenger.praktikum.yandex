import Block from '../../utils/Block';
import template from './signIn.pug';
import * as styles from './signIn.scss';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';

import { SignInData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

interface SignInProps {
  title: string,
  classes?: string,
  url?: string,
  children?: {
    fields: Block[],
    footer: Block[]
  }
}

export class SignIn extends Block {
  constructor(props: SignInProps) {
    super(Object.assign(
      {
          title: 'Вход',
      },
      props,
    ));
  }

  init() {
    this.children.fields  = [
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: 'ya-field ya-form__field',
        inputClasses: 'ya-field__input',
        events: {
          focusin: () => {
            const loginL = document.querySelector(`#${this.children.fields[0].props.idInput}`);
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
            const loginL = document.querySelector(`#${this.children.fields[1].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
        },
      }),
    ];
    this.children.footer = [
      new Button({
        label: 'Войти',
        events: {
          click: () => {
            event.preventDefault();
            const valid = this.children.fields.reduce((acc, val) => {
              const result = val.onValidate();
              return acc && result;
            }, true);
            const logLog = document.querySelector(`#${this.children.fields[0].props.idInput}`)!.value;
            const logPass = document.querySelector(`#${this.children.fields[1].props.idInput}`)!.value;
            if (valid && logLog && logPass) {
              const data = {
                'login': logLog,
                'password': logPass,
              } as SignInData;
              AuthController.signin(data);
              console.log('Signin-log', data);
            }
          },
        },
        classes: 'ya-btn ya-btn_main ya-form__btn',
        type: 'submit',
      }),
      new Link({
        label: 'Регистрация',
        classes: 'ya-btn ya-form__btn',
        to: '/sign-up',
      }),
    ];
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
