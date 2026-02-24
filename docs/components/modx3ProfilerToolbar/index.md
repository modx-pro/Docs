---
title: Modx3ProfilerToolbar
description: Тулбар производительности для MODX 3 — метрики запроса, медленные компоненты, таймлайн и SQL без админки
author: ibochkarev

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Frontend Dev Toolbar', link: 'toolbar' },
  { text: 'Ограничения pdoTools', link: 'limitations' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# Modx3ProfilerToolbar

Дополнение для MODX 3: лёгкий профайлер с **Frontend Dev Toolbar** — метрики запроса, медленные компоненты, таймлайн и SQL. Без админки, без хранения трейсов, без debug-отчёта.

## Возможности

- **Frontend Dev Toolbar** — панель в правом нижнем углу страницы: время, память, сниппеты, SQL. По клику — вкладки Overview, Slow Components, Timeline, SQL. Локализация (ru/en/uk).
- **MODX Pipeline** — учёт событий MODX (OnHandleRequest, OnLoadWebDocument, OnWebPagePrerender), сниппеты, чанки, плагины, SQL.
- **Advisor** — подсказки по оптимизации: некэшированные сниппеты, N+1, медленные запросы, перегруз чанков.
- **Production-safe** — sampling (1–100%), тулбар только при входе в Manager; накладные расходы < 5%.

## Ограничения

**pdoTools 3.x:** Fenom-сниппеты и pdoTools-сниппеты (msProducts, pdoResources и т.д.) в MODX 3 **не профилируются** детально. См. [Ограничения pdoTools](limitations).

**Что работает:** события MODX, SQL, память, общее время, стандартные теги `[[!Snippet]]` (частично).

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |

Админка и VueTools не требуются.

## Установка

1. Перейдите в **Пакеты → Установщик** (Extras → Installer).
2. Найдите **Modx3ProfilerToolbar** (Performance Toolbar).
3. Нажмите **Установить**.

## После установки

Подробнее: [Быстрый старт](quick-start) и [Frontend Dev Toolbar](toolbar).
