import BaseAPI from './BaseAPI';

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

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(data: SignInData) {
    return this.http.post('/signin', { headers: {
			'Content-Type': 'application/json',
		}, data: JSON.stringify(data) });
  }


  signUp(data: SignUpData) {
    return this.http.post('/signup', { headers: {
			'Content-Type': 'application/json',
		}, data: JSON.stringify(data) });
  }

  read() {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();