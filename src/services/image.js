import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import getConfig from 'next/config';
import { getQueryString } from '../utils/helpers';

const { publicRuntimeConfig } = getConfig();

/**
 * Retrieve list of images.
 *
 * @param {string} sort field and direction to sort on. (Ex: capture_date:desc)
 * @param {number} limit number of items to retrieve
 * @param {number} page offset of items
 * @throws {Error} if there is something wrong with the request
 */
const getImages = async (sort, limit = 30, page = 0) => {
  const queryDict = { sort, limit, page };
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/images?${getQueryString(queryDict)}`;
  const res = await fetch(route);
  if (res.status === httpStatus.OK) {
    const json = await res.json();
    return json;
  }
  throw new Error('Unable to retrieve images');
};

// eslint-disable-next-line import/prefer-default-export
export { getImages };
