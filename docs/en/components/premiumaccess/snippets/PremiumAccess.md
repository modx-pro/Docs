---
title: Сниппет PremiumAccess
description: Рендер защищённого контента с проверкой доступа
---
<!-- TODO: translate from docs/components/premiumaccess/snippets/PremiumAccess.md -->

# Сниппет PremiumAccess

Проверяет доступ и отдаёт **полный текст** или **закрытый блок** с ценой и кнопкой «Купить».

На большинстве сайтов то же делает плагин **`premiumaccess_content_protection`**. Сниппет нужен, если плагин отключён для шаблона или закрываете **только часть** страницы.

## Вызов

::: code-group

```fenom
{'!PremiumAccess' | snippet : [
  'content' => $_modx->resource.content,
  'resourceId' => $_modx->resource.id
]}
```

```modx
[[!PremiumAccess?
  &content=`[[*content]]`
  &resourceId=`[[*id]]`
]]
```

:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `content` | (пусто) | HTML для проверки, обычно `[[*content]]` |
| `resourceId` | текущая страница | ID страницы с правилом доступа |

## Примеры

### Intro открыт, content закрыт

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

### Content другой страницы

Правило на ресурсе `2046`, вывод на текущей витрине:

::: code-group

```fenom
{set $page = 2046 | resource}
{'!PremiumAccess' | snippet : [
  'content' => $page.content,
  'resourceId' => 2046
]}
```

```modx
[[!PremiumAccess?
  &content=`[[pdoField? &id=`2046` &field=`content`]]`
  &resourceId=`2046`
]]
```

:::

### Только TV-поле

Без этого сниппета — Fenom-модификатор `pa_access`:

```fenom
{if 'protected_body' | pa_access : ['target_type' => 'tv', 'target_identifier' => 'protected_body']}
  {$_modx->resource.protected_body}
{else}
  {'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
{/if}
```

Подробнее: [Paywall — Fenom](../frontend/paywall#условные-фрагменты-fenom).

## Что увидит посетитель

| Ситуация | Результат |
| --- | --- |
| Доступ есть | Исходный content (включая premium blocks) |
| Доступа нет | Закрытый блок `paLockedCta` |
| Компонент выключен | Content без проверки |

## См. также

- [PremiumAccessBuy](PremiumAccessBuy)
- [Paywall на страницах](../frontend/paywall)
- [Интеграция — защита ресурса](../integration#защита-ресурса)
