import Block from "../../utils/Block";
import template from './chatPanel.pug'
import * as styles from './chatPanel.scss'

interface ChatPanelProps {
	label: string,
	idInput?: string,
	type?: string,
	events?: {
		click: () => void
	},
	classes?: string
	name?: string | Block
	value?: string
	fieldName?: Block
	fieldValue?: Block
	
	img?: string,
	title?: string,
	text?: string,
	time?: string,
	newMessage?: string
}

export class ChatPanel extends Block {
	constructor(props: ChatPanelProps) {
		super('div', props);
		this.element!.classList.add('chat-panel')
	}

	render() {
		return this.compile(template, {label: this.props.label, styles, img: this.props.img, title: this.props.title, text: this.props.text, time: this.props.time, newMessage: this.props.newMessage})
	}
}