import ApiError from '../models/api-error.model';

export default class AuthService {
  /**
   * Initiate the Google authentication flow
   * Note: You cannot make an ajax request here. You need to redirect
   * @throws ApiError
   */
  static loginGoogle() {
    try {
      const base = window.location.origin;
      const route = '/auth/google/login';
      window.location = `${base}${route}`;
    } catch (error) {
      throw new ApiError(500, 'Unable to login');
    }
  }
}
