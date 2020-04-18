import { useState, useCallback, useEffect } from 'react';

const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false);

  /**
   * Handle down press of keyboard
   */
  const downHandler = useCallback(({ keyCode }) => {
    if (keyCode === targetKeyCode) setKeyPressed(true);
  }, [targetKeyCode]);

  /**
   * Handle release of keyboard press
   */
  const upHandler = useCallback(({ keyCode }) => {
    if (keyCode === targetKeyCode) setKeyPressed(false);
  }, [targetKeyCode]);

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};

export default useKeyPress;
