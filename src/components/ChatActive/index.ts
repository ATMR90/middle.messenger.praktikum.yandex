import Block from '../../utils/Block';
import store from '../../utils/Store';
import { Button } from '../Button';
import ButtonWithImage from '../ButtonWithImage';
import { Input } from '../Input';
import template from './chatActive.pug';
import * as styles from './chatActive.scss';
import {messageController} from './../../controllers/';
import { ChatMessages } from '../../components/ChatMessages';
import { PopUp } from '../PopUp';

interface ChatActiveProps {
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

export class ChatActive extends Block {
  constructor(props: ChatActiveProps) {
    super({...props,
		events: {
			click: () => {}
		}});
  }

	init() {
		// console.log('Activ_chat', store.getState())
		// const storeData = store.getState()
		// console.log(storeData)
		// console.log(typeof storeData)
		// console.log(storeData["chat"])
		// console.log(store.getState())
		// const chatActiveId = 86
		// const chatActive = storeData.list.chats.filter((elem:any) => {
		// 	if (elem.id == chatActiveId) {
		// 		return true
		// 	}
		// 	return false
		// })[0]
		// const chatActive = {title: 'Чат'}
		// this.props.title = chatActive.title
		// this.props.img = `https://ya-praktikum.tech/api/v2/resources${chatActive.avatar}`

		// console.log(storeData)
		// console.log(chatActiveId, title, this.props.title)

		const message = new Input({
      label: '',
      idInput: 'message',
      type: 'text',
      valueInput: '',
      placeholderInput: 'Сообщение',
      events: {
        click: () => { },
      },
      inputClasses: 'footer-right-panel__input',
    });
    this.children.message = message;
		const btn = new ButtonWithImage({
			label:'',
			src: "../../assets/img/arrow_forward_enter_.svg",
			alt: "Отправить",
			classes: 'ya-btn-img',
			events: {
				click:() => {
					let message = this.children.message.getValue()
					// console.log(message, typeof message)
					// this.children.message.setProps({ valueInput: '' });
					messageController.sendMessage(message);
				}
			}
		})
		this.children.btn = btn

		const chatMessages = new ChatMessages({
			label: '',
			classes: 'right-panel__messages',
		})
		this.children.ChatMessages = chatMessages


		const popUp = new PopUp({
			label: ''
		})
		this.children.popUp = popUp
	}

	// protected componentDidUpdate(oldProps?: any, newProps?: any): boolean {
	// 	return false
	// }



  render() {
    return this.compile(template, {
      label: this.props.label, styles, img: this.props.img, title: this.props.title, text: this.props.text, time: this.props.time, newMessage: this.props.newMessage,
    });
  }
}
