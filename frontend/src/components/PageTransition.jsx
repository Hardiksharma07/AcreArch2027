import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function PageTransition() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    if (pathname === previousPath.current) return;
    previousPath.current = pathname;
    setVisible(true);

    let frameId;
    const timerId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(() => setVisible(false));
    }, 500);

    return () => {
      window.clearTimeout(timerId);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return <div className={`page-transition ${visible ? 'visible' : ''}`} aria-hidden={!visible} aria-live="polite">
    <div className="transition-brand">
      <div className="transition-spinner"><BrandLogo className="transition-brand-logo" /></div>
      <small>Loading private pathway</small>
    </div>
  </div>;
}
