import { useState, useEffect } from 'react';

const FIRST_TIME_USER_KEY = 'holiday-app-first-time-user';

export const useFirstTimeUser = () => {
  // Initialize state based on localStorage immediately
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(() => {
    const hasSeenTutorial = localStorage.getItem(FIRST_TIME_USER_KEY);
    return !hasSeenTutorial;
  });

  const markTutorialAsSeen = () => {
    localStorage.setItem(FIRST_TIME_USER_KEY, 'true');
    setIsFirstTimeUser(false);
  };

  return {
    isFirstTimeUser,
    markTutorialAsSeen
  };
};
