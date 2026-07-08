---
title: Сниппеты
description: 'Обзор сниппетов PremiumAccess для paywall, покупки, файлов и кабинета'
---
<!-- TODO: translate from docs/components/premiumaccess/snippets/index.md -->

# Сниппеты PremiumAccess

В пакете **7 сниппетов**. На типовом сайте paywall включает **плагин** `premiumaccess_content_protection`, кнопку «Купить» подставляет chunk **`paLockedCta`**. Сниппеты ниже — когда вы **сами собираете шаблон** или нужен отдельный блок (кабинет, файлы, промокод).

::: tip Кэширование
Вызовы **некэшируемые**: `[[!PremiumAccessBuy]]` или `{'!PremiumAccessBuy' | snippet}`. Иначе закрытый контент может «залипнуть» под другим пользователем.
:::

## Какой сниппет когда

| Задача | Сниппет | Подробнее |
| --- | --- | --- |
| Закрыть content страницы | [PremiumAccess](PremiumAccess) | [Paywall](../frontend/paywall) |
| Кнопка «Купить» | [PremiumAccessBuy](PremiumAccessBuy) | — |
| Скачать PDF / архив | [PremiumAccessFile](PremiumAccessFile) | [Файлы](../frontend/protected-files) |
| Страница «Мои доступы» | [PremiumAccessCabinet](PremiumAccessCabinet) | [Кабинет](../frontend/cabinet) |
| Короткий список (sidebar) | [PremiumAccessSubscription](PremiumAccessSubscription) | [Кабинет](../frontend/cabinet) |
| Кнопка «Продлить» | [PremiumAccessRenew](PremiumAccessRenew) | [Продление](../integration#когда-доступно-продление) |
| Форма промокода | [PremiumAccessPromoRedeem](PremiumAccessPromoRedeem) | [Промокоды](../integration#промокоды) |

## Примеры по задачам

К каждому сниппету — отдельная страница с параметрами и дополнительными вариантами.

### Закрытая статья

**Обычно** достаточно плагина: он закрывает `[[*content]]`, в блоке уже цена и «Купить».

Если плагин отключён — intro оставьте **до** сниппета, content передайте **внутрь**:

::: code-group

```fenom
<div class="intro">{$_modx->resource.introtext}</div>
{'!PremiumAccess' | snippet : [
  'content' => $_modx->resource.content,
  'resourceId' => $_modx->resource.id
]}
```

```modx
<div class="intro">[[*introtext]]</div>
[[!PremiumAccess? &content=`[[*content]]` &resourceId=`[[*id]]`]]
```

:::

### Кнопка «Купить» на paywall-странице

Тариф берётся из правила на текущую страницу:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
```

```modx
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

**Лендинг** без paywall — укажите ID тарифа из **Продукты**:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : [
  'productId' => 1,
  'buyLabel' => 'Оформить доступ за 990 ₽'
]}
```

```modx
[[!PremiumAccessBuy? &productId=`1` &buyLabel=`Оформить доступ за 990 ₽`]]
```

:::

Другие параметры (`redirect`, `msProductId`): [PremiumAccessBuy](PremiumAccessBuy).

### Частично открытая статья (premium block)

Правило на страницу **не** вешайте. В content — маркер `[[pa-block:uuid]]`; плагин закроет только блок. Кнопку покупки выведите сами:

::: code-group

```fenom
[[*content]]
{'!PremiumAccessBuy' | snippet : ['productId' => 2]}
```

```modx
[[*content]]
[[!PremiumAccessBuy? &productId=`2`]]
```

:::

Подробнее: [Premium blocks](../interface/resources-and-blocks#premium-blocks).

### Страница урока с файлами

У каждого файла — правило «файл» в **Правила** и свой вызов сниппета:

::: code-group

```fenom
<h2>Материалы</h2>
<ul>
  <li>{'!PremiumAccessFile' | snippet : ['file' => 'courses/lesson-1.pdf']}</li>
  <li>{'!PremiumAccessFile' | snippet : ['file' => 'courses/lesson-1.zip']}</li>
</ul>
{'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
```

```modx
<h2>Материалы</h2>
<ul>
  <li>[[!PremiumAccessFile? &file=`courses/lesson-1.pdf`]]</li>
  <li>[[!PremiumAccessFile? &file=`courses/lesson-1.zip`]]</li>
</ul>
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

### Личный кабинет

Отдельный ресурс, только для авторизованных:

::: code-group

```fenom
<h1>Мои доступы</h1>
{'!PremiumAccessCabinet' | snippet}

<h2>Промокод</h2>
{'!PremiumAccessPromoRedeem' | snippet}

<h2>Продлить</h2>
{'!PremiumAccessRenew' | snippet : ['productId' => 1]}
```

```modx
<h1>Мои доступы</h1>
[[!PremiumAccessCabinet]]
<h2>Промокод</h2>
[[!PremiumAccessPromoRedeem]]
<h2>Продлить</h2>
[[!PremiumAccessRenew? &productId=`1`]]
```

:::

Продление в строке списка (только у истёкших): [Личный кабинет — paCabinetItem](../frontend/cabinet#prodlenie-istekshie). Виджет в sidebar — ниже.

### Виджет «Мои доступы» в sidebar

Тот же HTML, что у кабинета, но короче — [PremiumAccessSubscription](PremiumAccessSubscription):

::: code-group

```fenom
{if $_modx->isAuthenticated()}
  <aside>
    <h3>Мои подписки</h3>
    {'!PremiumAccessSubscription' | snippet : ['limit' => 5]}
    <a href="/cabinet/access/">Все доступы →</a>
  </aside>
{/if}
```

```modx
[[!PremiumAccessSubscription? &limit=`5`]]
```

:::

Вторая страница длинного списка: параметры `offset` = 20 и `limit` = 20.

### Закрытое TV-поле (Fenom)

Без сниппета PremiumAccess — модификатор `pa_access` и кнопка:

```fenom
{if 'protected_body' | pa_access : ['target_type' => 'tv', 'target_identifier' => 'protected_body']}
  {$_modx->resource.protected_body}
{else}
  <p class="pa-locked">Раздел доступен после покупки.</p>
  {'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
{/if}
```

Больше типов (contact, file, group): [Paywall — Fenom](../frontend/paywall#условные-фрагменты-fenom).

## Справочник вызовов

| Сниппет | Ключевые параметры |
| --- | --- |
| PremiumAccess | `content`, `resourceId` |
| PremiumAccessBuy | `resourceId` / `productId` / `msProductId`, `buyLabel`, `redirect` |
| PremiumAccessFile | `file` |
| PremiumAccessCabinet | — |
| PremiumAccessSubscription | `offset`, `limit` |
| PremiumAccessRenew | как Buy |
| PremiumAccessPromoRedeem | `tpl` |

MODX:

```modx
[[!PremiumAccess? &content=`[[*content]]` &resourceId=`[[*id]]`]]
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
[[!PremiumAccessBuy? &productId=`1`]]
[[!PremiumAccessFile? &file=`courses/guide.pdf`]]
[[!PremiumAccessCabinet]]
[[!PremiumAccessSubscription? &limit=`10`]]
[[!PremiumAccessRenew? &productId=`1`]]
[[!PremiumAccessPromoRedeem]]
```

Fenom — те же вызовы через `{'!ИмяСниппета' | snippet : […]}`.

## Разработчикам

Проверка доступа без сниппетов:

```text
GET {assets_url}components/premiumaccess/connector.php
  ?action=web/access/check
  &target_type=resource
  &target_identifier=123
```

Ответ: `{ "success": true, "allowed": false }`.

PHP в своём коде (`PremiumAccessFacade`, `AccessTarget`):

```php
use PremiumAccess\Domain\Access\AccessTarget;
use PremiumAccess\Presentation\PremiumAccessFacade;

$decision = PremiumAccessFacade::checkAccess(
    $modx,
    AccessTarget::resource((int) $modx->resource->get('id')),
);
```

Справочник actions: [Connector API](../development/api). События: [События MODX](../development/events).

## См. также

- [Быстрый старт](../quick-start)
- [Интеграция](../integration)
- [Витрина: CSS и чанки](../frontend)
- [FAQ](../faq)
