import Block from "../../utils/Block";
import template from './profile.pug'
import { Button } from '../../components/Button'
import * as styles from './profile.scss'
import { Input } from "../../components/Input";
import { InfoField } from "../../components/InfoField";

interface ProfileProps {
	title: string,
	classes?: string,
	url?: string,
	children?: {
		fields: Block[],
		footer: Block[]
	}
}

export class Profile extends Block {
	constructor(props: ProfileProps) {
		super('div', props);
		this.element!.classList.add('ya-profile')
	}


	init() {



		const fields = [
			new InfoField({
				label: 'Поле',
				name: 'Почта',
				value: 'pochta@yandex.ru',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				name: 'Логин',
				value: 'ivanivanov',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				name: 'Имя',
				value: 'Иван',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				name: 'Фамилия',
				value: 'Иванов',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				name: 'Имя в чате',
				value: 'Иван',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				name: 'Телефон',
				value: '+7 (909) 967 30 30',
				classes: 'user-info__field'
			}),

		]
		this.children.fields = fields


		const buttons = [
			new InfoField({
				label: 'Поле',
				fieldName: new Button({
					label: 'Изменить данные',
					events: {
						click: () => {
							this.setProps({title: 'Виктор', fields: [
								new InfoField({
									label: 'Поле',
									name: 'Почта',
									//value: 'pochta@yandex.ru',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'email',
										type: 'text',
										valueInput: 'pochta@yandex.ru',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
								new InfoField({
									label: 'Поле',
									name: 'Логин',
									//value: 'ivanivanov',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'login',
										type: 'text',
										valueInput: 'ivanivanov',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
								new InfoField({
									label: 'Поле',
									name: 'Имя',
									//value: 'Иван',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'first_name',
										type: 'text',
										valueInput: 'Иван',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
								new InfoField({
									label: 'Поле',
									name: 'Фамилия',
									//value: 'Иванов',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'second_name',
										type: 'text',
										valueInput: 'Иванов',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
								new InfoField({
									label: 'Поле',
									name: 'Имя в чате',
									//value: 'Иван',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'display_name',
										type: 'text',
										valueInput: 'Иван',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
								new InfoField({
									label: 'Поле',
									name: 'Телефон',
									//value: '+7 (909) 967 30 30',
									classes: 'user-info__field',
									fieldValue: new Input ({
										label: '',
										idInput: 'phone',
										type: 'text',
										valueInput: '+7 (909) 967 30 30',
										events: {
											click: () => {}
										},
										//classes: 'user-info__field',
										classInput: 'info-field__value info-field__value_right'
										})
								}),
					
							], footer: new Button({
								label: 'Сохранить',
								events: {
									click: () => console.log('clicked!')
								},
								classes: 'ya-btn ya-btn_main user-info__field_btn'
							}) })
						}
					},
					classes: 'ya-btn user-info__btn'
				}),
				value: '',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				fieldName: new Button({
					label: 'Изменить пароль',
					events: {
						click: () => {
							this.setProps({
								title: 'Петр',
								fields: [
									new InfoField({
										label: 'Поле',
										name: 'Старый пароль',
										//value: 'pochta@yandex.ru',
										classes: 'user-info__field',
										fieldValue: new Input ({
											label: '',
											idInput: 'oldPassword',
											type: 'password',
											valueInput: 'password',
											events: {
												click: () => {}
											},
											//classes: 'user-info__field',
											classInput: 'info-field__value info-field__value_right'
										})
									}),
									new InfoField({
										label: 'Поле',
										name: 'Новый пароль',
										//value: 'ivanivanov',
										classes: 'user-info__field',
										fieldValue: new Input ({
											label: '',
											idInput: 'newPassword',
											type: 'password',
											valueInput: 'newPassword',
											events: {
												click: () => {}
											},
											//classes: 'user-info__field',
											classInput: 'info-field__value info-field__value_right'
										})
									}),
									new InfoField({
										label: 'Поле',
										name: 'Повторите новый пароль',
										//value: 'Иван',
										classes: 'user-info__field',
										fieldValue: new Input ({
											label: '',
											idInput: 'passwordYet',
											type: 'password',
											valueInput: 'newPassword',
											events: {
												click: () => {}
											},
											//classes: 'user-info__field',
											classInput: 'info-field__value info-field__value_right'
										})
									}),
						
								], footer: new Button({
									label: 'Сохранить',
									events: {
										click: () => console.log('clicked!')
									},
									classes: 'ya-btn ya-btn_main user-info__field_btn'
								})
							})
						}
					},
					classes: 'ya-btn user-info__btn'
				}),
				value: '',
				classes: 'user-info__field'
			}),
			new InfoField({
				label: 'Поле',
				fieldName: new Button({
					label: 'Выйти',
					events: {
						click: () => console.log('clicked!')
					},
					classes: 'ya-btn user-info__btn user-info__btn_red'
				}),
				value: '',
				classes: 'user-info__field'
			}),
		]
		this.children.footer = buttons

	}

	render() {

		return this.compile(template, { title: this.props.title, styles })

	}
}