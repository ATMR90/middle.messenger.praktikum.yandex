import Block from '../../utils/Block';
import template from './signIn.pug';
import { Button } from '../../components/Button';
import * as styles from './signIn.scss';
import { Input } from '../../components/Input';
// import { pageSignUp } from '../SignUp/signUp';

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
    super(props);
    // this.element!.classList.add('ya-form');
  }

  init() {
    const fields = [
      new Input({
        label: 'Логин',
        idInput: 'login',
        type: 'text',
        classes: 'ya-field ya-form__field',
        classInput: 'ya-field__input',
        errorInput: 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание)',
        RegInput: '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
        events: {
          focusin: () => {
            // console.log(this, event?.target, event?.currentTarget)
            const loginL = document.querySelector(`#${this.children.fields[0].props.idInput}`);
            // console.log(loginL)
            loginL?.classList.remove('ya-field__input_error');
            // this.children.fields[0].props.errorMsg = ''
          },
          // focusout: () => {
          //   const loginLog = document.querySelector(`#${this.children.fields[0].props.idInput}`)!.value;
          //   const regIn = new RegExp(this.children.fields[0].props.RegInput, 'i');
          //   if (!(regIn.test(loginLog))) {
          //     this.children.fields[0].props.errorMsg = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание)';
          //     this.children.fields[0].props.valueInput = loginLog;
          //     const loginL = document.querySelector(`#${this.children.fields[0].props.idInput}`);
          //     loginL?.classList.add('ya-field__input_error');
          //   } else {
          //     this.children.fields[0].props.errorMsg = '';
          //     this.children.fields[0].props.valueInput = loginLog;
          //     const loginL = document.querySelector(`#${this.children.fields[0].props.idInput}`);
          //     loginL?.classList.remove('ya-field__input_error');
          //   }
          // },
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
            const loginL = document.querySelector(`#${this.children.fields[1].props.idInput}`);
            loginL?.classList.remove('ya-field__input_error');
          },
          // focusout: () => {
          //   const loginLog = document.querySelector(`#${this.children.fields[1].props.idInput}`)!.value;
          //   const regIn = new RegExp(this.children.fields[1].props.RegInput);
          //   if (!(regIn.test(loginLog))) {
          //     this.children.fields[1].props.errorMsg = 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра';
          //     this.children.fields[1].props.valueInput = loginLog;
          //     const loginL = document.querySelector(`#${this.children.fields[1].props.idInput}`);
          //     loginL?.classList.add('ya-field__input_error');
          //   } else {
          //     this.children.fields[1].props.errorMsg = '';
          //     this.children.fields[1].props.valueInput = loginLog;
          //     const loginL = document.querySelector(`#${this.children.fields[1].props.idInput}`);
          //     loginL?.classList.remove('ya-field__input_error');
          //   }
          // },
        },
      }),
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: 'Войти',
        events: {
          click: () => {
						event.preventDefault()
						const valid = this.children.fields.reduce((acc,val) => {
							const result = val.onValidate()
							return acc && result
						}, true)
						// console.log(valid)
            const loginLog = document.querySelector('#login')!.value;
            // const passwordLog = document.querySelector('#password')!.value;
            // console.log(loginLog, passwordLog)

            // правильная проверка логина
            // const RegExpr = /^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$/i;
            // const RexNum = /^\d{1,}$/;
            // console.log('login', RegExp.test(loginLog) && RexNum.test(loginLog)) // trut - если ошибка (т.е. состоит из одних цифр, символов больше 20 или меньше 3)

            // const RegName = /^[a-z-]/;
            // правильная проверка имени и фамилии
            // const RegName2 = /^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$/;
            // console.log('first_name', RegName2.test(loginLog))

            // const RegPass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;
            // правильная проверка пароля
            // const RegPass = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/;
            // console.log('password', RegPass.test(loginLog))

            // проверка email
            // const RegEmail = /^[a-zA-Z0-9._%$#+-]+@[a-zA-Z0-9]+(?=.[0-9]+)?\.[a-zA-Z]+$/i;
            // const RegEmail = /^[a-zA-Z0-9._%$#+-]+@[a-z0-9]*[a-z]+[^0-9]*?\.[a-zA-Z]+$/i;  //работает
            // const RegEmail = /^[a-z0-9._%$#+-]+@[a-z0-9]*[a-z]+\.[a-z]+$/i;
            // console.log('email', RegEmail.test(loginLog))

            // правильная проверка телефона
            // const RegPhone = /^[0-9+][0-9]{9,14}$/;
            // console.log('phone', RegPhone.test(loginLog))

            // правильная проверка сообщения
            // const RegMessage = /^$/;
            // const RegMessage = /^\s*$/;
            // console.log('message', RegMessage.test(loginLog))

            // const RegTest = /[\\w.]*/;
            // console.log('test', RegTest.test(loginLog))

            // console.log(this.children.fields[0].props.RegInput)
            const regIn = new RegExp(this.children.fields[0].props.RegInput, 'i');
            if (!(regIn.test(loginLog))) {
              // if (!(RegExp.test(loginLog) && !RexNum.test(loginLog))) {
              // console.log(this.children.fields[0])
              this.children.fields[0].props.errorMsg = 'Неверный логин';
              this.children.fields[0].props.valueInput = loginLog;
              // this.children.fields[0].props.classInput = ''
              const loginL = document.querySelector('#login');
              loginL?.classList.add('ya-field__input_error');
            } else {
              this.children.fields[0].props.errorMsg = '';
              this.children.fields[0].props.valueInput = loginLog;
              // this.children.fields[0].props.classInput = ''
              const loginL = document.querySelector('#login');
              loginL?.classList.remove('ya-field__input_error');
            }

            const logLog = document.querySelector(`#${this.children.fields[0].props.idInput}`)!.value;
            const logPass = document.querySelector(`#${this.children.fields[1].props.idInput}`)!.value;
            if (valid) {
							console.log({ login: logLog, password: logPass });
						}
          },
        },
        classes: 'ya-btn ya-btn_main ya-form__btn',
				type: 'submit'
      }),
      new Button({
        label: 'Регистрация',
        // events: {
        // 	click: pageSignUp
        // },
        classes: 'ya-btn ya-form__btn',
        url: '/registration',
      }),
    ];
    this.children.footer = buttons;
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
