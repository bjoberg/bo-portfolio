import getConfig from 'next/config';
import SEO from '../../next-seo.config';

const { publicRuntimeConfig } = getConfig();

/**
 * Get the seo config based on the provided image
 *
 * @param {object} image
 * @param {string} image.id
 * @param {string} image.title
 * @param {string} image.description
 * @param {string} image.imageUrl
 * @param {string} image.thumbnailUrl
 * @param {number} image.height
 * @param {number} image.width
 * @returns {{ seoUrl: string, seoTitle: string, seoDescription: string, seoImages: [any]}}
 */
export const getSEOConfigForImage = (image) => {
  const seoUrl = `${publicRuntimeConfig.ROOT_URL}/image/${image.id}`;
  let seoTitle = SEO.title;
  let seoDescription = SEO.description;
  if (image.title) seoTitle = `${image.title} - ${SEO.title}`;
  if (image.description) seoDescription = image.description;
  const seoImages = [
    {
      url: image.thumbnailUrl,
      alt: `${image.title}`,
    },
    {
      url: image.imageUrl,
      alt: `${image.title}`,
      height: image.height,
      width: image.width,
    },
  ];
  return {
    seoUrl,
    seoTitle,
    seoDescription,
    seoImages,
  };
};

/**
 * Get the seo config based on the provided group
 *
 * @param {object} group
 * @param {string} group.id
 * @param {string} group.title
 * @param {string} group.description
 * @param {string} group.imageUrl
 * @param {string} group.thumbnailUrl
 * @returns {{ seoUrl: string, seoTitle: string, seoDescription: string, seoImages: [any] }}
 */
export const getSEOConfigForGroup = (group) => {
  const seoUrl = `${publicRuntimeConfig.ROOT_URL}/group/${group.id}`;
  let seoTitle = SEO.title;
  let seoDescription = SEO.description;
  if (group.title) seoTitle = `${group.title} - ${SEO.title}`;
  if (group.description) seoDescription = group.description;
  const seoImages = [
    {
      url: group.thumbnailUrl,
      alt: `${group.title}`,
    },
    {
      url: group.imageUrl,
      alt: `${group.title}`,
    },
  ];
  return {
    seoUrl,
    seoTitle,
    seoDescription,
    seoImages,
  };
};
