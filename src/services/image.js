import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

/**
 * Retrieve list of images
 *
* @param {number} limit number of items to retrieve
 * @param {number} page offset of items
 * @throws {Error} if there is something wrong with the request
 */
const getImages = async (limit = 30, page = 0) => {
  const paginationQuery = `?limit=${limit}&page=${page}`;
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/images${paginationQuery}`;
  const res = await fetch(route);
  if (res.status === httpStatus.OK) {
    const json = await res.json();
    return json;
  }
  throw new Error('Unable to retrieve images');
};

// eslint-disable-next-line import/prefer-default-export
export { getImages };
