---
title: mxDadataAddressSuggest
---

# Сниппет mxDadataAddressSuggest

Подключает `address-suggest.js` и инициализирует подсказки **адреса** через веб-коннектор. После выбора подсказки заполняются поля формы (город, индекс, FIAS, улица и т.д. — по маппингу в JS).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|----------------|
| **input** | CSS-селектор поля ввода адреса (строка или несколько через запятую) | `#mxdadata-order-address`, `[name="address"]`, `#address`, `[name="address_text_address"]` |
| **connectorUrl** | URL `connector-web.php` | `[[++assets_url]]components/mxdadata/connector-web.php` |

## Примеры

### Базовый вызов

::: code-group

```fenom
{'!mxDadataAddressSuggest' | snippet}
```

```modx
[[!mxDadataAddressSuggest]]
```

:::

### С параметрами `input` и `connectorUrl`

::: code-group

```fenom
{'!mxDadataAddressSuggest' | snippet : [
    'input' => '[name="address_text_address"]',
    'connectorUrl' => $.modx.config.assets_url ~ 'components/mxdadata/connector-web.php',
]}
```

```modx
[[!mxDadataAddressSuggest?
    &input=`[name="address_text_address"]`
    &connectorUrl=`[[++assets_url]]components/mxdadata/connector-web.php`
]]
```

:::

::: tip Fenom и `auto_escape`
При включённом **auto_escape** выводите сниппет как сырой HTML, иначе скрипты могут экранироваться.
:::

## Поведение

- Скрипт регистрируется в конец страницы; инициализация после `DOMContentLoaded` и готовности `window.mxDadataAddressSuggest`
- Отладка в консоли: `mxdadata_debug_mode`, `?mxdadata_debug=1`, `localStorage mxdadata_web_debug = 1` — см. [Интеграция → отладка](/components/mxdadata/integration#отладка-на-витрине)

## См. также

- [Подключение на сайте](/components/mxdadata/frontend) — имена полей MS3
- [mxDadataForm](mxDadataForm) — сложные схемы с `subject` / `master`
