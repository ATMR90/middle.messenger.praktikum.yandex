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
			label: '',
			btn: [
				new ButtonWithImage({
					label: 'Добавить пользователя',
					src: './../../assets/img/pop_up_plus_.svg',
					events: {
						click: () => {
							console.log(this)
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
							console.log('clack')
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
					console.log(this)
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
						
						// console.log(this.children.modal.children.fields.props.idInput)
						// const valid = this.children.modalDel.children.fields.onValidate();
						const valid = false
						const nickName = document.querySelector(`#${this.children.modalDel.children.fields.props.idInput}`)!.value;
						addUser(nickName)
						if (valid) {
	

							// Поиск пользователя
							const dataSearch = {
								login: nickName
							}
							console.log('nik',dataSearch)
							const userID = 304;
							const userIDtemp = UserController.searchProfile(dataSearch)
							console.log('search',userIDtemp)

							// Добавление пользователей в чат
							const data = {
									users: [userID],
									chatId: store.getState().chat.chatId
							}
							console.log(data)
							// ChatController.addUserChat(data)
	

							
						}
						this.children.modalAdd.hide()
					},
				},
				classes: 'ya-btn ya-btn_main ya-form__btn',
			}),
			new Button({
				label: 'Отмена',
				events: {
					click: () => {
						// console.log(this)
						this.children.modalAdd.hide()
						// console.log(this.children.modal)
					}
				},
				classes: 'ya-btn ya-form__btn',
			})
		]


		})
		// console.log('modal',modal)
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

						// console.log(this.children.modal.children.fields.props.idInput)
						// const valid = this.children.modalDel.children.fields.onValidate();
						const valid = false
						const nickName = document.querySelector(`#${this.children.modalDel.children.fields.props.idInput}`)!.value;
						delUser(nickName)
						if (valid) {
	

							// Поиск пользователя
							const dataSearch = {
								login: nickName
							}
							console.log('nik',dataSearch)
							const userID = 304;
							const userIDtemp = UserController.searchProfile(dataSearch)
							console.log('search',userIDtemp)

							// Удаление пользователей из чата
							const data = {
									users: [userID],
									chatId: store.getState().chat.chatId
							}
							console.log(data)
							// ChatController.deleteUserChat(data)
	


						}
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
						// console.log(this.children.modal)
					}
				},
				classes: 'ya-btn ya-form__btn',
			})
		]


		})
		// console.log('modal',modal)
		this.children.modalDel = modalDel

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


async function addUser(nickName:any){


		// Поиск пользователя
		const dataSearch = {
			login: nickName
		}
		console.log('nik',dataSearch)
		const userIDtemp = await UserController.searchProfile(dataSearch).then(res => res?.response)
		const userID = userIDtemp[0].id;
		
		console.log('search__',userIDtemp)

		// Добавление пользователей в чат
		const data = {
				users: [userID],
				chatId: store.getState().chat.chatId
		}
		console.log(data)
		ChatController.addUserChat(data)


		

}
async function delUser(nickName:any){


		// Поиск пользователя
		const dataSearch = {
			login: nickName
		}
		console.log('nik',dataSearch)
		const userIDtemp = await UserController.searchProfile(dataSearch).then(res => res?.response)
		const userID = userIDtemp[0].id;
		
		console.log('search__',userIDtemp)

		// Добавление пользователей в чат
		const data = {
				users: [userID],
				chatId: store.getState().chat.chatId
		}
		console.log(data)
		ChatController.deleteUserChat(data)


		

}