---
title: Сниппеты
description: Обзор сниппетов msPriceTiers для витрины MiniShop3
---

# Сниппеты msPriceTiers

| Сниппет | Назначение |
|---------|------------|
| [msPriceTiers.initialize](msPriceTiersInitialize) | CSS, JS, `window.msPriceTiersConfig` — **один раз** на странице |
| [msPriceTiers](msPriceTiers) | HTML таблицы порогов для товара |
| [msPriceTiersProgress](msPriceTiersProgress) | Прогресс «до следующей скидки» (товар, корзина, сумма заказа) |

Служебные (QA/разработка, на витрине не нужны): `msPriceTiers.demoProductId`, `msPriceTiers.testContext`, `msPriceTiers.versionedAsset`.

## Порядок на странице товара

1. `msPriceTiers.initialize` — в начале шаблона или перед блоком цены.
2. Разметка формы с `mspricetiers-form` и `mspricetiers-quantity`.
3. `msPriceTiers` — таблица порогов.
4. `msPriceTiersProgress` — прогресс на странице товара.

## Порядок на странице корзины

1. `msPriceTiers.initialize`.
2. `msPriceTiersProgress` с `cart=1` и/или `cartSum=1` внутри `[data-mspt-live]`.

## Кэширование

Сниппеты с префиксом `!` (`[[!...]]` / `{'!...' | snippet}`) — некэшированные, чтобы подтягивать актуальные пороги и группы пользователя.

## См. также

- [Чанки](../chunks)
- [Подключение на сайте](../frontend)
- [Интеграция](../integration)
