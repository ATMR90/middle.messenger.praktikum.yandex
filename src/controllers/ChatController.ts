import { router } from '..';
import store from '../utils/Store';
import API, { ChatAPI, ChatAPIAddUser, ChatAPICreate, ChatAPIDelete } from '../api/ChatAPI';
import MsgController from './MsgController';

export class ChatController {
  private readonly api: ChatAPI;
  constructor() {
    this.api = API;
  }

  public create(data: ChatAPICreate) {
    return this.api.create(data)
      .then((res: any) => {
        const chat = res.response;
        this.request();
        store.set('chat.chatId', chat.id || null);
        return chat.id;
      })
      .catch(e => {console.log(e);});
  }

  public async request() {
    return this.api.request()
      .then((res: any) => {
        store.set('chat.list.chats', res.response);
        if (!store.getState().chat.chatId) {
          store.set('chat.chatId', res.response[0]?.id || null);
        }

        res.response.map(async (chat: any) => {
          const token = await this.requestMessageToken(chat.id);
    
          await MsgController.connect(chat.id, token);
        });

        return res.response;
      })
      .catch((e) => {
        console.log('ошибка', e);
        router.go('/');
      });
  }

  public removeChat(data: ChatAPIDelete) {
    return this.api.removeChat(data)
      .then(() => {
        this.request();
      });
  }

  public addUserChat(data: ChatAPIAddUser) {
    return this.api.addUserChat(data)
      .then(() => { })
      .catch();
  }

  public deleteUserChat(data: ChatAPIAddUser) {
    return this.api.deleteUserChat(data)
      .then(() => { })
      .catch();
  }

  public requestMessageToken(chatId: number) {
    return this.api.requestMessageToken(chatId)
      .then((auth) => {
        store.set('chat.chatToken', auth.response || null);
        return auth.response.token;
      })
      .catch();
  }

  public requestChatUsers(chatId: number) {
    return this.api.requestChatUsers(chatId)
      .then((users) => {
        return users;
      })
      .catch();
  }

  public updateChatAvatar(data: FormData) {
    return this.api.updateChatAvatar(data)
      .then()
      .catch();
  }
}

export default new ChatController();
