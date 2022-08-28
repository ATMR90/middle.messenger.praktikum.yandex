import Block from "../../utils/Block";
import template from './signUp.pug'
import { Button } from '../../components/Button'
import * as styles from './signUp.scss'
import { Input } from "../../components/Input";
import { pageSignIn } from "../SignIn/signIn";

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
		super('div', props);
		this.element!.classList.add('ya-form')
	}


	init() {

		const fields = [
			new Input({
				label: 'Почта',
				idInput: 'email',
				type: 'text',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Логин',
				idInput: 'login',
				type: 'text',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Имя',
				idInput: 'first_name',
				type: 'text',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Фамилия',
				idInput: 'second_name',
				type: 'text',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Телефон',
				idInput: 'phone',
				type: 'text',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Пароль',
				idInput: 'password',
				type: 'password',
				classes: 'ya-field ya-form__field'
			}),
			new Input({
				label: 'Пароль (еще раз)',
				idInput: 'passwordYet',
				type: 'password',
				classes: 'ya-field ya-form__field'
			}),
		]
		this.children.fields = fields


		const buttons = [
			new Button({
				label: 'Зарегистрироваться',
				events: {
					click: () => console.log('clicked!')
				},
				classes: 'ya-btn ya-btn_main ya-form__btn'
			}),
			new Button({
				label: 'Войти',
				events: {
					click: pageSignIn
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