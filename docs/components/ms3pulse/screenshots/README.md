# Скриншоты ms3Pulse

PNG для документации на [docs.modx.pro](https://docs.modx.pro/components/ms3pulse/). Пути в markdown: `/components/ms3pulse/screenshots/имя.png`.

## Подготовка стенда

- Заказы MiniShop3 за период (скрипт ставит пресет **365** дней).
- Сброс пароля manager (если логин не проходит):

```bash
cd /Users/ibochkarev/Sites/project
php unblock_and_reset_password.php root 'ваш_пароль'
```

- Demo-seed: 9 кастомных графиков (area, bar, scatter, line, pie, donut, barHorizontal, funnel, treemap) и 6 таблиц через `localStorage` в пакете ms3Pulse (`scripts/lib/docsDemoSeed.js`).

## Съёмка (Playwright)

```bash
cd /Users/ibochkarev/Sites/project/Extras/ms3Pulse
npm install
npx playwright install chromium

MS3PULSE_MANAGER_URL='https://project.test/manager/' \
MS3PULSE_MODX_USER=root \
MS3PULSE_MODX_PASSWORD='***' \
MS3PULSE_DOCS_OUTPUT='/Users/ibochkarev/Desktop/Projects/Docs/docs/components/ms3pulse/screenshots' \
npm run docs:screenshots
```

Подмножество: `MS3PULSE_DOCS_SHOTS=tab-dynamics,topflops-tables npm run docs:screenshots`

Проверка: `npm run docs:screenshots:check`

UI manager на стенде может быть на **английском** — скрипт поддерживает EN/RU подписи вкладок.

## Индекс

| Файл | Страницы | Сцена |
| --- | --- | --- |
| `dashboard-overview.png` | quick-start, dashboard, flows | Обзор, 6 метрик |
| `dashboard-header.png` | dashboard | Шапка |
| `filters-panel.png` | quick-start, dashboard, filters, flows | Фильтры, пресет 365 |
| `group-by-selector.png` | filters, flows | Группировка |
| `metrics-cards.png` | metrics, dashboard, flows | Карточки метрик |
| `overview-chart.png` | metrics | Мини-график |
| `tab-dynamics.png` | quick-start, flows | Динамика: fixed + area, bar, scatter, line |
| `tab-products.png` | quick-start, flows | Товары: fixed + pie, donut, barHorizontal, funnel, treemap |
| `tab-topflops.png` | topflops, flows | Топы / Флопы |
| `chart-types-examples.png` | chart-types | Первые 4 графика на «Динамике» |
| `chart-card-menu.png` | export, dashboard, flows | Меню экспорта PNG |
| `builder-page.png` | builder | Превью 9 типов + заголовок |
| `builder-form.png` | builder, quick-start | Форма «Add chart» (без превью) |
| `topflops-tables.png` | topflops, flows | Топ + флоп (2 карточки) |
| `topflops-add-table.png` | topflops, flows | Форма добавления |
| `export-csv-button.png` | export, topflops | Одна таблица с кнопкой CSV |
| `export-chart-menu.png` | export | Меню PNG |
| `settings-namespace.png` | settings, flows | Настройки ms3pulse |
| `permissions-policy.png` | permissions, flows | Права |

Viewport: 1440×900.
