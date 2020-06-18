export default class SeoConfig {
  constructor(noindex, nofollow, title, description, url) {
    this.noindex = noindex;
    this.nofollow = nofollow;
    this.title = title;
    this.description = description;
    this.canonical = url;
    this.openGraph = {
      url,
      title,
      description,
      images: [],
    };
  }

  /**
   * Get the json representation of this class
   */
  getConfig() { return this; }

  /**
   * Add an image to the open graph config.
   *
   * @param {string} url url of the image to display
   * @param {number} width width (in pixels) of the image being displayed
   * @param {number} height height (in pixels) of the image being displayed
   * @param {string} alt alt tags to associate with the image being displayed
   */
  pushOpenGraphImage(url, width, height, alt) {
    if (this.openGraph && this.openGraph.images) {
      this.openGraph.images.push({
        url, width, height, alt,
      });
    }
  }

  /**
   * Determine if the page should be indexed or not.
   *
   * @param {string} appEnv application environment
   * @param {boolean} hasError flag determining if page has error or not
   * @returns {boolean} true if it should not be indexed; otherwise, false
   */
  static isNoIndexNoFollow(appEnv, hasError) {
    if (hasError) return true;
    if (appEnv !== 'production') return true;
    return false;
  }
}
