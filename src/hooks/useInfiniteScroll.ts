// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  onIntersect,
  enabled = true,
  threshold = 0.5,
  rootMargin = '0px',
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [enabled, onIntersect]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const options = {
      root: null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleObserver, threshold, rootMargin]);

  return observerRef;
};