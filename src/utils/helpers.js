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
  let queryString = '';
  Object.keys(dictionary).forEach((key, index) => {
    if (index === 0) queryString = `?${key}=${dictionary[key]}`;
    else queryString = `${queryString}&${key}=${dictionary[key]}`;
  });
  return queryString;
};
