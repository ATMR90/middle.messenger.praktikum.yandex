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
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Пароль',
				idInput: 'password',
				type: 'password',
				classes: 'ya-field ya-form__field'
			})
		]
		this.children.fields = fields

		const buttons = [
			new Button({
				label: 'Войти',
				events: {
					click: () => console.log('clicked!')
				},
				classes: 'ya-btn ya-btn_main ya-form__btn'
			}),
			new Button({
				label: 'Регистрация',
				events: {
					click: pageSignUp
				},
				classes: 'ya-btn ya-form__btn'
			}),
		]
		this.children.footer = buttons

	}

	render() {

		return this.compile(template, { title: this.props.title, styles })

	}
}