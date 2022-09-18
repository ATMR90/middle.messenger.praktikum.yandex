import BaseAPI from './BaseAPI';


export interface UserAPIUpdateProfile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(data: UserAPIUpdateProfile) {
    return this.http.put('/profile', {data: data});
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();