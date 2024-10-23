import React, { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  onScrollEnd: () => void;
};

const ScrollEndObserver: React.FC<Props> = ({ children, onScrollEnd }) => {
  const root = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchor.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        onScrollEnd();
      },
      {
        root: null,
        rootMargin: '100px',
      },
    );

    observer.observe(anchor.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="h-full w-full ObserverRoot">
      {children}
      <div id="scrollAnchor" className="w-full h-[1px]" ref={anchor} />
    </div>
  );
};

export default ScrollEndObserver;
