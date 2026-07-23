import { useEffect, useState } from 'react';

/**
 * Tracks which section (by id) is currently most visible in the viewport.
 * Used to highlight the matching nav link as the single-page site is scrolled,
 * replacing the old route-based `isActive` matching.
 */
export default function useActiveSection(ids, options = {}) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among those visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0, ...options }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options]);

  return activeId;
}
