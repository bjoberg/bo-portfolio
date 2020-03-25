import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

if (typeof window === 'undefined') {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    AUTH0_CLIENT_ID: publicRuntimeConfig.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: publicRuntimeConfig.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: publicRuntimeConfig.AUTH0_SCOPE,
    AUTH0_DOMAIN: publicRuntimeConfig.AUTH0_DOMAIN,
    REDIRECT_URI: publicRuntimeConfig.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: publicRuntimeConfig.POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: publicRuntimeConfig.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: publicRuntimeConfig.SESSION_COOKIE_LIFETIME,
  };
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {
    AUTH0_CLIENT_ID: publicRuntimeConfig.AUTH0_CLIENT_ID,
    AUTH0_SCOPE: publicRuntimeConfig.AUTH0_SCOPE,
    AUTH0_DOMAIN: publicRuntimeConfig.AUTH0_DOMAIN,
    REDIRECT_URI: publicRuntimeConfig.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: publicRuntimeConfig.POST_LOGOUT_REDIRECT_URI,
  };
}
