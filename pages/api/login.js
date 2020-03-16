import auth0 from '../../lib/auth0'

/**
 * Auth0 authentication login.
 * 
 * @param {any} req Request object passed to the server
 * @param {any} res Response object returned from the server
 */
export default async (req, res) => {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
