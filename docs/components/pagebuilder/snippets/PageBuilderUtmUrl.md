---
title: PageBuilderUtmUrl
description: Добавление UTM из реестра PageBuilder к URL
---

# Сниппет PageBuilderUtmUrl

Добавляет UTM-параметры из реестра панели управления к произвольному URL. Значения берутся из query string, `$_SESSION['utm']` или `default_value` записи в `pb_utm_params`.

## Назначение

Ссылка на лендинг или форму с теми же метками, что у текущего визита, без ручной сборки query string в шаблоне.

## Где вызывать

Шаблон, chunk секции (через MODX), кнопки вне PageBuilder. Для полей url/button внутри секций удобнее <code v-pre>{{utm:key}}</code> в инспекторе.

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

pdoTools регистрирует модификатор на `pdoToolsOnFenomInit`:

```fenom
<a href="{$button.url|utm_query}">{$button.label}</a>
```

Эквивалент вызова сниппета для URL из данных секции.

## Сессия UTM

Чтобы в ссылку попали метки первого захода, перед рендером вызовите [PageBuilderUtmSession](PageBuilderUtmSession) или полагайтесь на плагин PageBuilder.

## См. также

- [PageBuilderUtmSession](PageBuilderUtmSession)
- [Панель управления → UTM](../cmp#utm)
