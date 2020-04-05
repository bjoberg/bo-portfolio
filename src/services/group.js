import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import getConfig from 'next/config';

import { Group } from '../models';

const { publicRuntimeConfig } = getConfig();

/**
 * Retrieve a single group based on id
 *
 * @param {string} id of the group to retrieve
 * @returns {{hasError: boolean, group: Group}}
 */
export const getGroup = async (id) => {
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/group/${id}`;
  const res = await fetch(route);
  let hasError = false;
  let group;
  if (res.status === httpStatus.OK) {
    const data = await res.json();
    group = new Group(data);
  } else {
    hasError = true;
  }

  return { hasError, group };
};

export const getGroupImages = async (id, limit = 30, page = 0) => {
  const paginationQuery = `?limit=${limit}&page=${page}`;
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/group/${id}/images${paginationQuery}`;
  const res = await fetch(route);
  let images;
  if (res.status === httpStatus.OK) {
    const data = await res.json();
    images = {
      hasError: false,
      limit: data.limit,
      page: data.page,
      totalItems: data.totalItems,
      pageCount: data.pageCount,
      rows: data.rows,
    };
  } else {
    images = {
      hasError: true,
    };
  }
  // TODO: Should return a list of Image objects
  return images;
};
