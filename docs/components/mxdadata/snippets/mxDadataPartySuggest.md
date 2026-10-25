---
title: mxDadataPartySuggest
---

# Сниппет mxDadataPartySuggest

Подключает `party-suggest.js`: подсказки организаций и автозаполнение полей **ИНН**, наименования, КПП, ОГРН, юридического адреса.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|----------------|
| **innInput** | CSS-селектор поля ИНН (строка или несколько через запятую) | `[name="inn"], #inn, [name="address_inn"]` |
| **connectorUrl** | URL веб-коннектора | `[[++assets_url]]components/mxdadata/connector-web.php` |

Значение **`innInput`** приходит из свойства сниппета в транспорте и совпадает с запасным списком в PHP сниппета, так что набор селекторов одинаковый. У **`connectorUrl`** в транспорте пустое значение, поэтому по умолчанию всегда подставляется `[[++assets_url]]components/mxdadata/connector-web.php`. Убедитесь, что `assets_url` заканчивается слэшем.

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
    'connectorUrl' => 'assets_url' | config ~ 'components/mxdadata/connector-web.php',
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

## Что заполняется после выбора

Реквизиты пишутся в поля формы напрямую, запроса в `order/set` этот сниппет не делает. Каждое значение идёт в два поля: с «голым» `name` и с префиксом `address_`.

| Поле | Источник в ответе DaData |
|---|---|
| `company_name` / `address_company_name` | `name` по цепочке `full_with_opf` → `short_with_opf` → `full` → `short` → `name` → `value` |
| `kpp` / `address_kpp` | `kpp` |
| `ogrn` / `address_ogrn` | `ogrn`, запасной `ogrnip` |
| `legal_address` / `address_legal_address` | `address.value` или строка `address` |

Поля ищутся во всём документе, без привязки к форме заказа. Если на странице есть другие поля с теми же именами, они заполнятся тоже.

## Поведение

- Скрипт регистрируется в конец страницы. Инициализация — после `DOMContentLoaded` и готовности `window.mxDadataPartySuggest`
- Библиотека опрашивается 100 раз по 50 мс (около 5 секунд). Если она не появилась, в консоль пишется ошибка, инициализация прекращается
- Поле ИНН, к которому уже подключена подсказка, помечается `data-mxdadata-party-init` и повторно не обрабатывается
- Считаются только цифры. Пауза перед запросом 300 мс: от 4 цифр идёт `Suggest/Party` со списком, от 10 цифр — точный `Party/FindById` вместе с заполнением реквизитов
- После ответа DaData по **Party/FindById** поле ИНН может обновляться скриптом. Повторный лишний запрос **FindById** на то же значение не выполняется (нет зацикливания при программной подстановке ИНН)
- Отладка в консоли: `mxdadata_debug_mode`, `?mxdadata_debug=1`, `localStorage mxdadata_web_debug = 1`. См. [Интеграция → отладка](/components/mxdadata/integration#отладка-на-витрине)

## См. также

- [Админка → Юрлица](/components/mxdadata/admin-ui#юрлица-party) — сверка полей с ответом API
- [Подключение на сайте](/components/mxdadata/frontend) — имена полей `address_inn` и т.д.
