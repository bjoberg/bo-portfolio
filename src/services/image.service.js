import axios from 'axios';
import ApiError from '../models/api-error.model';

export default class ImageService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a single image based on id
   * @param {string} id of the image to retrieve
   * @returns {JSON} image object
   * @throws ApiError
   */
  async getImage(id) {
    try {
      const response = await this.service({
        method: 'get',
        url: `/image/${id}`,
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, `Error retrieving image: ${id}`);
    }
  }

  /**
   * Retrieve a list of images
   * @returns {JSON} object of images
   * @throws ApiError
   */
  async getImages() {
    try {
      const response = await this.service({
        method: 'get',
        url: '/images',
      });

      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Unable to retrieve images');
    }
  }

  /**
   * Delete a single image based on id
   * @param {string} id of the image to delete
   * @returns number of rows destroyed
   * @throws ApiError
   */
  async deleteImage(id) {
    try {
      return await this.service({
        method: 'delete',
        url: `/image/${id}`,
      });
    } catch (error) {
      throw new ApiError(500, `Error deleting image: ${id}`);
    }
  }

  /**
   * Update a single image based on id
   * @param {JSON} image object to be updated
   * @returns {JSON} image object
   * @throws ApiError
   */
  async updateImage(image) {
    try {
      const response = await this.service({
        method: 'put',
        url: `/image/${image.id}`,
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
   * @param {JSON} image object to be created
   * @returns {JSON} image object
   * @throws ApiError
   */
  async createImage(image) {
    try {
      const response = await this.service({
        method: 'post',
        url: '/image',
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
