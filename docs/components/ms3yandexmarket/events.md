---
title: События
description: Входящие и исходящие события ms3YandexMarket
---

# События

Плагин слушает чужие события. Сервис генерации вызывает свои.

## Входящие

```mermaid
flowchart TD
  Ev[OnDocFormSave OnDocPublished OnDocUnPublished ms3remainsOnAfterRemainChange] --> Mode{Режим manual?}
  Mode -->|да| Skip[Отметка не ставится]
  Mode -->|нет| Cats{Товар в категориях прайса?}
  Cats -->|нет| Skip
  Cats -->|да| Mark[Отметка нужно сгенерировать]
```

| Событие | Что делает компонент |
| --- | --- |
| `OnDocFormSave` | Для товара и категории MiniShop3 отмечает подходящие прайсы |
| `OnDocPublished` | То же |
| `OnDocUnPublished` | То же |
| `ms3remainsOnAfterRemainChange` | То же. Идентификатор товара берётся из `product_id`. Если его нет, отмечаются все активные прайсы не в режиме `manual` |

Пустой выбор категорий означает «все категории». Отметка не ставится прайсу `manual` и прайсу, в чьи категории товар не входит. Для отметки и для выборки файла категориями считаются родитель ресурса и строки связей.

## Исходящие

Все вызовы идут через `$modx->invokeEvent`. В параметрах есть объект прайса и `pricelist_id`, если не сказано иное.

Порядок вызовов на пути `tree_v2`. Событие `OnMs3YandexMarketBeforeWrite` на этом пути не вызывается.

```mermaid
flowchart LR
  BG[BeforeGenerate] --> BQ[BeforeQuery]
  BQ --> BO[BeforeOffer]
  BO --> BWO[BeforeWritingOffer]
  BO --> BWC[BeforeWritingCategory]
  BWO --> AG[AfterGenerate]
  BWC --> AG
```

| Событие | Когда | Дополнительно |
| --- | --- | --- |
| `OnMs3YandexMarketBeforeGenerate` | До чтения товаров, после блокировки и старта журнала | |
| `OnMs3YandexMarketBeforeQuery` | До выборки товаров | `context` = `offers` |
| `OnMs3YandexMarketBeforeOffer` | На каждую строку товара или варианта | `row` |
| `OnMs3YandexMarketAfterOffer` | На дереве полей: после проверки id товара и после порога остатка. Строка без id и строка, которую убрал порог, событие не получают. `offer` на этом пути `null`. На пути RSS событие идёт после сборки предложения и вызывается даже если сборка не удалась | `row`, `offer` |
| `OnMs3YandexMarketOffersQuery` | После сборки предложений. При записи YML из дерева полей не вызывается. Вызывается у Google RSS и у записи YML прайса без дерева полей | `offers_count` |
| `OnMs3YandexMarketBeforeWritingOffer` | Перед записью одного предложения из дерева полей | `row` |
| `OnMs3YandexMarketBeforeWritingCategory` | Перед записью категории из дерева полей | `category` |
| `OnMs3YandexMarketCategoriesQuery` | Перед обходом выбранных корней категорий. Если корни не выбраны, событие не вызывается | `root_ids` |
| `OnMs3YandexMarketBeforeWrite` | Перед записью Google RSS и перед записью YML прайса без дерева полей. При записи YML из дерева полей не вызывается | `offers_count` |
| `OnMs3YandexMarketAfterGenerate` | После подмены файла, в том числе если в журнале статус `error` из‑за числа ошибок. В `catch` при исключении не вызывается. Отметка «нужно сгенерировать» снимается только при статусе не `error` | `result` |
