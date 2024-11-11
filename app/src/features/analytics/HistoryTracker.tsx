import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

export const HistoryTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.send('pageview');
  }, [location.pathname]);

  return null;
};
