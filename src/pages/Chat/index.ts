import { Button } from '../../components/Button';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import { ChatActive } from '../../components/ChatActive';
import { ChatPanel } from '../../components/ChatPanel';
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';
import ChatController from '../../controllers/ChatController';
import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import template from './chat.pug';
import * as styles from './chat.scss';
import { messageController } from './../../controllers/';
import { Modal } from '../../components/Modal';

interface ChatProps {
	title: string,
	classes?: string,
	url?: string,
	children?: {
		fields: Block[],
		footer: Block[]
	}
}

export class ChatBase extends Block {
	constructor(props: ChatProps) {
		super(props);
	}

	init() {
		ChatController.request();





		// console.log(this.props)
		// console.log(store.getState().chat.chatId)
		const chatBtn = new Button({
			label: 'Создать чат',
			classes: 'ya-btn ya-btn_main ya-form__btn',
			events: {
				click: () => {

					// Создание чата
					// const chatNew = {
					// 	"title": "Новый чат"
					// }
					// ChatController.create(chatNew)

					// Удаление чата
					// const data = {
					// 	chatId: store.getState().chat.chatId
					// }
					// console.log('chat', data)
					// ChatController.removeChat(data)


					// Добавление пользователей в чат
					// const data = {
					// 		users: [310, 304],
					// 		chatId: 10
					// }
					// console.log(data)
					// ChatController.addUserChat(data)

					// Удаление пользователей из чата
					// const data = {
					// 		users: [310],
					// 		chatId: 10
					// }
					// console.log(data)
					// ChatController.deleteUserChat(data)

					// Запросить пользователей чата
					// const data = store.getState().chat.chatId
					// console.log(data)
					// ChatController.requestChatUsers(data)

					// Получить токен
					// const data = store.getState().chat.chatId
					// console.log(data)
					// ChatController.requestMessageToken(data) 

					// Поиск пользователя
					// const data = {
					//   login: 'ATMR'
					// }
					// UserController.searchProfile(data)

					// Подключится к чату
					// const data = store.getState().chat.chatId
					// console.log(data)
					// const tokenID = store.getState().chat.chatToken.token
					// const userID = store.getState().user.id
					// messageController.connect({
					//   userId: userID,
					//   chatId: data,
					//   token: tokenID
					// })
					// console.log({
					//   userId: userID,
					//   chatId: data,
					//   token: tokenID
					// })

					// Отключиться от чата
					// messageController.leave()


					this.children.modal.show()
				}
			}
		});
		const chatBtnTwo = new Button({
			label: 'Загрузить аватар',
			classes: 'ya-btn ya-btn_main ya-form__btn',
			events: {
				click: () => {
					const root = document.querySelector('#app')!;

					const changeAvatar = new ChangeAvatar({
						label: 'Загрузите аватар чата',
						classes: 'ya-form',
						func: () => {
							const avatarInput = document.querySelector("#avatarInput") as HTMLInputElement;
							// const file = this.children.inputAvatar!.children.inputField
							if (avatarInput !== null) {
								const { files }: { files: FileList | null } = (avatarInput as HTMLInputElement)
								const [file] = files;
								const chatID = Number(this.props.chatId);
								// console.log(file)
								const formData = new FormData();
								formData.append('chatId', chatID);
								formData.append('avatar', file);
								// console.log(formData, formData.get('avatar'), typeof formData.get('chatId'))
								ChatController.updateChatAvatar(formData);
								// работает! Загрузка аватара чата
							}

							// UserController.updateAvatar()
							// console.log('button чат');
						}
					});

					root.innerHTML = '';
					root.append(changeAvatar.getContent()!);
				}
			}
		});
		const chatBtnThree = new Button({
			label: 'Удалить чат',
			classes: 'ya-btn ya-btn_red ya-form__btn',
			events: {
				click: () => {
					
					if (store.getState().chat) {
						console.log(store.getState().chat.list.chats)
						nameActivChat = store.getState().chat.list.chats.filter((item) => {
							console.log(item.id, item.id == store.getState().chat.chatId)
							return item.id == store.getState().chat.chatId
						})[0]
						console.log(nameActivChat.title)
						this.children.modalDel.setProps({subTitle: `Удалить чат: "${nameActivChat.title}"`})
						console.log(this.children.modalDel)
					}
					this.children.modalDel.show()
				}
			}
		});
		this.children.chatBtn = [chatBtn, chatBtnTwo, chatBtnThree];
		const profLink = new Link({
			label: 'Профиль',
			// classes: 'ya-btn ya-form__btn',
			to: '/settings',
			src: './../../assets/img/arrow_forward.svg',
			alt: 'Стрелка вперед'
		});
		this.children.profLink = profLink;
		// const chatList = [
		//   new ChatPanel({
		//     label: '',
		//     img: `https://ya-praktikum.tech/api/v2/resources${this.props.list.chats[0].avatar}`,
		//     title: `${this.props.list.chats[0].title}`,
		//     text: 'Изображение',
		//     time: '10:49',
		//     newMessage: '2',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Андрей',
		//     text: 'Изображение',
		//     time: '10:49',
		//     newMessage: '2',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Киноклуб',
		//     text: 'стикер',
		//     time: '12:00',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Илья',
		//     text: 'Друзья, у меня для вас особенный выпуск новостей!...',
		//     time: '15:12',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Вадим',
		//     text: 'Круто!',
		//     time: 'Пт',
		//     newMessage: '',
		//     classes: 'left-panel__chat left-panel__chat_active',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'тет-а-теты',
		//     text: 'И Human Interface Guidelines и Material Design рекомендуют...',
		//     time: 'Ср',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: '1, 2, 3',
		//     text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
		//     time: 'Пн',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Design Destroyer',
		//     text: 'В 2008 году художник Jon Rafman  начал собирать...',
		//     time: 'Пн',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Day.',
		//     text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
		//     time: '1 Мая 2020',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		//   new ChatPanel({
		//     label: '',
		//     img: './../../assets/img/default_square_image.svg',
		//     title: 'Стас Рогозин',
		//     text: 'Можно или сегодня или завтра вечером.',
		//     time: '12 Апр 2020',
		//     newMessage: '',
		//     classes: 'left-panel__chat',
		//   }),
		// ];
		// this.children.chatList = chatList;

		let chatsListBlocksSkel = [
			new ChatPanel({
				label: ''
			}),
			new ChatPanel({
				label: ''
			}),
		]
		// this.children.chatsListBlock = chatsListBlocks;
		// console.log('chat', store.getState())
		// console.log('chat', store.getState().user)
		// console.log('chat', store.getState().chat)
		const chatActive = new ChatActive({
			label: '',
			classes: 'ya-chat__right-panel',
		})

		this.children.chatActive = chatActive


		// console.log('CDU', store.getState())
		let chatsListBlocksRen: any[] = []
		let storeData = store.getState()
		// console.log('CDU_1', storeData)
		if (storeData.chat) {
			if (storeData.chat.list.chats) {

				// console.log('CDU_2', store.getState())
				// console.log('CDU_2_2', storeData.chat.list.chats)
				if (Object.keys(storeData.chat.list.chats).length !== 0) {
					if (typeof storeData.chat.list.chats !== 'undefined') {
						storeData.chat.list.chats.forEach((data: any) => {
							// console.log('CDU_3', data)
							let chatsList = new ChatPanel({
								label: '',
								img: `https://ya-praktikum.tech/api/v2/resources${data.avatar}`,
								title: `${data.title}`,
								text: '',
								time: '',
								newMessage: '',
								classes: 'left-panel__chat',
								onClick: (chatID) => {
									messageController.leave()
									// console.log('Чат', chatID)
									ChatController.requestMessageToken(chatID)
									store.set('chat.chatId', chatID || null);
									console.log('click',this)
									setTimeout(() => {
										// Подключится к чату
										const data = store.getState().chat.chatId
										// console.log(data)
										const tokenID = store.getState().chat.chatToken.token
										const userID = store.getState().user.id
										messageController.connect({
											userId: userID,
											chatId: data,
											token: tokenID
										})
										// console.log({
										// 	userId: userID,
										// 	chatId: data,
										// 	token: tokenID
										// })
									}, 300)
									this.children.chatsListBlock.map((item:any) => {
										if (item.props.id == chatID) {
											console.log('class',item)
											item.setProps({classes: 'left-panel__chat left-panel__chat_active'})
										}
									})
									console.log('click-init',this, chatID)
								},
								id: data.id
							});
							chatsListBlocksRen.push(chatsList);
						});
					}
				}
			}
		}
		this.children.chatsListBlock = chatsListBlocksRen || chatsListBlocksSkel;
		// console.log('дети', this.children.chatsListBlock)




		if (storeData.chat) {
			if (storeData.chat.chatId) {
				const chatActiveId = storeData.chat.chatId
				const chatActive = storeData.chat.list.chats.filter((elem: any) => {
					if (elem.id == chatActiveId) {
						return true
					}
					return false
				})[0] as any

				// const chatActive = {title: 'dfd'}
				// console.log('CDU-active', this.children.chatActive);
				(this.children.chatActive as Block).setProps({ title: chatActive.title || null });
				(this.children.chatActive as Block).setProps({ img: `https://ya-praktikum.tech/api/v2/resources${chatActive.avatar}` });

				// console.log(storeData)
				// console.log(chatActiveId, title, this.props.title)

			}
		}




		const modal = new Modal({
			label: '',
			subTitle: 'Добавить чат',
			classes: '',
			fields: 
			new Input({
        label: 'Название чата',
        idInput: 'chatName',
        type: 'text',
        classes: 'ya-field ya-modal__field',
        inputClasses: 'ya-field__input',

      }),
			footer:[
			new Button({
				label: 'Создать чат',
				events: {
					click: () => {

						// console.log(this.children.modal.children.fields.props.idInput)
						const valid = this.children.modal.children.fields.onValidate();
						// const valid = true
						const chatName = document.querySelector(`#${this.children.modal.children.fields.props.idInput}`)!.value;
						if (valid) {
	
	
						// Создание чата
						const chatNew = {
							"title": chatName
						}
						console.log('создание чата', chatNew)
						ChatController.create(chatNew)
						this.children.modal.hide()
						}
					},
				},
				classes: 'ya-btn ya-btn_main ya-form__btn',
			}),
			new Button({
				label: 'Отмена',
				events: {
					click: () => {
						this.children.modal.hide()
						// console.log(this.children.modal)
					}
				},
				classes: 'ya-btn ya-form__btn',
			})
		]


		})
		// console.log('modal',modal)
		this.children.modal = modal
		let nameActivChat = ''
		if (store.getState().chat) {
			console.log(store.getState().chat.list.chats)
			nameActivChat = store.getState().chat.list.chats.filter((item) => {
				console.log(item.id, item.id == store.getState().chat.chatId)
				return item.id == store.getState().chat.chatId
			})[0]
			console.log(nameActivChat.title)
		}

		const modalDel = new Modal({
			label: '',
			subTitle: `Удалить чат:${nameActivChat.title}`,
			classes: '',
			footer:[
			new Button({
				label: 'Удалить чат',
				events: {
					click: () => {

						// console.log(this.children.modal.children.fields.props.idInput)
						// const valid = this.children.modalDel.children.fields.onValidate();
						const valid = true
						// const chatName = document.querySelector(`#${this.children.modalDel.children.fields.props.idInput}`)!.value;
						if (valid) {
	
	
					// Удаление чата
					const data = {
						chatId: store.getState().chat.chatId
					}
					console.log('chat', data)
					ChatController.removeChat(data)

						this.children.modalDel.hide()
						}
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

	protected componentDidUpdate(): boolean {
		// console.log('CDU', store.getState())
		let chatsListBlocks: any[] = []
		let storeData = store.getState()
		// console.log('CDU_1', storeData.chat.list.chats)
		if (storeData.chat.list.chats) {

			// console.log('CDU_2', store.getState())
			// console.log('CDU_2_2', storeData.chat.list.chats)
			if (Object.keys(storeData.chat.list.chats).length !== 0) {
				if (typeof storeData.chat.list.chats !== 'undefined') {
					storeData.chat.list.chats.forEach((data: any) => {
						// console.log('CDU_3', data)
						let chatsList = new ChatPanel({
							label: '',
							img: `https://ya-praktikum.tech/api/v2/resources${data.avatar}`,
							title: `${data.title}`,
							text: '',
							time: '',
							newMessage: '',
							classes: 'left-panel__chat',
							onClick: (chatID) => {
								// console.log('Чат', chatID)
								ChatController.requestMessageToken(chatID)
								store.set('chat.chatId', chatID || null);
								setTimeout(() => {
									// Подключится к чату
									const data = store.getState().chat.chatId
									// console.log(data)
									const tokenID = store.getState().chat.chatToken.token
									const userID = store.getState().user.id
									messageController.connect({
										userId: userID,
										chatId: data,
										token: tokenID
									})
									// console.log({
									// 	userId: userID,
									// 	chatId: data,
									// 	token: tokenID
									// })
								}, 300);
								this.children.chatsListBlock.map((item:any) => {
									if (item.props.id == chatID) {
										console.log('class',item)
										item.setProps({classes: 'left-panel__chat left-panel__chat_active'})
									}
								})
								// (this.children.chatsListBlock as Array<Block>)[0].setProps({classes: 'left-panel__chat left-panel__chat_active'})
								console.log('click-CDU',this, chatID)
								addClassesActiv(chatID)
							},
							id: data.id
						});
						chatsListBlocks.push(chatsList);
					});
				}
			}
		}
		this.children.chatsListBlock = chatsListBlocks;
		// console.log('дети', this.children.chatsListBlock)
		// 	// this.dispatchComponentDidMount()


		if (storeData.chat) {
			if (storeData.chat.chatId) {
				const chatActiveId = storeData.chat.chatId
				const chatActive = storeData.chat.list.chats.filter((elem: any) => {
					if (elem.id == chatActiveId) {
						return true
					}
					return false
				})[0] as any

				// const chatActive = {title: 'dfd'}
				console.log('CDU-active', this.children.chatActive);
				console.log('CDU-active2', chatActive);
				(this.children.chatActive as Block).setProps({ title: chatActive.title || null });
				(this.children.chatActive as Block).setProps({ img: `https://ya-praktikum.tech/api/v2/resources${chatActive.avatar}` });

				// console.log(storeData)
				// console.log(chatActiveId, title, this.props.title)

			}
		}
		// const chatActive = new ChatActive({
		//   label: '',
		//   classes: 'ya-chat__right-panel',
		// })
		// this.children.chatActive = chatActive


		return true
	}

	componentDidMount(): void {



	}

	render() {
		// console.log('render', store.getState())
		// console.log('render', store.getState().user)
		// console.log('render', store.getState().hat)
		return this.compile(template, { ...this.props, styles });
	}
}


const withUser = withStore((state) => ({ ...state.chat }))

export const Chat = withUser(ChatBase);

// function addClassesActiv(chatID:number) {
// 	document.querySelectorAll('left-panel__chat')
// }