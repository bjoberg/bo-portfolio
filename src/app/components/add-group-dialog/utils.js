/**
 * Validate the provided value as a group title
 *
 * @param {string} title value of the title
 */
const isValidTitle = (title) => {
  if (!title || title.length === 0) throw new Error('Title is required');
  if (title.length > 255) throw new Error('Title cannot be more than 255 characters');
  return true;
};

/**
 * Validate the provided value as a group description
 *
 * @param {string} description value of the description
 */
const isValidDescription = (description) => {
  if (description.length > 1234) throw new Error('Description cannot be more than 1234 characters');
  return true;
};

/**
 * Validate the provided string as a url
 *
 * Resource: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param {string} url value of the url
 */
const isValidUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(url);
};

/**
 * Validate the provided thumbnail url
 *
 * @param {string} url value of the thumbnail url
 */
const isValidThumbailUrl = (url) => {
  if (!url || url.length === 0) throw new Error('Thumbnail Url is required');
  if (!isValidUrl(url)) throw new Error('Must be a valid url');
  return true;
};

/**
 * Validate the provided image url
 *
 * @param {string} url value of the thumbnail url
 */
const isValidImageUrl = (url) => {
  if (!url || url.length === 0) throw new Error('Image Url is required');
  if (!isValidUrl(url)) throw new Error('Must be a valid url');
  return true;
};

export {
  isValidTitle, isValidDescription, isValidThumbailUrl, isValidImageUrl,
};
