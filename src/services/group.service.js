import axios from 'axios';
import ApiError from '../models/api-error.model';

export default class GroupService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a list of groups
   * @returns {JSON} object of groups
   * @throws ApiError
   */
  async getGroups() {
    try {
      const response = await this.service({
        method: 'get',
        url: '/groups',
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve groups');
    }
  }
}
