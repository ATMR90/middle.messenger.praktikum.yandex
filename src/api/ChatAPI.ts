import BaseAPI from './BaseAPI';

export interface ChatAPICreate {
  title: string
}

export interface ChatAPIAddUser {
  users: number []
  chatId: number
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create(data: ChatAPICreate) {
    const res = this.http.post('/', 
    { 
      headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
    return res;
  }

  public request() {
    const res = this.http.get('/', {
    });
    return res;
  }

  public removeChat(data: any) {
    return this.http.delete('/', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public addUserChat(data: ChatAPIAddUser) {
    return this.http.put('/users', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public deleteUserChat(data: ChatAPIAddUser) {
    return this.http.delete('/users', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public requestMessageToken(chatId: number) {
    return this.http.post(`/token/${chatId}`, {
    });
  }

  public requestChatUsers(chatId: number) {
    return this.http.get(`/${chatId}/users`, {
    });
  }
  
  public updateChatAvatar(data: FormData) {
    return this.http.put('/avatar', { headers: {
      'accept': 'application/json',
    }, data: data });
  }

  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatAPI();