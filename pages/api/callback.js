import auth0 from '../../lib/auth0';

/**
 * Auth0 authentication callback.
 *
 * @param {any} req Request object passed to the server
 * @param {any} res Response object returned from the server
 */
export default async (req, res) => {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};
