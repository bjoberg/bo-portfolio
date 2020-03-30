require('dotenv').config();

const env = {
  APP_ENV: process.env.APP_ENV,
  ROOT_URL: 'https://www.brettoberg.com',
  BO_API_ENDPOINT: process.env.BO_API_ENDPOINT,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE: 'openid profile',
  REDIRECT_URI: process.env.REDIRECT_URI,
  POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
  SESSION_COOKIE_LIFETIME: 7200, // 2 hours
};

module.exports = {
  env,
  publicRuntimeConfig: { ...env },
};
