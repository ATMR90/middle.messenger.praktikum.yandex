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
						console.log(loginLog, passwordLog)

						// правильная проверка логина
						const RegExp = /^[a-z0-9_-]{3,20}$/;
						const RexNum = /^\d{1,}$/;
						console.log('login', RegExp.test(loginLog) && !RexNum.test(loginLog))

						const RegName = /^[a-z-]/;
						console.log('first_name', RegName.test(loginLog) && !RexNum.test(loginLog))

						const RegPass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;
						console.log('password', RegPass.test(loginLog))

						const RegTest = /[\\w.]*/;
						console.log('test', RegTest.test(loginLog))

						const RegEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]+.+.[A-Z]{2,4}$/i;
						console.log('email', RegEmail.test(loginLog))
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