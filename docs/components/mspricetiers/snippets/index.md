---
title: Сниппеты
description: Обзор сниппетов msPriceTiers для витрины MiniShop3
---

# Сниппеты msPriceTiers

| Сниппет | Назначение |
|---------|------------|
| [msPriceTiers.initialize](msPriceTiersInitialize) | CSS, JS, `window.msPriceTiersConfig` — вызывать **один раз** на странице |
| [msPriceTiers](msPriceTiers) | HTML таблицы порогов для товара |
| [msPriceTiersProgress](msPriceTiersProgress) | Прогресс-бар «до следующей скидки» (товар или корзина) |

Служебный `msPriceTiers.demoProductId` — ID первого товара с порогами (демо/QA), на витрине обычно не нужен.

## Порядок на странице товара

1. `msPriceTiers.initialize` — в начале шаблона или перед блоком цены.
2. Разметка формы с `mspricetiers-form` и `mspricetiers-quantity`.
3. `msPriceTiers` — таблица порогов.
4. Опционально `msPriceTiersProgress`.

## Кэширование

Сниппеты с префиксом `!` (`[[!...]]` / `{'!...' | snippet}`) — некэшированные, чтобы подтягивать актуальные пороги и группы пользователя.

## См. также

- [Чанки](../chunks)
- [Подключение на сайте](../frontend)
- [Интеграция](../integration)
