import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const locale of [
  { path: '/', lang: 'en', name: 'Konstantin Dolgopolov', about: 'About', projects: 'Projects', contribution: 'More about my role' },
  { path: '/ru/', lang: 'ru', name: 'Константин Долгополов', about: 'Обо мне', projects: 'Проекты', contribution: 'Подробнее об участии' },
]) {
  test(`${locale.lang}: content, metadata and section navigation`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    const response = await page.goto(locale.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);
    await expect(page).toHaveTitle(`${locale.name} — AI & Backend Engineer`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText(locale.name.split(' ')[0]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://kndg.online${locale.path}`);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://kndg.online/');
    await expect(page.locator('link[hreflang="ru"]')).toHaveAttribute('href', 'https://kndg.online/ru/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://kndg.online/');
    await expect(page.locator('.site-header .wordmark')).toHaveAttribute('href', locale.path);
    await expect(page.locator('.language-switch [aria-current="page"]')).toHaveAttribute('lang', locale.lang);
    await page.getByRole('navigation').first().getByRole('link', { name: locale.projects, exact: true }).click();
    await expect(page).toHaveURL(`${locale.path}#projects`);
    await expect(page.locator('#projects')).toBeInViewport();
    await page.locator('.main-nav').getByRole('link', { name: locale.about, exact: true }).click();
    await expect(page).toHaveURL(`${locale.path}#about`);
    expect(pageErrors).toEqual([]);
  });

  test(`${locale.lang}: real contact targets and expandable project contributions`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page.locator('.contact-links a').nth(0)).toHaveAttribute('href', 'https://t.me/seriousad');
    await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:dolgopolov.kv@outlook.com');
    await expect(page.locator('.contact-links a').filter({ hasText: 'GitHub' })).toHaveAttribute('href', 'https://github.com/seriousad');
    await expect(page.locator('.contact-links a').filter({ hasText: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/konstantin-dolgopolov-b00a8b387');
    await expect(page.locator('.contact-links a[href^="tel:"]')).toHaveAttribute('href', 'tel:+79253179690');
    await expect(page.locator('.hero-buttons .button-primary')).toHaveAttribute('href', 'https://t.me/seriousad');
    await expect(page.locator('.project-meta')).toHaveCount(4);
    for (const contribution of await page.locator('.project-contribution').all()) await expect(contribution).toBeVisible();
    const firstDetails = page.locator('.project-card details').first();
    await firstDetails.getByText(locale.contribution, { exact: true }).click();
    await expect(firstDetails).toHaveAttribute('open', '');
    await expect(firstDetails.locator('li').last()).toContainText('7');
    await firstDetails.locator('summary').press('Enter');
    await expect(firstDetails).not.toHaveAttribute('open');
  });

  test(`${locale.lang}: navigation follows the visible section and language changes keep it`, async ({ page }) => {
    const otherPath = locale.lang === 'ru' ? '/' : '/ru/';
    const otherLanguage = locale.lang === 'ru' ? 'en' : 'ru';
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path);
    const experienceLink = page.locator('.main-nav a[href="#experience"]');
    await experienceLink.click();
    await expect(experienceLink).toHaveAttribute('aria-current', 'location');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.locator('.main-nav [aria-current]')).toHaveCount(0);

    await page.locator('.main-nav a[href="#projects"]').click();
    const languageLink = page.locator(`.language-switch a[lang="${otherLanguage}"]`);
    await expect(languageLink).toHaveAttribute('href', `${otherPath}#projects`);
    await languageLink.click();
    await expect(page).toHaveURL(`${otherPath}#projects`);
    await expect(page.locator('.main-nav a[href="#projects"]')).toHaveAttribute('aria-current', 'location');
    await expect.poll(() => page.locator('#projects').evaluate(section => {
      const expected = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'));
      return Math.abs(section.getBoundingClientRect().top - expected);
    })).toBeLessThan(3);

    // A short final section cannot always reach the header's anchor offset.
    await page.locator('.header-contact').click();
    await expect(page.locator('.header-contact')).toHaveAttribute('aria-current', 'location');
    await expect(page.locator('.main-nav [aria-current]')).toHaveCount(0);
    await page.locator(`.language-switch a[lang="${locale.lang}"]`).click();
    await expect(page).toHaveURL(`${locale.path}#contact`);
    await expect(page.locator('.header-contact')).toHaveAttribute('aria-current', 'location');
  });

  for (const theme of ['light', 'dark']) {
    test(`${locale.lang}: accessible in ${theme} theme`, async ({ page }) => {
      await page.addInitScript(selectedTheme => localStorage.setItem('kndg-theme', selectedTheme), theme);
      await page.goto(locale.path);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations.map(violation => ({
        rule: violation.id,
        nodes: violation.nodes.map(node => ({ target: node.target, issue: node.failureSummary })),
      }))).toEqual([]);
    });
  }
}

test('theme is persisted across reloads and language changes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  const toggle = page.locator('.theme-toggle');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('.language-switch').getByRole('link', { name: 'RU', exact: true }).click();
  await expect(page).toHaveURL('/ru/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('.language-switch').getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('copy email writes to clipboard and announces success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.locator('.copy-email').click();
  await expect(page.getByRole('status')).toHaveText('Email copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('dolgopolov.kv@outlook.com');
});

test('mobile introduction is compact and capability details remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ru/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.capability')).toHaveCount(4);
  await expect(page.locator('.capability[open]')).toHaveCount(0);
  const projectTop = await page.locator('.project-card').first().evaluate(card => card.getBoundingClientRect().top + scrollY);
  expect(projectTop).toBeLessThan(2300);

  const capability = page.locator('.capability').filter({ hasText: 'Harness engineering' });
  await capability.locator('summary').focus();
  await capability.locator('summary').press('Enter');
  await expect(capability).toHaveAttribute('open', '');
  await expect(capability.locator('.capability-body')).toBeVisible();
  await capability.locator('summary').press('Enter');
  await expect(capability).not.toHaveAttribute('open');

  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator('.capability[open]')).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.capability[open]')).toHaveCount(0);
});

test('both languages fit narrow, tablet and desktop viewports', async ({ page }) => {
  for (const path of ['/', '/ru/']) {
    for (const width of [320, 375, 390, 495, 600, 601, 640, 760, 761, 768, 860, 861, 1024, 1100, 1101, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      expect(dimensions.document, `${path} at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.locator('.main-nav')).toBeVisible();
      await expect(page.locator('.language-switch')).toBeVisible();

      const layoutIssues = await page.evaluate(() => {
        const issues: string[] = [];
        const bounds = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
        const overlaps = (a: DOMRect, b: DOMRect) =>
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;

        if (overlaps(bounds('.diagram-caption'), bounds('.visual-sticker'))) issues.push('Sticker obscures diagram caption');
        if (overlaps(bounds('.hero-copy'), bounds('.hero-visual'))) issues.push('Diagram overlaps introduction');
        if (overlaps(bounds('.main-nav'), bounds('.header-actions'))) issues.push('Header controls overlap navigation');

        const introduction = bounds('.hero-copy');
        for (const line of document.querySelectorAll('h1 > span')) {
          const text = document.createRange();
          text.selectNodeContents(line);
          const name = text.getBoundingClientRect();
          if (name.left < introduction.left - 1 || name.right > introduction.right + 1) issues.push('Name extends beyond introduction column');
        }

        for (const card of document.querySelectorAll('.project-card')) {
          const title = card.querySelector('h3')!.getBoundingClientRect();
          const firstTag = card.querySelector('.tags li')!.getBoundingClientRect();
          if (Math.abs(firstTag.left - title.left) > 1) issues.push('Technology tags do not align with card text');
          const art = card.querySelector('.project-art')!.getBoundingClientRect();
          for (const element of card.querySelectorAll('.family-leaf, .medical-cross, .document-sheet, .career-panel')) {
            const node = element.getBoundingClientRect();
            if (node.left < art.left || node.right > art.right) issues.push('Project illustration is clipped');
          }
        }
        return issues;
      });
      expect(layoutIssues, `${path} at ${width}px`).toEqual([]);
    }
  }
});

test('unknown routes return the custom 404 and static headers', async ({ request }) => {
  const response = await request.get('/this-page-does-not-exist/');
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain('404 / PAGE NOT FOUND');
  expect(await response.text()).toContain('lang="en"');
  expect(await response.text()).toContain('href="/ru/"');
  const home = await request.get('/');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['x-frame-options']).toBe('DENY');
});

test('legacy English routes redirect to the main English page', async ({ request }) => {
  for (const path of ['/en', '/en/']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(new URL(response.headers().location, response.url()).pathname).toBe('/');
  }
});

test('the social sharing image is available at the declared dimensions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://kndg.online/social-card.png');
  const dimensions = await page.evaluate(async () => {
    const image = new Image();
    image.src = '/social-card.png';
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  });
  expect(dimensions).toEqual({ width: 1200, height: 630 });
});

test('content, languages and project details work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('.theme-toggle')).toBeHidden();
  await expect(page.locator('.copy-email')).toBeHidden();
  await page.locator('.project-card details').first().locator('summary').click();
  await expect(page.locator('.project-card details').first()).toHaveAttribute('open', '');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('.language-switch').getByRole('link', { name: 'RU', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4322/ru/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await context.close();
});
