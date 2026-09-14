import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from './useLenis';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    scrollToTop({ immediate: true });
  }, [pathname]);
};
