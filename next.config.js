require('dotenv').config();

const env = {
  TITLE: 'Brett Oberg Photography',
  ROOT_URL: 'https://www.brettoberg.com',
  APP_ENV: process.env.APP_ENV,
  BO_API_ENDPOINT: process.env.BO_API_ENDPOINT,
};

module.exports = {
  env,
  publicRuntimeConfig: { ...env },
};
