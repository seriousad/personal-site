# kndg.online

Личный сайт Константина Долгополова. Две статические версии: основная английская `/` и русская `/ru/`. Старые адреса `/en` и `/en/` перенаправляются на `/` с кодом 301 через `public/_redirects`.

**Стек:** Astro, TypeScript, CSS. Шрифты Manrope и IBM Plex Mono размещаются вместе с сайтом; внешние шрифтовые сервисы не используются. Для работы сайта не нужны backend, база данных или переменные окружения.

## Локальный запуск

Node.js 24 LTS (или версия, удовлетворяющая `engines` в `package.json`).

```sh
npm ci
npm run dev
```

По умолчанию: <http://127.0.0.1:4321>.

```sh
npm run check  # Проверка Astro и TypeScript
npm run build  # Статическая сборка → dist/
npm run preview
```

## Что где менять

- `src/data/profile.ts` — контакты и весь текст обеих языковых версий, опыт, образование и проекты.
- `src/components/Portfolio.astro` — структура страницы и небольшие интерактивные функции.
- `src/components/SystemDiagram.astro` — схема на первом экране.
- `src/components/ProjectCard.astro` — карточки и иллюстрации проектов.
- `src/components/Capabilities.astro` — направления работы с раскрывающимися подробностями; на телефоне свёрнуты, на широком экране раскрыты.
- `src/scripts/navigation.ts` — подсветка текущего раздела и сохранение раздела при смене языка.
- `src/styles/global.css` — дизайн-переменные, светлая/тёмная темы и адаптивные стили.
- `src/layouts/BaseLayout.astro` — общие метаданные, canonical, hreflang и JSON-LD.
- `public/` — favicon, robots.txt, sitemap.xml и заголовки HTTP.
- `wrangler.jsonc` — конфигурация статического хостинга Cloudflare.

Изображение для предпросмотра ссылки: `public/social-card.svg` (исходник) и `public/social-card.png` (готовый файл). После редактирования SVG пересоздать PNG командой `npm run social:generate`; для этого нужен установленный Chromium из Playwright. Обычная сборка браузера не требует.

Оригиналы резюме не включены в публичные файлы. Текст страницы составлен по предоставленным резюме и уточнениям владельца сайта; актуальные должности и даты взяты из версии от 2 ноября 2026 года. Веб-версия LinkedIn не использовалась: сайт блокирует автоматическое чтение. GitHub-профиль: <https://github.com/seriousad>.

## Проверки в браузере

```sh
npx playwright install chromium
npm run build
npm test
```

Тесты поднимают локальный Cloudflare Workers runtime на `127.0.0.1:4322` и проверяют собранный сайт: обе языковые версии, контакты, клавиатурное раскрытие проектов, копирование email, сохранение темы, доступность светлой и тёмной тем, ширины от 320 до 1440 px, HTTP-заголовки, страницу 404 и работу без JavaScript.

Эти же проверки запускаются в GitHub Actions при push в `main` и в pull request. Workflow только проверяет сайт; публикация настроена отдельно через Cloudflare.

## Cloudflare: автоматическая публикация из GitHub

1. Добавить проект в GitHub-репозиторий.
2. В Cloudflare → **Workers & Pages → Create application → GitHub** выбрать репозиторий.
3. Установить:
   - имя Worker: `kndg-personal-site` (должно совпадать с `name` в `wrangler.jsonc`);
   - production branch: `main`;
   - build command: `npm run check && npm run build`;
   - deploy command: `npx wrangler deploy`;
   - root directory: корень репозитория;
   - Node.js: 24 (при необходимости переменная сборки `NODE_VERSION=24`).
4. Для веток включить preview builds и использовать предусмотренный Cloudflare режим превью. При настройке через version uploads команда: `npx wrangler versions upload` после сборки.
5. Домен `kndg.online` уже указан в `routes` файла `wrangler.jsonc` как Custom Domain. При деплое Cloudflare настроит DNS и HTTPS; DNS-зона должна быть в том же Cloudflare-аккаунте.
6. В DNS создать проксируемую запись для `www` (например, CNAME `www` → `kndg.online`) и в **Rules → Redirect Rules** настроить постоянный редирект `www.kndg.online` → `https://kndg.online` с сохранением пути и query string.

Не нужно добавлять Cloudflare API Token в GitHub Secrets: сборку и публикацию выполняет интеграция Cloudflare.

Для ручного деплоя с компьютера:

```sh
npx wrangler login
npm run deploy
```

Только готовые файлы `dist/` отправляются в Cloudflare. Worker script не используется: страницы генерируются при сборке и раздаются как Static Assets. Вызовов LLM или внешних API при открытии сайта нет.

## Поведение

- Основная версия — английская; выбор языка задаётся явным маршрутом и не зависит от JavaScript.
- При включённом JavaScript смена языка сохраняет текущий раздел. Подсветка меню следует за прокруткой и сбрасывается на первом экране.
- Светлая тема включена по умолчанию. Выбранная вручную тема сохраняется локально в браузере; блокировка localStorage не мешает сайту работать.
- Ссылки на почту и телефон используют `mailto:` и `tel:`; форма и серверная отправка сообщений не требуются.
- Основная кнопка ведёт в Telegram; в контактах также есть GitHub, LinkedIn, email и телефон.
- Описания проектов раскрываются стандартным HTML-элементом `details`.
- Компания, роль и краткий личный вклад видны в карточке проекта без раскрытия подробностей.
- Направления работы на телефоне компактно свёрнуты и раскрываются с клавиатуры. Без JavaScript их подробности доступны сразу; при печати раскрываются все направления.
- Анимации отключаются при `prefers-reduced-motion`; предусмотрены стили печати.
- Аналитика и сторонние трекеры не подключены.
