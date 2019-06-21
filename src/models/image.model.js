/**
 * Image model definition
 */
export default class Image {
  id;
  thumbnailUrl;
  imageUrl;
  title;
  description;
  location;

  constructor(data) {
    Object.assign(this, data);
  }

  /**
   * Reset all image values
   */
  reset() {
    this.id = '';
    this.thumbnailUrl = '';
    this.imageUrl = '';
    this.title = '';
    this.description = '';
    this.location = '';
  }
}