import getConfig from 'next/config';
import SEO from '../../next-seo.config';

const { publicRuntimeConfig } = getConfig();

/**
 * Get the seo config based on the provided group
 * 
 * @param {{id: string, title: string, description: string}} group 
 * @returns {{ seoUrl: string, seoTitle: string, seoDescription: string }} seo config variables
 */
const getSEOConfigForGroup = (group) => {
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
    }
  ]
  return { seoUrl, seoTitle, seoDescription, seoImages };
}

export { getSEOConfigForGroup };