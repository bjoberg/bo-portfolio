import axios from 'axios';

import HttpMethods from '../models/http-methods';
import ApiError from '../models/api-error.model';

export default class ImageService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a single image based on id
   *
   * @param {string} id of the image to retrieve
   * @returns {JSON} image object
   * @throws ApiError
   */
  async getImage(id) {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/image/${id}`,
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, `Error retrieving image: ${id}`);
    }
  }

  /**
   * Retrieve a list of images
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @returns {JSON} object of images
   * @throws ApiError
   */
  async getImages(limit = 30, page = 0) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/images${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve images.');
    }
  }

  /**
   * Retrieve a list of image for a specific group
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @param {string} groupId unique id of group to get images for
   */
  async getImagesForGroup(limit = 30, page = 0, groupId = undefined) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/group/${groupId}/images${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve images for group.');
    }
  }

  /**
   * Delete a single image based on id
   *
   * @param {string} id of the image to delete
   * @returns number of rows destroyed
   * @throws ApiError
   */
  async deleteImage(id) {
    try {
      return await this.service({
        method: HttpMethods.delete,
        url: `/api/v1/image/${id}`,
      });
    } catch (error) {
      throw new ApiError(500, `Error deleting image: ${id}`);
    }
  }

  /**
   * Update a single image based on id
   *
   * @param {JSON} image object to be updated
   * @returns {JSON} image object
   * @throws ApiError
   */
  async updateImage(image) {
    try {
      const response = await this.service({
        method: HttpMethods.put,
        url: `/api/v1/image/${image.id}`,
        data: {
          ...image,
        },
      });

      return {
        count: response.data[0],
        data: response.data[1][0],
      };
    } catch (error) {
      throw new ApiError(500, `Error updating image: ${image.id}`);
    }
  }

  /**
   * Create a single image
   *
   * @param {JSON} image object to be created
   * @returns {JSON} image object
   * @throws ApiError
   */
  async createImage(image) {
    try {
      const response = await this.service({
        method: HttpMethods.post,
        url: '/api/v1/image',
        data: {
          thumbnailUrl: image.thumbnailUrl,
          imageUrl: image.imageUrl,
          title: image.title,
          description: image.description,
          location: image.location,
        },
      });

      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Error creating image');
    }
  }
}
