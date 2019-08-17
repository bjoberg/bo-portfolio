import ApiError from '../models/api-error.model';
import EntityType from '../utils/constants';
import GroupService from './group.service';
import ImageService from './image.service';
import imageObj from '../models/image.model';
import groupObj from '../models/group.model';

export default class EntityService {
  constructor() {
    this.imageService = new ImageService();
    this.groupService = new GroupService();
    this.entityBase = {};
  }

  /**
   * Get a new, empty object based on type
   * @param {string} type of entity to get
   */
  getNewEntityObject(type) {
    switch (type) {
      case EntityType.IMAGE:
        this.entityBase = imageObj;
        break;
      case EntityType.GROUP:
        this.entityBase = groupObj;
        break;
      default:
        this.entityBase = {};
        break;
    }
    return this.entityBase;
  }

  /**
   * Get an entity based on its type and id.
   * @param {string} type of entity to get
   * @param {string} id of the entity to get
   * @returns Promise that resolves to the defined entity
   * @throws API Error
   */
  async getEntityAsync(type, id) {
    switch (type) {
      case EntityType.IMAGE:
        return this.imageService.getImage(id);
      case EntityType.GROUP:
        return this.groupService.getGroup(id);
      default:
        throw new ApiError(500, `Error getting ${type} with id: ${id}`);
    }
  }

  /**
   * Create an entity based on its type and object definition
   * @param {string} type of entity to create
   * @param {string} entity object representing entity to create
   * @returns Promise that creates the defined entity
   * @throws API Error
   */
  async createEntityAsync(type, entity) {
    switch (type) {
      case EntityType.IMAGE:
        return this.imageService.createImage(entity);
      case EntityType.GROUP:
        return this.groupService.createGroup(entity);
      default:
        throw new ApiError(500, `Error creating ${type}`);
    }
  }

  /**
   * Update an entity based on its type and object definition
   * @param {string} type of entity to update
   * @param {string} entity object representing entity to update
   * @returns Promise that updates the defined entity
   * @throws API Error
   */
  async updateEntityAsync(type, entity) {
    switch (type) {
      case EntityType.IMAGE:
        return this.imageService.updateImage(entity);
      case EntityType.GROUP:
        return this.groupService.updateGroup(entity);
      default:
        throw new ApiError(500, `Error updating ${type}`);
    }
  }

  /**
   * Delete an entity based on its type and id.
   * @param {string} type of entity to delete
   * @param {string} id of the entity to delete
   * @returns Promise that deletes the defined entity
   * @throws API Error
   */
  async deleteEntityAsync(type, id) {
    switch (type) {
      case EntityType.IMAGE:
        return this.imageService.deleteImage(id);
      case EntityType.GROUP:
        return this.groupService.deleteGroup(id);
      default:
        throw new ApiError(500, `Error deleting ${type} with id: ${id}`);
    }
  }
}
