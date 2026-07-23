import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 *
 * Returns a ref to attach to any element and a boolean `isVisible` that
 * flips to true once the element scrolls into the viewport. Used to
 * trigger CSS reveal animations (fade-up, etc.) only once, on first entry.
 *
 * Respects prefers-reduced-motion: if the user has that OS setting on,
 * isVisible is set to true immediately (no animation, content just shows).
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}