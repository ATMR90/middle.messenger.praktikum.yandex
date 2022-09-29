import { HTTPTransport } from "../utils/HTTPTransport";


export interface ChatAPICreate {
  title: string;
}

export interface ChatAPIDelete {
  chatId: number;
}

export interface ChatAPIAddUser {
  users: number [];
  chatId: number;
}

export class ChatAPI {
	protected http: HTTPTransport;
	static API_URL = process.env.API_URL || 'https://ya-praktikum.tech/api/v2';
  constructor() {
		this.http = new HTTPTransport(ChatAPI.API_URL,'/chats');
  }

  public create(data: ChatAPICreate):Promise<XMLHttpRequest> {
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

  public request():Promise<XMLHttpRequest> {
    const res = this.http.get('/', {
    });
    return res;
  }

  public removeChat(data: ChatAPIDelete):Promise<XMLHttpRequest> {
    return this.http.delete('/', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public addUserChat(data: ChatAPIAddUser):Promise<XMLHttpRequest> {
    return this.http.put('/users', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public deleteUserChat(data: ChatAPIAddUser):Promise<XMLHttpRequest> {
    return this.http.delete('/users', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public requestMessageToken(chatId: number):Promise<XMLHttpRequest> {
    return this.http.post(`/token/${chatId}`, {
    });
  }

  public requestChatUsers(chatId: number):Promise<XMLHttpRequest> {
    return this.http.get(`/${chatId}/users`, {
    });
  }
  
  public updateChatAvatar(data: FormData):Promise<XMLHttpRequest> {
    return this.http.put('/avatar', { headers: {
      'accept': 'application/json',
    }, data: data });
  }
}

export default new ChatAPI();
