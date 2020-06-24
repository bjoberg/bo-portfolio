import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import getConfig from 'next/config';

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
  const searchParams = new URLSearchParams();
  searchParams.append('limit', limit);
  searchParams.append('page', page);
  if (sort) searchParams.append('sort', sort);
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/images?${searchParams.toString()}`;
  const res = await fetch(route);
  if (res.status === httpStatus.OK) {
    const json = await res.json();
    return json;
  }
  throw new Error('Unable to retrieve images');
};

// eslint-disable-next-line import/prefer-default-export
export { getImages };
