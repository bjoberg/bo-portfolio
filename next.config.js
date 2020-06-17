require('dotenv').config();

const env = {
  APP_ENV: process.env.APP_ENV,
  ROOT_URL: 'https://www.brettoberg.com',
  BO_API_ENDPOINT: process.env.BO_API_ENDPOINT,
  TITLE: 'Brett Oberg Photography',
};

module.exports = {
  env,
  publicRuntimeConfig: { ...env },
};
