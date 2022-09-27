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
import { Modal } from '../Modal';
import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatController';

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
					this.children.message.setProps({ valueInput: '' });
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
			label: '',
			btn: [
				new ButtonWithImage({
					label: 'Добавить пользователя',
					src: './../../assets/img/pop_up_plus_.svg',
					events: {
						click: () => {
							this.children.popUp.hide()
							this.children.modalAdd.show()
						}
					},
					classes: 'pop-up-item__container ya-pop-up__item pop-up-item',
					classDiv: 'pop-up-item__text'
				}),
				new ButtonWithImage({
					label: 'Удалить пользователя',
					src: './../../assets/img/pop_up_delete_.svg',
					events: {
						click: () => {
							this.children.popUp.hide()
							this.children.modalDel.show()
						}
					},
					classes: 'pop-up-item__container ya-pop-up__item pop-up-item',
					classDiv: 'pop-up-item__text'
				}),
			]
		})
		this.children.popUp = popUp
		const dots = new ButtonWithImage({
			label: '',
			src:'./../../assets/img/settings_dots.svg',
			alt:'Опции',
			classes:'header-right-panel__settings',
			events: {
				click: () => {
					this.children.popUp.show()
				}
			}
		})
		this.children.dots = dots

		const modalAdd = new Modal({
			label: '',
			subTitle: `Добавить пользователя`,
			classes: '',
			fields: 
			new Input({
        label: 'Ник пользователя',
        idInput: 'nickNameAdd',
        type: 'text',
        classes: 'ya-field ya-modal__field',
        inputClasses: 'ya-field__input',

      }),
			footer:[
				new Button({
					label: 'Добавить',
					events: {
						click: () => {
							const nickName = document.querySelector(`#${this.children.modalDel.children.fields.props.idInput}`)!.value;
							addUser(nickName)
							this.children.modalAdd.hide()
						},
					},
					classes: 'ya-btn ya-btn_main ya-form__btn',
				}),
				new Button({
					label: 'Отмена',
					events: {
						click: () => {
							this.children.modalAdd.hide()
						}
					},
					classes: 'ya-btn ya-form__btn',
				})
			]
		})
		this.children.modalAdd = modalAdd

		const modalDel = new Modal({
			label: '',
			subTitle: `Удалить пользователя`,
			classes: '',
			fields: 
				new Input({
					label: 'Ник пользователя',
					idInput: 'nickNameDel',
					type: 'text',
					classes: 'ya-field ya-modal__field',
					inputClasses: 'ya-field__input',
				}),
			footer:[
				new Button({
					label: 'Удалить',
					events: {
						click: () => {
							const nickName = document.querySelector(`#${this.children.modalDel.children.fields.props.idInput}`)!.value;
							delUser(nickName)
							this.children.modalDel.hide()
						},
					},
					classes: 'ya-btn ya-btn_red ya-form__btn',
				}),
				new Button({
					label: 'Отмена',
					events: {
						click: () => {
							this.children.modalDel.hide()
						}
					},
					classes: 'ya-btn ya-form__btn',
				})
			]
		})
		this.children.modalDel = modalDel
	}

  render() {
    return this.compile(template, {
      ...this.props, styles
    });
  }
}

async function addUser(nickName:any){
		const dataSearch = {
			login: nickName
		}
		const userIDtemp = await UserController.searchProfile(dataSearch).then(res => res?.response)
		const userID = userIDtemp[0].id;
		const data = {
				users: [userID],
				chatId: store.getState().chat.chatId
		}
		ChatController.addUserChat(data)
}
async function delUser(nickName:any){
		const dataSearch = {
			login: nickName
		}
		const userIDtemp = await UserController.searchProfile(dataSearch).then(res => res?.response)
		const userID = userIDtemp[0].id;
		const data = {
				users: [userID],
				chatId: store.getState().chat.chatId
		}
		ChatController.deleteUserChat(data)
}