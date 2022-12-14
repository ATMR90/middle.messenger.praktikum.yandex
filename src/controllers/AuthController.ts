import { router } from './../index';
import store from '../utils/Store';
import API, { AuthAPI, SignInData, SignUpData } from '../api/AuthAPI';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SignInData) {
    try {
      const response = await this.api.signIn(data);
      store.set('responseSignin', response);
      await this.fetchUser();
      router.go('/messenger');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignUpData) {
    try {
      const response = await this.api.signUp(data);
      await this.fetchUser();
      store.set('responseSignup', response);
      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    let response = await this.api.read();
    if (response.status < 400) {
      response = response.response;
    } else {
      throw new Error(`Ошибка: ${response.status}`);
    }
    store.set('user', response);
  }

  async logout() {
    try {
      const response = await this.api.logout();
      store.set('responseLogout', response);
      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
