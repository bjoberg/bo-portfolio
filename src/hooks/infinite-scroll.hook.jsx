import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback, isEnd, hasError) => {
  const [isFetching, setIsFetching] = useState(false);

  /**
   * Start fetching data when the user has scrolled to the bottom of the page
   */
  const handleScroll = useCallback(() => {
    const { offsetHeight, scrollTop } = document.documentElement;
    const currPosition = window.innerHeight + scrollTop;
    if (currPosition !== offsetHeight || isFetching || isEnd || hasError) return;
    setIsFetching(true);
  }, [hasError, isEnd, isFetching]);

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
