---
title: Сниппеты
description: Обзор сниппетов msFastOrder для витрины
---

# Сниппеты msFastOrder

Два сниппета для веб-контекста. Оба вызывают **некэшированно** (`[[!…]]` или Fenom с `!`).

| Сниппет | Назначение |
|---------|------------|
| [msFastOrder](msFastOrder) | Кнопка быстрого заказа + подключение `msfo.min.css` / `msfo.min.js` + CSRF в сессии |
| [msFastOrderClientConfig](msFastOrderClientConfig) | Только вывод `window.msfoConfig` (без кнопки) |

## Где выводить

| Место | Сниппет |
|-------|---------|
| Карточка товара (`msProduct`) | `msFastOrder` без `id` (берётся ID текущего ресурса) |
| Каталог, mFilter, pdoResources | `msFastOrder` с `&id=` ID товара в строке |
| Своя кнопка + общий конфиг | `msFastOrderClientConfig` в шаблоне + кнопка с `data-msfo-trigger` |

Режим заказа (**MS** / **MAIL**) задаётся только настройкой **`msfastorder_method`**, не параметром сниппета.

## Чанки

Кнопка рендерится из чанка (по умолчанию `msfo_button`). Форма и success в стандартном потоке собираются в **JavaScript** — см. [Чанки](../chunks) и [Подключение на сайте](../frontend#форма-в-модалке-важно).
