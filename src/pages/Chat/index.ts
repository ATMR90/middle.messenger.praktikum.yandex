import { ChatPanel } from "../../components/ChatPanel";
import Block from "../../utils/Block";
import template from './chat.pug'
import * as styles from './chat.scss'


interface ChatProps {
	title: string,
	classes?: string,
	url?: string,
	children?: {
		fields: Block[],
		footer: Block[]
	}
}

export class Chat extends Block {
	constructor(props: ChatProps) {
		super('div', props);
		this.element!.classList.add('ya-chat')
	}

	init() {
		const chatList = [
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Андрей',
				text: 'Изображение',
				time: '10:49',
				newMessage: '2',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Киноклуб',
				text: 'стикер',
				time: '12:00',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Илья',
				text: 'Друзья, у меня для вас особенный выпуск новостей!...',
				time: '15:12',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Вадим',
				text: 'Круто!',
				time: 'Пт',
				newMessage: '',
				classes: 'left-panel__chat left-panel__chat_active'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'тет-а-теты',
				text: 'И Human Interface Guidelines и Material Design рекомендуют...',
				time: 'Ср',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: '1, 2, 3',
				text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
				time: 'Пн',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Design Destroyer',
				text: 'В 2008 году художник Jon Rafman  начал собирать...',
				time: 'Пн',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Day.',
				text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
				time: '1 Мая 2020',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
			new ChatPanel({
				label: '',
				img: '#',
				title: 'Стас Рогозин',
				text: 'Можно или сегодня или завтра вечером.',
				time: '12 Апр 2020',
				newMessage: '',
				classes: 'left-panel__chat'
			}),
		]
		this.children.chatList = chatList
	}


	render() {

		return this.compile(template, { title: this.props.title, styles })

	}
}