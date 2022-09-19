import BaseAPI from './BaseAPI';


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

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(data: UserAPIUpdateProfile) {
    return this.http.put('/profile', {headers: {
			'Content-Type': 'application/json'
		},data: JSON.stringify(data)});
  }
	
  public updatePassword(data: UserAPIUpdatePassword) {
    return this.http.put('/password', {headers: {
			'Content-Type': 'application/json'
		},data: JSON.stringify(data)});
  }
	
  public updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', {headers: {
			'accept': 'application/json',
			// 'Content-Type': 'multipart/form-data',
		},data: data});
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();