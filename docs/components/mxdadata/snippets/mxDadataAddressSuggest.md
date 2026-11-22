---
title: mxDadataAddressSuggest
---

# Сниппет mxDadataAddressSuggest

Подключает `address-suggest.js` и инициализирует подсказки **адреса** через веб-коннектор. После выбора подсказки заполняются поля формы (город, индекс, FIAS, улица и т.д. — по маппингу в JS).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|----------------|
| **input** | CSS-селектор поля ввода адреса (строка или несколько через запятую) | `[name="address"], #address, [name="address_text_address"]` |
| **connectorUrl** | URL `connector-web.php` | `[[++assets_url]]components/mxdadata/connector-web.php` |

Значение **`input`** по умолчанию приходит из свойства сниппета, которое создаёт транспорт пакета. В PHP сниппета есть запасной список, шире транспортного: `#mxdadata-order-address, [name="address"], #address, [name="address_text_address"]`. Он срабатывает только если свойство не задано: в MODX 3 свойство элемента становится базой `$scriptProperties`, поэтому на практике доступен транспортный набор, а `#mxdadata-order-address` в него не входит. Если нужно повесить подсказку на поле из демо-чанка, передайте `input` явно, см. [mxDadata → поле адреса в демо](/components/mxdadata/frontend#поле-адреса-в-демо-не-подключается).

У `connectorUrl` в транспорте пустое значение, поэтому по умолчанию всегда подставляется `[[++assets_url]]components/mxdadata/connector-web.php`. Убедитесь, что `assets_url` заканчивается слэшем.

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
    'connectorUrl' => 'assets_url' | config ~ 'components/mxdadata/connector-web.php',
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

## Что заполняется после выбора

Из ответа DaData берутся восемь значений, каждое пишется в два поля: с «голым» `name` и с префиксом `address_`.

| Поле | Источник в ответе |
|---|---|
| `text_address` / `address_text_address` | `value`, иначе `unrestricted_value` |
| `city` / `address_city` | `city_with_type` → `city` → `settlement_with_type` → `settlement` |
| `region` / `address_region` | `region_with_type` → `region` |
| `street` / `address_street` | `street_with_type` → `street` → `street_type` + `street` |
| `building` / `address_building` | `house`, при непустом `block` дописывается пробел, строчная «к» и значение `block` |
| `room` / `address_room` | `flat` |
| `index` / `address_index` | `postal_code` |
| `fias_id` / `address_fias_id` | `fias_id` |

Набор полей зависит от того, откуда пришло значение:

- **`order/set` в MiniShop3**: сниппет читает `window.ms3Config.actionUrl` и отправляет один POST на `route=/api/v1/order/set` с телом `{fields: …}`. Из ответа берётся `data.order`, и значения расставляются по обоим именам. Без `ms3Config.actionUrl` черновик заказа **не** заполняется
- **Прямая подстановка в DOM**: если `ms3Config.actionUrl` недоступен или запрос не прошёл, сниппет пишет поля сам. `fias_id` и `address_text_address` при этом не заполняются

Куда искать поля: корень берётся от поля подсказки через `[data-ms3-form="order"]`, `form.ms3_order_form`, `.ms3_order_form`, `#mxdadata-test-order`, иначе весь документ. Подробности: [Подключение на сайте](/components/mxdadata/frontend#запись-в-черновик-заказа-ms3).

## Поведение

- Скрипт регистрируется в конец страницы. Инициализация — после `DOMContentLoaded` и готовности `window.mxDadataAddressSuggest`
- Библиотека опрашивается 100 раз по 50 мс (около 5 секунд). Если она не появилась, в консоль пишется ошибка, инициализация прекращается
- Поле, к которому уже подключена подсказка, помечается `data-mxdadata-init` и повторно не обрабатывается
- Пауза перед запросом 300 мс, минимум 3 символа, предыдущий запрос отменяется через `AbortController`. Клиентского кэша подсказок нет, каждый ввод после паузы даёт запрос к коннектору
- На поле подсказки перехватывается событие `change` в фазе захвата, чтобы MS3 не перезаписал значение
- Отладка в консоли: `mxdadata_debug_mode`, `?mxdadata_debug=1`, `localStorage mxdadata_web_debug = 1`. См. [Интеграция → отладка](/components/mxdadata/integration#отладка-на-витрине)

## См. также

- [Подключение на сайте](/components/mxdadata/frontend) — имена полей MS3
- [mxDadataForm](mxDadataForm) — сложные схемы с `subject` / `master`
