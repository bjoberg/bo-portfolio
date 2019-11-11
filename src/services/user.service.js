import axios from 'axios';

import HttpMethods from '../models/http-methods';
import ApiError from '../models/api-error.model';

export default class UserService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve information about the session's user
   * @returns {JSON} user object
   * @throws {ApiError}
   */
  async getUserInfo() {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: '/api/v1/userinfo',
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve user info');
    }
  }

  /**
   * Retrieve role information about the provided google id
   * @param {string} googleId to retrieve role information details for
   * @returns {JSON} role details
   * @throws {ApiError}
   */
  async getUserRole(googleId) {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/user/${googleId}/role`,
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve user role');
    }
  }
}
