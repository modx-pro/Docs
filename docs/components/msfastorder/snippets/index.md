---
title: Сниппеты
description: Обзор сниппетов msFastOrder для витрины
---

# Сниппеты msFastOrder

Два сниппета для веб-контекста. Оба вызывают **некэшированно** (`[[!…]]` или Fenom с `!`).

| Сниппет | Назначение |
|---------|------------|
| [msFastOrder](/components/msfastorder/snippets/msFastOrder) | Кнопка + assets + inline `msfoConfig`/CSRF; плагин `msfastorder_web` обновляет конфиг в кэше |
| [msFastOrderClientConfig](/components/msfastorder/snippets/msFastOrderClientConfig) | Только вывод `window.msfoConfig` (без кнопки) |

## Где выводить

| Место | Сниппет |
|-------|---------|
| Карточка товара (`msProduct`) | `msFastOrder` без `id` (берётся ID текущего ресурса) |
| Каталог, mFilter, pdoResources | `msFastOrder` с `&id=` ID товара в строке |
| Своя кнопка + общий конфиг | `msFastOrderClientConfig` в шаблоне + кнопка с `data-msfo-trigger` |

Режим заказа (**MS** / **MAIL**) задаётся только настройкой **`msfastorder_method`**, не параметром сниппета.

## Чанки

Кнопка собирается из чанка (по умолчанию `msfo_button`). Форма и success в стандартном потоке собираются в **JavaScript** — см. [Чанки](/components/msfastorder/chunks) и [Подключение на сайте](/components/msfastorder/frontend#форма-в-модалке-важно).
