---
title: mxDadataForm
---

# Сниппет mxDadataForm

Один сниппет, **`dadata-form.js`**: несколько полей внутри контейнера с конфигом **JSON**. Без jQuery. Типы: **ADDRESS**, **NAME**, **EMAIL**, **BANK**, **PARTY**, **GEOLOCATE** (кнопка геолокации), **VERSION_INFO** (вывод версии API).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **selector** | Корень формы (один элемент) | `#dadata-form` |
| **suggestions** | JSON-строка с настройками полей (ключ = `id` или `name` внутри контейнера) | — |
| **suggestionsChunk** | Имя чанка MODX, в теле **только JSON** (удобно для Fenom: `{ignore}` / избегать пустого `suggestions` при `extends`) | — |
| **connectorUrl** | Веб-коннектор | авто |

Если нет ни **suggestions**, ни валидного **suggestionsChunk**, в браузере получится пустой конфиг — подсказки не заработают.

## Примеры

### Inline `suggestions` (email + address)

::: code-group

```fenom
{'!mxDadataForm' | snippet : [
    'selector' => '#dadata-form',
    'suggestions' => '{"email":{"type":"EMAIL"},"address":{"type":"ADDRESS"}}',
]}
```

```modx
[[!mxDadataForm?
    &selector=`#dadata-form`
    &suggestions=`{
        "email": { "type": "EMAIL" },
        "address": { "type": "ADDRESS" }
    }`
]]
```

:::

### Через `suggestionsChunk` (рекомендуется для большого JSON)

Чанк с одним JSON (можно обернуть в `{ignore}…{/ignore}`), например `chunk.mxdadata.demoFormSug`.

::: code-group

```fenom
{'!mxDadataForm' | snippet : [
    'selector' => '#dadata-form',
    'suggestionsChunk' => 'chunk.mxdadata.demoFormSug',
    'connectorUrl' => 'assets_url' | config ~ 'components/mxdadata/connector-web.php',
]}
```

```modx
[[!mxDadataForm?
    &selector=`#dadata-form`
    &suggestionsChunk=`chunk.mxdadata.demoFormSug`
    &connectorUrl=`[[++assets_url]]components/mxdadata/connector-web.php`
]]
```

:::

Типы полей, `subject`, `master`, **GEOLOCATE**, **VERSION_INFO** — в разделе [Интеграция → Универсальная форма mxDadataForm](/components/mxdadata/integration#универсальная-форма-mxdadataform).

::: tip Fenom и `auto_escape`
При включённом **auto_escape** выводите сниппет как сырой HTML. Для `mxDadataForm` в шаблонах с `{extends}` / `{block}` надёжнее передавать **`suggestionsChunk`**, а не длинный `suggestions` из переменной — иначе в браузере может оказаться пустой `[]`.
:::

## См. также

- [Подключение на сайте — демо чанка](/components/mxdadata/frontend#демо-чанка)
- [Интеграция](/components/mxdadata/integration)
