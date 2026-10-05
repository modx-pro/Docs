---
title: PageBuilderUtmUrl
description: Добавление UTM из реестра PageBuilder к URL
---

# Сниппет PageBuilderUtmUrl

Добавляет UTM-параметры из реестра панели управления к произвольному URL: ссылка получает метки текущего визита, query string в шаблоне собирать не нужно. Значения берутся из query string, `$_SESSION['utm']` или `default_value` записи в `pb_utm_params`.

## Где вызывать

Шаблон, chunk секции (через MODX), кнопки вне PageBuilder. Для полей url/button внутри секций удобнее <code v-pre>{{utm:key}}</code> в инспекторе. <!-- markdownlint-disable-line MD033 -->

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `url` | пусто | Целевой URL. Пустой → пустой ответ |
| `params` | пусто | JSON с дополнительными query-параметрами. Ключи из `params` перекрывают реестр |

## Базовый вызов

::: code-group

```modx
[[!PageBuilderUtmUrl?
  &url=`https://example.com/landing`
]]
```

```fenom
{'!PageBuilderUtmUrl' | snippet : [
  'url' => 'https://example.com/landing'
]}
```

:::

## Дополнительные параметры в query

::: code-group

```modx
[[!PageBuilderUtmUrl?
  &url=`/contacts/`
  &params=`{"utm_content":"hero-cta"}`
]]
```

```fenom
{'!PageBuilderUtmUrl' | snippet : [
  'url' => '/contacts/',
  'params' => '{"utm_content":"hero-cta"}'
]}
```

:::

## Fenom: модификатор utm_query

Плагин pagebuilder регистрирует модификатор на событие `pdoToolsOnFenomInit`, которое вызывает pdoTools:

```fenom
<a href="{$button.url|utm_query}">{$button.label}</a>
```

Второй аргумент модификатора — массив дополнительных query-параметров (перекрывают реестр, как `&params=` у сниппета):

```fenom
<a href="{$button.url|utm_query:['utm_content' => 'hero-cta']}">{$button.label}</a>
```

Для URL из данных секции это эквивалент вызова сниппета.

## Сессия UTM

Чтобы в ссылку попали метки первого захода, перед отрисовкой вызовите [PageBuilderUtmSession](PageBuilderUtmSession) или полагайтесь на плагин PageBuilder.

## См. также

- [PageBuilderUtmSession](PageBuilderUtmSession)
- [Панель управления → UTM](../cmp#utm)
