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
}