import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import template from './chatMessages.pug';
import * as styles from './chatMessages.scss';
import { ChatMessage } from '../../components/ChatMessage';
import formatDate from '../../utils/formatDate';

interface ChatMessagesProps {
	label: string,
	classes?: string
	img?: string,
	title?: string,
	text?: string,
	time?: string,
	newMessage?: string;
	onClick?: (chatID: any) => void
	events?: {
		click: (param: any) => void
	};
	id?: number;
}

export class ChatMessagesBase extends Block {
	constructor(props: ChatMessagesProps) {
		super({
			...props,
			events: {
				click: () => {}
			}
		});
	}

	init(): void {
		let storeData = store.getState()
		if (storeData.messages) {
			let mes: any[] = []
			if (storeData.messages.messages) {
				if (Object.keys(storeData.messages.messages).length !== 0) {
					if (typeof storeData.messages.messages !== 'undefined') {
						storeData.messages.messages.forEach((data: any) => {
							let MesList = new ChatMessage({
								label: '',
								content: `${data.content}`,
								data: formatDate(data.time),
								classes: 'messages-chat__his-message',
								id: data.id
							});
							mes.push(MesList);
						});
					}
				}
			}
			this.children.mes = mes;
		} else {
			if (this.props.messages) {
				let mes: any[] = []
				if (this.props.messages) {
					if (Object.keys(this.props.messages).length !== 0) {
						if (typeof this.props.messages !== 'undefined') {
							this.props.messages.forEach((data: any) => {
								let MesList = new ChatMessage({
									label: '',
									content: `${data.content}`,
									data: formatDate(data.time),
									classes: 'messages-chat__his-message',
									id: data.id
								});
								mes.push(MesList);
							});
						}
					}
				}
				this.children.mes = mes;
			}
		}
	}

	componentDidUpdate() {
		let storeData = store.getState()
		if (this.props.messages) {
			let mes: any[] = []
			if (this.props.messages) {
				if (Object.keys(this.props.messages).length !== 0) {
					if (typeof this.props.messages !== 'undefined') {
						this.props.messages.forEach((data: any) => {
							let MesList = new ChatMessage({
								label: '',
								content: `${data.content}`,
								data: formatDate(data.time),
								classes: 'messages-chat__his-message',
								id: data.id
							});
							mes.push(MesList);
						});
					}
				}
			}
			this.children.mes = mes;
		}
		else {
			let mes: any[] = []
			if (storeData.messages) {
				if (storeData.messages.messages) {
					if (Object.keys(storeData.messages.messages).length !== 0) {
						if (typeof storeData.messages.messages !== 'undefined') {
							storeData.messages.messages.forEach((data: any) => {
								let MesList = new ChatMessage({
									label: '',
									content: `${data.content}`,
									data: formatDate(data.time),
									classes: 'messages-chat__his-message',
									id: data.id
								});
								mes.push(MesList);
							});
						}
					}
				}
				this.children.mes = mes;
			}
		}
		return true
	}

	componentDidMount() {
		let storeData = store.getState()
		let mes: any[] = []
		if (storeData.messages) {
			if (Object.keys(storeData.messages.messages).length !== 0) {
				if (typeof storeData.messages.messages !== 'undefined') {
					storeData.messages.messages.forEach((data: any) => {
						let MesList = new ChatMessage({
							label: '',
							content: `${data.content}`,
							data: formatDate(data.time),
							classes: 'messages-chat__his-message',
							id: data.id
						});
						mes.push(MesList);
					});
				}
			}
			this.children.mes = mes;
		}
	}

	render() {
		return this.compile(template, {
			...this.props, styles,
		});
	}
}

const withUser = withStore((state) => ({ ...state.messages }))

export const ChatMessages = withUser(ChatMessagesBase);
