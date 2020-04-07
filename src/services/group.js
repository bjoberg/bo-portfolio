import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import getConfig from 'next/config';

import { Group, Image } from '../models';

const { publicRuntimeConfig } = getConfig();

/**
 * Retrieve a single group based on id
 *
 * @param {string} id of the group to retrieve
 * @returns {Group}
 * @throws {Error} if there is something wrong with the request
 */
export const getGroup = async (id) => {
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/group/${id}`;
  const res = await fetch(route);
  let group;
  if (res.status === httpStatus.OK) {
    const json = await res.json();
    group = new Group(json);
  } else {
    throw new Error(`Unable to retrieve group ${id}`);
  }

  return group;
};

/**
 * Retrieve a list of images associated with the provided group id
 *
 * @param {string} id of the group to retrieve images for
 * @param {number} limit number of items to retrieve
 * @param {number} page offset of items
 * @returns {[Image]}
 * @throws {Error} if there is something wrong with the request
 */
export const getGroupImages = async (id, limit = 30, page = 0) => {
  const paginationQuery = `?limit=${limit}&page=${page}`;
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/group/${id}/images${paginationQuery}`;
  const res = await fetch(route);
  const images = [];
  if (res.status === httpStatus.OK) {
    const json = await res.json();
    json.rows.forEach((image) => {
      images.push(new Image(image));
    });
  } else {
    throw new Error(`Unable to retrieve images in group ${id}`);
  }
  return images;
};
