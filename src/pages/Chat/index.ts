import { Button } from '../../components/Button';
import { ChangeAvatar } from '../../components/ChangeAvatar';
import { ChatActive } from '../../components/ChatActive';
import { ChatPanel } from '../../components/ChatPanel';
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';
import ChatController from '../../controllers/ChatController';
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
		const chatBtn = new Button({
			label: 'Создать чат',
			classes: 'ya-btn ya-btn_main ya-form__btn',
			events: {
				click: () => {
					this.children.modal.show();
				},
			},
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
							const avatarInput = document.querySelector('#avatarInput') as HTMLInputElement;
							if (avatarInput !== null) {
								const { files }: { files: FileList | null } = (avatarInput as HTMLInputElement);
								const [file] = files;
								const chatID = Number(this.props.chatId);
								const formData = new FormData();
								formData.append('chatId', chatID);
								formData.append('avatar', file);
								ChatController.updateChatAvatar(formData);
							}
						},
					});
					root.innerHTML = '';
					root.append(changeAvatar.getContent()!);
				},
			},
		});
		const chatBtnThree = new Button({
			label: 'Удалить чат',
			classes: 'ya-btn ya-btn_red ya-form__btn',
			events: {
				click: () => {
					let nameActivChat = '';
					if (store.getState().chat) {
						nameActivChat = store.getState().chat.list.chats.filter((item) => {
							return item.id == store.getState().chat.chatId;
						})[0];
						this.children.modalDel.setProps({ subTitle: `Удалить чат: "${nameActivChat.title}"` });
					}
					this.children.modalDel.show();
				},
			},
		});
		this.children.chatBtn = [chatBtn, chatBtnTwo, chatBtnThree];
		const profLink = new Link({
			label: 'Профиль',
			to: '/settings',
			src: './../../assets/img/arrow_forward.svg',
			alt: 'Стрелка вперед',
		});
		this.children.profLink = profLink;
		let chatsListBlocksSkel = [
			new ChatPanel({
				label: '',
			}),
			new ChatPanel({
				label: '',
			}),
		];
		const chatActive = new ChatActive({
			label: '',
			classes: 'ya-chat__right-panel',
		});
		this.children.chatActive = chatActive;
		let chatsListBlocksRen: any[] = [];
		let storeData = store.getState();
		if (storeData.chat) {
			if (storeData.chat.list.chats) {
				if (Object.keys(storeData.chat.list.chats).length !== 0) {
					if (typeof storeData.chat.list.chats !== 'undefined') {
						storeData.chat.list.chats.forEach((data: any) => {
							let chatsList = new ChatPanel({
								label: '',
								img: `https://ya-praktikum.tech/api/v2/resources${data.avatar}`,
								title: `${data.title}`,
								text: '',
								time: '',
								newMessage: '',
								classes: 'left-panel__chat',
								onClick: (chatID) => {
									messageController.leave();
									ChatController.requestMessageToken(chatID);
									store.set('chat.chatId', chatID || null);
									setTimeout(() => {
										const data = store.getState().chat.chatId;
										const tokenID = store.getState().chat.chatToken.token;
										const userID = store.getState().user.id;
										messageController.connect({
											userId: userID,
											chatId: data,
											token: tokenID,
										});
									}, 300);
									this.children.chatsListBlock.map((item:any) => {
										if (item.props.id == chatID) {
											item.setProps({ classes: 'left-panel__chat left-panel__chat_active' });
										}
									});
								},
								id: data.id,
							});
							chatsListBlocksRen.push(chatsList);
						});
					}
				}
			}
		}
		this.children.chatsListBlock = chatsListBlocksRen || chatsListBlocksSkel;
		if (storeData.chat) {
			if (storeData.chat.chatId) {
				const chatActiveId = storeData.chat.chatId;
				const chatActive = storeData.chat.list.chats.filter((elem: any) => {
					if (elem.id == chatActiveId) {
						return true;
					}
					return false;
				})[0] as any;
				(this.children.chatActive as Block).setProps({ title: chatActive.title || null });
				(this.children.chatActive as Block).setProps({ img: `https://ya-praktikum.tech/api/v2/resources${chatActive.avatar}` });
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
							const valid = this.children.modal.children.fields.onValidate();
							const chatName = document.querySelector(`#${this.children.modal.children.fields.props.idInput}`)!.value;
							if (valid) {
							const chatNew = {
								'title': chatName,
							};
							ChatController.create(chatNew);
							this.children.modal.hide();
							}
						},
					},
					classes: 'ya-btn ya-btn_main ya-form__btn',
				}),
				new Button({
					label: 'Отмена',
					events: {
						click: () => {
							this.children.modal.hide();
						},
					},
					classes: 'ya-btn ya-form__btn',
				}),
			],
		});
		this.children.modal = modal;
		let nameActivChat = '';
		if (store.getState().chat) {
			nameActivChat = store.getState().chat.list.chats.filter((item) => {
				return item.id == store.getState().chat.chatId;
			})[0];
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
							const valid = true;
							if (valid) {
								const data = {
									chatId: store.getState().chat.chatId,
								};
							ChatController.removeChat(data);
							this.children.modalDel.hide();
							}
						},
					},
					classes: 'ya-btn ya-btn_red ya-form__btn',
				}),
				new Button({
					label: 'Отмена',
					events: {
						click: () => {
							this.children.modalDel.hide();
						},
					},
					classes: 'ya-btn ya-form__btn',
				}),
			],
		});
		this.children.modalDel = modalDel;
	}

	protected componentDidUpdate(): boolean {
		let chatsListBlocks: any[] = [];
		let storeData = store.getState();
		if (storeData.chat.list.chats) {
			if (Object.keys(storeData.chat.list.chats).length !== 0) {
				if (typeof storeData.chat.list.chats !== 'undefined') {
					storeData.chat.list.chats.forEach((data: any) => {
						let chatsList = new ChatPanel({
							label: '',
							img: `https://ya-praktikum.tech/api/v2/resources${data.avatar}`,
							title: `${data.title}`,
							text: '',
							time: '',
							newMessage: '',
							classes: 'left-panel__chat',
							onClick: (chatID) => {
								ChatController.requestMessageToken(chatID);
								store.set('chat.chatId', chatID || null);
								setTimeout(() => {
									const data = store.getState().chat.chatId;
									const tokenID = store.getState().chat.chatToken.token;
									const userID = store.getState().user.id;
									messageController.connect({
										userId: userID,
										chatId: data,
										token: tokenID,
									});
								}, 300);
								this.children.chatsListBlock.map((item:any) => {
									if (item.props.id == chatID) {
										item.setProps({ classes: 'left-panel__chat left-panel__chat_active' });
									}
								});
							},
							id: data.id,
						});
						chatsListBlocks.push(chatsList);
					});
				}
			}
		}
		this.children.chatsListBlock = chatsListBlocks;
		if (storeData.chat) {
			if (storeData.chat.chatId) {
				const chatActiveId = storeData.chat.chatId;
				const chatActive = storeData.chat.list.chats.filter((elem: any) => {
					if (elem.id == chatActiveId) {
						return true;
					}
					return false;
				})[0] as any;
				(this.children.chatActive as Block).setProps({ title: chatActive.title || null });
				(this.children.chatActive as Block).setProps({ img: `https://ya-praktikum.tech/api/v2/resources${chatActive.avatar}` });
			}
		}
		return true;
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}

const withUser = withStore((state) => ({ ...state.chat }));

export const Chat = withUser(ChatBase);
