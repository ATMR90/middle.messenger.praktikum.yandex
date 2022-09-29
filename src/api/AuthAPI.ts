import { HTTPTransport } from '../utils/HTTPTransport';

export interface SignInData {
  login: string;
  password: string;
}

export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
  avatar: string;
}

export class AuthAPI {
	protected http: HTTPTransport;
	static API_URL = process.env.API_URL || 'https://ya-praktikum.tech/api/v2';
  constructor() {
		this.http = new HTTPTransport(AuthAPI.API_URL,'/auth');
  }

  signIn(data: SignInData):Promise<XMLHttpRequest> {
    return this.http.post('/signin', { headers: {
			'Content-Type': 'application/json',
		}, data: JSON.stringify(data) });
  }


  signUp(data: SignUpData):Promise<XMLHttpRequest> {
    return this.http.post('/signup', { headers: {
			'Content-Type': 'application/json',
		}, data: JSON.stringify(data) });
  }

  read():Promise<XMLHttpRequest> {
    return this.http.get('/user');
  }

  logout():Promise<XMLHttpRequest> {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
