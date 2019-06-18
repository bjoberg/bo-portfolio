import axios from 'axios';
import { Image } from '../models';

/**
 * Service for reading, updating, and creating images
 */
export default class ImageService {
  /**
   * Retrieve a single image based on id
   * @param {string} id of the image to retrieve
   * @returns {Image|undefined} image object; otherwise undefined
   */
  async getImage(id) {
    try {
      const response = await axios({
        method: 'get',
        url: `/image/${id}`
      });

      return new Image(response.data);
    } catch (error) {
      return undefined;
    }
  }
}