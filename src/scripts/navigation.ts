const sectionLinks = document.querySelectorAll<HTMLAnchorElement>('.main-nav a, .header-contact');
const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
const languageLinks = [...document.querySelectorAll<HTMLAnchorElement>('.language-switch a')].map(link => ({
  link,
  path: new URL(link.href).pathname,
}));

function updateNavigation() {
  // Match the same offset used for native anchor scrolling below the sticky header.
  const anchorOffset = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset')) || 0;
  const readingLine = anchorOffset + 2;
  const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const activeSection = atPageEnd ? sections.at(-1) : sections.find(section => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= readingLine && bounds.bottom > readingLine;
  });
  const hash = activeSection ? `#${activeSection.id}` : '';

  sectionLinks.forEach(link => {
    if (hash && link.hash === hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  languageLinks.forEach(({ link, path }) => {
    link.setAttribute('href', `${path}${hash}`);
  });
}

let scheduled = false;
function scheduleNavigationUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    updateNavigation();
  });
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('hashchange', scheduleNavigationUpdate);
window.addEventListener('pageshow', scheduleNavigationUpdate);
document.addEventListener('toggle', scheduleNavigationUpdate, true);
document.fonts.ready.then(scheduleNavigationUpdate);
languageLinks.forEach(({ link }) => link.addEventListener('pointerdown', updateNavigation));
updateNavigation();
