import axios from 'axios';
import ApiError from '../models/api-error.model';

export default class GroupService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a single group based on id
   * @param {string} id of the group to retrieve
   * @returns {JSON} group object
   * @throws ApiError
   */
  async getGroup(id) {
    try {
      const response = await this.service({
        method: 'get',
        url: `/api/v1/group/${id}`,
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, `Error retrieving group: ${id}`);
    }
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
        url: '/api/v1/groups',
      });

      return response.data.rows;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve groups');
    }
  }

  /**
   * Delete a single group based on id
   * @param {string} id of the group to delete
   * @returns number of rows destroyed
   * @throws ApiError
   */
  async deleteGroup(id) {
    try {
      return await this.service({
        method: 'delete',
        url: `/api/v1/group/${id}`,
      });
    } catch (error) {
      throw new ApiError(500, `Error deleting group: ${id}`);
    }
  }

  /**
   * Update a single group based on id
   * @param {JSON} group object to be updated
   * @returns {JSON} group object
   * @throws ApiError
   */
  async updateGroup(group) {
    try {
      const response = await this.service({
        method: 'put',
        url: `/api/v1/group/${group.id}`,
        data: {
          ...group,
        },
      });

      return {
        count: response.data[0],
        data: response.data[1][0],
      };
    } catch (error) {
      throw new ApiError(500, `Error updating group: ${group.id}`);
    }
  }

  /**
   * Create a single group
   * @param {JSON} group object to be created
   * @returns {JSON} group object
   * @throws ApiError
   */
  async createGroup(group) {
    try {
      const response = await this.service({
        method: 'post',
        url: '/api/v1/group',
        data: {
          thumbnailUrl: group.thumbnailUrl,
          imageUrl: group.imageUrl,
          title: group.title,
          description: group.description,
        },
      });

      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Error creating group');
    }
  }
}
