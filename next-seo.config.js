export default {
  dangerouslySetAllPagesToNoIndex: process.env.APP_ENV !== 'production' ? true : undefined,
  dangerouslySetAllPagesToNoFollow: process.env.APP_ENV !== 'production' ? true : undefined,
  title: 'Brett Oberg Photography',
};
