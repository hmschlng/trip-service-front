// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onIntersect,
  enabled = true,
  threshold = 0.5,
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

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleObserver, threshold]);

  return observerRef;
};