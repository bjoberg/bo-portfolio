export default class Image {
  constructor({
    id,
    thumbnailUrl,
    imageUrl,
    title,
    description,
    location,
    width,
    height,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.thumbnailUrl = thumbnailUrl;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.location = location;
    this.width = width;
    this.height = height;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
