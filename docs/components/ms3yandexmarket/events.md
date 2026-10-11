---
title: События
description: Входящие и исходящие события ms3YandexMarket
---

# События

Плагин компонента слушает чужие события. Сервис генерации вызывает свои. Пакет задаёт имена исходящих событий.

## Входящие

<!-- MEDIA: diagram | must | Отметка «нужно сгенерировать»: события OnDocFormSave, OnDocPublished, OnDocUnPublished и ms3remainsOnAfterRemainChange → проверка режима manual, категорий прайса и активности → отметка или пропуск | Схема по таблице раздела и абзацу про пустой выбор категорий -->

| Событие | Что делает компонент |
| --- | --- |
| `OnDocFormSave` | Для товара и категории MiniShop3 отмечает подходящие прайсы |
| `OnDocPublished` | То же |
| `OnDocUnPublished` | То же |
| `ms3remainsOnAfterRemainChange` | То же. Идентификатор товара берётся из `product_id`. Если его нет, отмечаются все активные прайсы не в режиме `manual` |

Отметка не ставится прайсу `manual` и прайсу, в чьи категории товар не входит. Пустой выбор категорий означает «все категории».

## Исходящие

<!-- MEDIA: diagram | must | Порядок исходящих событий при генерации на tree_v2: BeforeGenerate → BeforeQuery → BeforeOffer → BeforeWritingOffer / BeforeWritingCategory → AfterGenerate | Схема по таблице раздела; отметить отсутствие BeforeWrite на дереве полей -->

Все вызовы идут через `$modx->invokeEvent`. В параметрах есть объект прайса и `pricelist_id`, если не сказано иное.

| Событие | Когда | Дополнительно |
| --- | --- | --- |
| `OnMs3YandexMarketBeforeGenerate` | До чтения товаров, после блокировки и старта журнала | |
| `OnMs3YandexMarketBeforeQuery` | До выборки товаров | `context` = `offers` |
| `OnMs3YandexMarketBeforeOffer` | На каждую строку товара или варианта | `row` |
| `OnMs3YandexMarketAfterOffer` | На дереве полей: после проверки id товара и после порога остатка. Строка без id и строка, которую убрал порог, событие не получают. `offer` на этом пути `null`. На пути RSS событие идёт после сборки предложения и вызывается даже если сборка не удалась | `row`, `offer` |
| `OnMs3YandexMarketOffersQuery` | После сборки предложений. При записи YML из дерева полей не вызывается | `offers_count` |
| `OnMs3YandexMarketBeforeWritingOffer` | Перед записью одного предложения из дерева полей | `row` |
| `OnMs3YandexMarketBeforeWritingCategory` | Перед записью категории из дерева полей | `category` |
| `OnMs3YandexMarketCategoriesQuery` | Перед обходом выбранных корней категорий. Если корни не выбраны, событие не вызывается | `root_ids` |
| `OnMs3YandexMarketBeforeWrite` | Перед записью Google RSS. При записи YML из дерева полей не вызывается | `offers_count` у RSS |
| `OnMs3YandexMarketAfterGenerate` | После подмены файла, в том числе если в журнале статус `error` из‑за числа ошибок. В `catch` при исключении не вызывается. Отметка «нужно сгенерировать» снимается только при статусе не `error` | `result` |

При записи YML из дерева полей нет `OnMs3YandexMarketBeforeWrite`. Смотрите `BeforeWritingOffer` и `BeforeWritingCategory`.
