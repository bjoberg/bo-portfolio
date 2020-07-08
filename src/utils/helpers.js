import { SortMappings } from '../constants';

/**
 * Evaluate if a paginated network request is on the last page or not
 *
 * @param {number} total total number of elements in the query
 * @param {number} offset number of elements in each request. Also referred to as "page"
 * @param {number} nextPage page of next pagination request
 */
export const isAtEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

/**
 * Navigate one page back in history
 * @param {string} prevRoute the expected previous route to naviate back to
 */
export const goBack = (prevRoute) => {
  try {
    const url = new URL(document.referrer);
    if (!url || url.pathname !== prevRoute) window.location.href = prevRoute;
    else window.history.back();
  } catch (error) {
    window.location.href = prevRoute;
  }
};

/**
 * Create a query string with the provided dictionary.
 *
 * @param {object} dictionary key value pair of query items
 * @returns {string} query string
 */
export const getQueryString = (dictionary) => {
  if (!dictionary) return '';
  if (typeof dictionary !== 'object') return '';
  const queryString = new URLSearchParams();
  Object.keys(dictionary).forEach((key) => {
    queryString.append(key, dictionary[key]);
  });
  return queryString.toString();
};

/**
 * Controller for managing a page's sort query param
 */
export class SortController {
  /**
   * Check to see if the proposed sort query is valid or not.
   *
   * @param {string} sortQuery query string being validate (Ex: capture_date:asc)
   * @param {[{query: string}]} sortOptions list of sort options to validate against
   * @returns {boolean} true if query exists in provided options; otherwise false
   */
  static isValidSortQuery(sortQuery, sortOptions) {
    let isValid = false;
    sortOptions.forEach((option) => {
      if (option.query === sortQuery) isValid = true;
    });
    return isValid;
  }

  /**
   * Get the sort query based on the request.
   *
   * @param {string} requestedSortQuery sort query requested
   * @param {string} fallbackSortQuery sort query to fallback on if something fails
   * @param {[{query: string}]} sortOptions list of sort options to validate against
   * @returns {string} sort query string
   */
  static getSortQuery(requestedSortQuery, fallbackSortQuery, sortOptions) {
    let sortQuery = requestedSortQuery;
    if (!sortQuery || !SortController.isValidSortQuery(sortQuery, sortOptions)) {
      sortQuery = fallbackSortQuery;
    }
    return sortQuery;
  }

  /**
   * Get sort object based on provided query.
   *
   * @param {string} sortQuery sort query to search for
   * @returns {object|undefined} sort object of the provided sort query; otherwise undefined
   */
  static getSortByQuery(sortQuery) {
    let sort;
    Object.keys(SortMappings).forEach((key) => {
      if (SortMappings[key].query === sortQuery) sort = SortMappings[key];
    });
    return sort;
  }

  /**
   * Get sort object based on provided id.
   *
   * @param {string} sortId sort id to search for
   * @returns {object|undefined} sort object of the provided sort query; otherwise undefined
   */
  static getSortById(sortId) {
    let sort;
    Object.keys(SortMappings).forEach((key) => {
      if (SortMappings[key].id === sortId) sort = SortMappings[key];
    });
    return sort;
  }
}
