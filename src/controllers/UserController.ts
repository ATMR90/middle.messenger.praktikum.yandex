import { router } from './../index';
// import API, { AuthAPI, SignInData, SignUpData } from '../api/AuthAPI';
import store from '../utils/Store';
import API, { UserAPI, UserAPISearch, UserAPIUpdatePassword, UserAPIUpdateProfile } from '../api/UserAPI';
import AuthController from './AuthController';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

	async searchProfile(data: UserAPISearch) {
		try {
			return await this.api.searchProfile(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateProfile(data: UserAPIUpdateProfile) {
		try {
			await this.api.updateProfile(data);
			AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

	async updatePassword(data: UserAPIUpdatePassword) {
		try {
			await this.api.updatePassword(data);
			AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }
	
	async updateAvatar(data: FormData) {
		try {
			await this.api.updateAvatar(data);
			AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new UserController();