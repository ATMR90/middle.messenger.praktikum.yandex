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
	onClick?: (chatID:any) => void 
  events?: {
    click: (param:any) => void
  };
	id?: number;
}

export class ChatMessagesBase extends Block {
  constructor(props: ChatMessagesProps) {
    super({...props,
		events: {
			click: () => {
				
			}
		}});
  }

	init(): void {
		let storeData = store.getState()
		console.log(this.props)
		console.log('mes',store.getState())
		if (storeData.messages) {
			console.log('this-mes',this.props.messages)
			// console.log(storeData)
			


			let mes: any[] = []

			if (Object.keys(this.props.messages.messages).length !== 0) {
				if (typeof this.props.messages.messages !== 'undefined') {
					this.props.messages.messages.forEach((data: any) => {
						let MesList = new ChatMessage({
							label: '',
							content: `${data.content}`,
							data: formatDate(data.time),
							classes: 'messages-chat__his-message',
							id: data.id
						});
						mes.push(MesList);
						// console.log(MesList)
					});
				}
			}
			console.log(mes)
			this.children.mes = mes;











			// const mes = [
			// 	new ChatMessage({
			// 		label:'',
			// 		classes: 'messages-chat__his-message'
			// 	})
			// ]

			// this.children.mes = mes
		}
		// const mes = [
		// 	new ChatMessage({
		// 	label: '',
		// 	classes: 'messages-chat__his-message'
		// 	}),
		// ]
		// this.children.mes = mes
	}

	componentDidUpdate() {
		this.dispatchComponentDidMount()
		return true
	}


	componentDidMount() {
		let storeData = store.getState()
		let mes: any[] = []

			if (Object.keys(storeData.messages.messages).length !== 0) {
				if (typeof storeData.messages.messages !== 'undefined') {
					storeData.messages.messages.forEach((data: any) => {
						// console.log(data)
						let MesList = new ChatMessage({
							label: '',
							content: `${data.content}`,
							data: formatDate(data.time),
							classes: 'messages-chat__his-message',
							id: data.id
						});
						mes.push(MesList);
						// console.log(MesList)
					});
				}
			}
			// console.log(mes)
			this.children.mes = mes;
	}

  render() {
    return this.compile(template, {
      ...this.props, styles, 
		});
  }
}

const withUser = withStore((state) => ({ ...state }))

export const ChatMessages = withUser(ChatMessagesBase);
