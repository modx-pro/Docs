---
title: Modx3ProfilerToolbar
description: Панель метрик текущего запроса для MODX 3. Без админки и без хранения трейсов
categories: other
author: Ibochkarev
logo: https://modstore.pro/assets/extras/modx3profilertoolbar/logo.png
modstore: https://modstore.pro/packages/other/modx3profilertoolbar
compatibility:
  - modx3
  - php81
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Панель на странице', link: 'toolbar' },
  { text: 'Ограничения', link: 'limitations' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# Modx3ProfilerToolbar

Пакет показывает метрики текущего запроса в панели на странице сайта. Админки нет. Трейс в базу и в файл не пишется.

## Что видно на странице

Свёрнутая панель в правом нижнем углу показывает полное время, пик памяти, число собранных сниппетов и число строк SQL. По клику четыре вкладки: «Обзор», «Медленные компоненты», «Таймлайн», «SQL». Подписи задаёт лексикон `modx3profilertoolbar` (ru, en, uk).

Пакет строит панель при включённых `enabled` и `frontend_toolbar`. Запрос должен попасть в `sampling_rate`. Нужны контекст `web`, сессия контекста `mgr` и строка `</body>` в HTML.

## Что собирается

На вкладке «Таймлайн» ненулевая длительность есть у `OnHandleRequest` и `OnLoadWebDocument`. `OnMODXInit` и `OnWebPagePrerender` попадают в список с 0 мс. Плагины отдельными строками не собираются.

Плагин `Modx3ProfilerToolbar` подписан на `OnMODXInit` (приоритет −100), `OnHandleRequest`, `OnLoadWebDocument` и `OnWebPagePrerender`.

Во вкладке SQL одна строка с числом запросов xPDO и суммой их времени. Текстов SQL нет. Подробности в [ограничениях](limitations).

## Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0 и новее |
| PHP | 8.1.0 и новее |

Пакет не требует VueTools и не создаёт пункт меню.

## Установка

1. Откройте установщик пакетов.
2. Найдите **Modx3ProfilerToolbar**.
3. Нажмите **Установить**.

При установке и обновлении пакет отправляет POST на `https://metrics.modx.pro/` с таймаутом 2 секунды. В теле версии PHP, MODX, СУБД, pdoTools, тип ОС, веб-сервер и число контекстов. Домен и IP в этот набор не входят. Ошибка отправки установку не останавливает.

Дальше: [быстрый старт](quick-start).
