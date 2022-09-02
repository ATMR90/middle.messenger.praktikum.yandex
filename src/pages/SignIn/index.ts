import Block from "../../utils/Block";
import template from './signIn.pug'
import { Button } from '../../components/Button'
import * as styles from './signIn.scss'
import { Input } from "../../components/Input";
import { pageSignUp } from "../SignUp/signUp";

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
		super('div', props);
		this.element!.classList.add('ya-form')
	}


	init() {

		const fields = [
			new Input({
				label: 'Логин',
				idInput: 'login',
				type: 'text',
				classes: 'ya-field ya-form__field',
				classInput: 'ya-field__input'
			}),
			new Input({
				label: 'Пароль',
				idInput: 'password',
				type: 'password',
				classes: 'ya-field ya-form__field',
				classInput: 'ya-field__input'
			})
		]
		this.children.fields = fields

		const buttons = [
			new Button({
				label: 'Войти',
				events: {
					click: () => {
						const loginLog = document.querySelector('#login')!.value
						const passwordLog = document.querySelector('#password')!.value
						//console.log(loginLog, passwordLog)

						// правильная проверка логина
						const RegExp = /^[a-zA-Z0-9_-]{3,20}$/;
						const RexNum = /^\d{1,}$/;
						//console.log('login', RegExp.test(loginLog) && !RexNum.test(loginLog))

						const RegName = /^[a-z-]/;
						// правильная проверка имени и фамилии
						const RegName2 = /^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$/;
						//console.log('first_name', RegName2.test(loginLog))

						// const RegPass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;
						// правильная проверка пароля
						const RegPass = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/;
						//console.log('password', RegPass.test(loginLog))

						
						//проверка email
						const RegEmail = /^[a-zA-Z0-9._%$#+-]+@[a-zA-Z]+?\.[a-zA-Z]+$/i;
						console.log('email', RegEmail.test(loginLog))
						
						// правильная проверка телефона
						const RegPhone = /^[0-9+][0-9]{9,14}$/;
						//console.log('phone', RegPhone.test(loginLog))
						
						// правильная проверка сообщения
						// const RegMessage = /^$/;
						const RegMessage = /^\s*$/;
						// console.log('message', RegMessage.test(loginLog))



						const RegTest = /[\\w.]*/;
						//console.log('test', RegTest.test(loginLog))
					}
				},
				classes: 'ya-btn ya-btn_main ya-form__btn'
			}),
			new Button({
				label: 'Регистрация',
				// events: {
				// 	click: pageSignUp
				// },
				classes: 'ya-btn ya-form__btn',
				url: '/registration'
			}),
		]
		this.children.footer = buttons

	}

	render() {

		return this.compile(template, { title: this.props.title, styles })

	}
}