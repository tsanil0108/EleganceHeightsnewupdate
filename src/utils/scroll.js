const getNavbarOffset = () => {
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    return navbar.getBoundingClientRect().height;
  }

  const rootStyles = getComputedStyle(document.documentElement);

  const fallback =
    window.innerWidth <= 600
      ? rootStyles
          .getPropertyValue('--navbar-height-mobile')
          .trim()
      : rootStyles
          .getPropertyValue('--navbar-height')
          .trim();

  const parsedValue = Number.parseInt(fallback, 10);

  return Number.isNaN(parsedValue) ? 84 : parsedValue;
};

export function scrollToHash(hash) {
  if (!hash || !hash.startsWith('#')) return;

  const targetId = hash.slice(1);
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return;

  const navbarOffset = getNavbarOffset();

  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    navbarOffset +
    1;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });

  window.history.replaceState(null, '', hash);
}

export default scrollToHash;