import axios from 'axios';
import ApiError from '../models/api-error.model';

export default class UserService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve information about the session's user
   * @returns {JSON} user object
   * @throws ApiError
   */
  async getUserInfo() {
    try {
      const response = await this.service({
        method: 'get',
        url: '/api/v1/userinfo',
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve user info');
    }
  }
}
