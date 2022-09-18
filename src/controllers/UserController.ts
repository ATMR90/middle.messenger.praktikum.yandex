import { router } from './../index';
// import API, { AuthAPI, SignInData, SignUpData } from '../api/AuthAPI';
import store from '../utils/Store';
import API, { UserAPI, UserAPIUpdateProfile } from '../api/UserAPI';
import AuthController from './AuthController';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: UserAPIUpdateProfile) {
		try {
			await this.api.updateProfile(data);
			AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

}

export default new UserController();