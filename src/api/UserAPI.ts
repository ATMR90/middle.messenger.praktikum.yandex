import { HTTPTransport } from '../utils/HTTPTransport';

export interface UserAPIUpdateProfile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface UserAPIUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UserAPISearch {
  login: string
}

export class UserAPI {
  protected http: HTTPTransport;
  static API_URL = process.env.API_URL || 'https://ya-praktikum.tech/api/v2';
  constructor() {
    this.http = new HTTPTransport(UserAPI.API_URL, '/user');
  }

  public searchProfile(data: UserAPISearch):Promise<XMLHttpRequest> {
    return this.http.post('/search', { 
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  public updateProfile(data: UserAPIUpdateProfile):Promise<XMLHttpRequest> {
    return this.http.put('/profile', { headers: {
      'Content-Type': 'application/json',
    }, data: JSON.stringify(data) });
  }
  
  public updatePassword(data: UserAPIUpdatePassword):Promise<XMLHttpRequest> {
    return this.http.put('/password', { headers: {
      'Content-Type': 'application/json',
    }, data: JSON.stringify(data) });
  }
  
  public updateAvatar(data: FormData):Promise<XMLHttpRequest> {
    return this.http.put('/profile/avatar', { headers: {
      'accept': 'application/json',
    }, data: data });
  }
}

export default new UserAPI();
