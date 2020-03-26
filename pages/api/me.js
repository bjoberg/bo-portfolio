import { Auth0 } from '../../src/utils/Auth0';

/**
 * Get profile information using Auth0.
 *
 * @param {any} req Request object passed to the server
 * @param {any} res Response object returned from the server
 */
export default async function me(req, res) {
  try {
    await Auth0.handleProfile(req, res);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
