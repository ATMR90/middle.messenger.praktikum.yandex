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



    let chatsListBlocks: any[] = []
    let storeData = store.getState()
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
              console.log('Чат', chatID)
              ChatController.requestMessageToken(chatID)
              store.set('chat.chatId', chatID || null);
              setTimeout(() => {
                // Подключится к чату
                const data = store.getState().chat.chatId
                console.log(data)
                const tokenID = store.getState().chat.chatToken.token
                const userID = store.getState().user.id
                messageController.connect({
                  userId: userID,
                  chatId: data,
                  token: tokenID
                })
                console.log({
                  userId: userID,
                  chatId: data,
                  token: tokenID
                })
              }, 300)
            },
            id: data.id
          });
          chatsListBlocks.push(chatsList);
        });
      }
    }
    this.children.chatsListBlock = chatsListBlocks;

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
          messageController.leave()

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
                console.log(file)
                const formData = new FormData();
                formData.append('chatId', chatID);
                formData.append('avatar', file);
                console.log(formData, formData.get('avatar'), typeof formData.get('chatId'))
                ChatController.updateChatAvatar(formData);
                // работает! Загрузка аватара чата
              }

              // UserController.updateAvatar()
              console.log('button чат');
            }
          });

          root.innerHTML = '';
          root.append(changeAvatar.getContent()!);
        }
      }
    });
    this.children.chatBtn = [chatBtn, chatBtnTwo];
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

    const chatActive = new ChatActive({
      label: '',
      classes: 'ya-chat__right-panel',
    })

    this.children.chatActive = chatActive



  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}


const withUser = withStore((state) => ({ ...state.chat }))

export const Chat = withUser(ChatBase);