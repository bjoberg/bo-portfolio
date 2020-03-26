/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import User from '../models/User';
import Roles from '../constants/Roles';

/**
 * Get user profile information based on the provided options.
 *
 * @param {object} options options to send the profile endpoint
 * @param {string} cookie
 * @returns {Response} user profile response
 */
const fetchUserProfile = async (options = {}) => {
  const res = await fetch('/api/me', options);
  if (!res.ok) return null;
  return res;
};

/**
 * Fetch the role of the provided google user.
 *
 * @param {string} googleId user's google id
 * @return {Response} user role response
 */
const fetchUserRole = async (googleId) => {
  const res = await fetch(`/api/user/${googleId}/role`);
  if (!res.ok) return null;
  return res;
};

/**
 * Fetch and set user profile data based on provided cookie.
 *
 * @param {string} cookie broswer cookie to fetch profile data with
 * @returns {any} user profile object
 */
const fetchUser = async (cookie = '') => {
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
  const user = new User(profileJson);
  const googleId = profileJson.sub.replace('google-oauth2|', '');
  const roleResponse = await fetchUserRole(googleId);
  if (roleResponse && roleResponse !== null) {
    const roleJson = await roleResponse.json();
    user.setRole(roleJson.role);
  }

  if (typeof window !== 'undefined') window.__user = user;
  return user;
};

/**
 * Interact with user state.
 *
 * @param {Object} props
 * @param {boolean} props.required flag determining if authentication is required
 * @returns {{ isFetchingUser: boolean, user: any }}
 */
export const useFetchUser = (props = {}) => {
  const { required } = props;
  const [isFetchingUser, setIsLoadingUser] = useState(
    () => !(typeof window !== 'undefined' && window.__user),
  );

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    return window.__user || null;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isFetchingUser && user) return;
    setIsLoadingUser(true);
    let isMounted = true;

    fetchUser().then((profile) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !profile) {
          window.location.href = '/api/login';
          return;
        }

        setUser(profile);
        if (profile) setIsAdmin(profile.role === Roles.ADMIN);
        setIsLoadingUser(false);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isAdmin, isFetchingUser };
};
