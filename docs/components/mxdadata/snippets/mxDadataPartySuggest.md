---
title: mxDadataPartySuggest
---

# Сниппет mxDadataPartySuggest

Подключает `party-suggest.js`: подсказки организаций и автозаполнение полей **ИНН**, наименования, КПП, ОГРН, юридического адреса.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|----------------|
| **innInput** | CSS-селектор поля ИНН | `[name="inn"]`, `#inn`, `[name="address_inn"]` |
| **connectorUrl** | URL веб-коннектора | авто от `assets_url` |

## Примеры

### Базовый вызов

::: code-group

```fenom
{'!mxDadataPartySuggest' | snippet}
```

```modx
[[!mxDadataPartySuggest]]
```

:::

### С `innInput` (и при необходимости `connectorUrl`)

::: code-group

```fenom
{'!mxDadataPartySuggest' | snippet : [
    'innInput' => '[name="address_inn"]',
    'connectorUrl' => $.modx.config.assets_url ~ 'components/mxdadata/connector-web.php',
]}
```

```modx
[[!mxDadataPartySuggest?
    &innInput=`[name="address_inn"]`
    &connectorUrl=`[[++assets_url]]components/mxdadata/connector-web.php`
]]
```

:::

::: tip Fenom и `auto_escape`
При включённом **auto_escape** выводите сниппет как сырой HTML, иначе скрипты могут экранироваться.
:::

## См. также

- [Админка → Юрлица](/components/mxdadata/admin-ui#юрлица-party) — сверка полей с ответом API
- [Подключение на сайте](/components/mxdadata/frontend) — имена полей `address_inn` и т.д.
