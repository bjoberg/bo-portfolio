import axios from 'axios';
import { ApiError, Image } from '../models';

/**
 * Service for reading, updating, and creating images
 */
export default class ImageService {
  /**
   * Retrieve a single image based on id
   * @param {string} id of the image to retrieve
   * @returns {Image} image object; otherwise undefined
   * @throws {ApiError}
   */
  async getImage(id) {
    try {
      const response = await axios({
        method: 'get',
        url: `/image/${id}`
      });

      return new Image(response.data);
    } catch (error) {
      throw new ApiError(404, `Error retrieving image: ${id}`);
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
      return await axios({
        method: 'delete',
        url: `/image/${id}`
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(500, `Error deleting image: ${id}`);
    }
  }
}