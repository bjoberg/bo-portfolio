import { useState, useEffect, useCallback } from 'react';

/**
 * Determine if element is at specified reload point or now
 *
 * @param {HTMLElement} ref html element to checking placement of
 * @param {number} pixelsFromBottom number of pixels from bottom of screen reload should be
 * triggered
 */
const isAtReloadPoint = (ref, pixelsFromBottom = 0) => {
  const reloadPoint = window.innerHeight + pixelsFromBottom;
  if (!ref) return false;
  return Math.floor(ref.getBoundingClientRect().bottom) <= reloadPoint;
};

const useInfiniteScroll = (callback, isEnd, hasError, ref) => {
  const [isFetching, setIsFetching] = useState(false);

  /**
   * Start fetching data when the user has scrolled to the bottom of the page
   */
  const handleScroll = useCallback(() => {
    if (!isAtReloadPoint(ref.current, 200) || isFetching || isEnd || hasError) return;
    setIsFetching(true);
  }, [hasError, isEnd, isFetching, ref]);

  /**
   * Add the scroll listener
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Fetch more data
   */
  useEffect(() => {
    if (!isFetching || hasError) return;
    callback(setIsFetching);
  }, [callback, hasError, isFetching]);

  return [isFetching];
};

export default useInfiniteScroll;
