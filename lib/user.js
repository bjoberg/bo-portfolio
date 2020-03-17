import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

/**
 * Get user profile information based on the provided options.
 * 
 * @param {object} options options to send the profile endpoint
 * @param {string} cookie
 * @returns {Response} user profile response
 */
export const fetchUserProfile = async (options = {}) => {
  const res = await fetch('/api/me', options);
  if (!res.ok) return null;
  return res;
}

/**
 * Fetch the role of the provided google user.
 * 
 * @param {string} googleId user's google id
 * @return {Response} user role response
 */
export const fetchUserRole = async (googleId) => {
  const res = await fetch(`/api/user/${googleId}/role`);
  if (!res.ok) return null;
  return res;
}

/**
 * Fetch and set user profile data based on provided cookie.
 * 
 * @param {string} cookie broswer cookie to fetch profile data with
 * @returns {any} user profile object
 */
export const fetchUser = async (cookie = '') => {
  if (typeof window !== 'undefined' && window.__user) return window.__user;

  const options = cookie
    ? {
      headers: {
        cookie,
      },
    }
    : {};

  const profileResponse = await fetchUserProfile(options);

  if (!profileResponse || profileResponse === null) {
    delete window.__user;
    return null;
  }

  const profileJson = await profileResponse.json();
  const googleId = profileJson.sub.replace('google-oauth2|', '');
  const roleResponse = await fetchUserRole(googleId);
  let role = 'read-only';
  if (roleResponse && roleResponse !== null) {
    const roleJson = await roleResponse.json();
    role = roleJson.role;
  }
  const user = { ...profileJson, role };

  if (typeof window !== 'undefined') window.__user = user;
  return user;
}

/**
 * Interact with user state.
 * 
 * @param {Object} props
 * @param {boolean} props.required flag determining if authentication is required
 * @returns {{ isLoadingUser: boolean, user: any }}
 */
export const useFetchUser = (props = {}) => {
  const { required } = props;
  const [isLoadingUser, setIsLoadingUser] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  );

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    return window.__user || null;
  });

  useEffect(() => {
    if (!isLoadingUser && user) return;
    setIsLoadingUser(true);
    let isMounted = true;

    fetchUser().then(user => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !user) {
          window.location.href = '/api/login';
          return;
        }

        setUser(user);
        setIsLoadingUser(false);
      }
    })

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoadingUser };
};
