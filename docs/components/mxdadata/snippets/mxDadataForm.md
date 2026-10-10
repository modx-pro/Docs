---
title: mxDadataForm
---

# Сниппет mxDadataForm

Один сниппет, **`dadata-form.js`**: несколько полей внутри контейнера с конфигом **JSON**. Без jQuery. Типы: **ADDRESS**, **NAME**, **EMAIL**, **BANK**, **PARTY**, **GEOLOCATE** (кнопка геолокации), **VERSION_INFO** (вывод версии API).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **selector** | Корень формы (один элемент) | `#dadata-form` |
| **suggestions** | JSON-строка с настройками полей (ключ = `id` или `name` внутри контейнера) | `{}` |
| **suggestionsChunk** | Имя чанка MODX, в теле **только JSON** (удобно для Fenom: `{ignore}` / избегать пустого `suggestions` при `extends`) | — |
| **connectorUrl** | Веб-коннектор | `[[++assets_url]]components/mxdadata/connector-web.php` |

Значения `selector`, `suggestions` и `suggestionsChunk` приходят из свойств сниппета в транспорте и совпадают с запасными значениями в PHP. У **`connectorUrl`** в транспорте пустое значение, поэтому по умолчанию всегда подставляется `[[++assets_url]]components/mxdadata/connector-web.php`. Убедитесь, что `assets_url` заканчивается слэшем.

Если нет ни **suggestions**, ни валидного **suggestionsChunk**, в браузере получится пустой конфиг. Подсказки не заработают.

**Запасной вариант из файла:** при заданном **suggestionsChunk** сниппет сначала берёт содержимое чанка из БД. Если там пусто или не JSON, подставляется JSON из файла `core/components/mxdadata/elements/chunks/<имя_чанка>.tpl` (имя совпадает с параметром, с расширением `.tpl`). Удобно, когда чанк лежит в пакете, а в MODX ещё не создан.

## Примеры

### Параметр `suggestions` (email + address)

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

Ключ JSON ищется внутри контейнера `selector`: сначала как `id`, потом как `name`. Поле не найдено — оно пропускается, в консоль при отладке пишется `skip field (no input)`. Ключи, начинающиеся с `_`, скрипт пропускает целиком: так удобно временно отключить поле, не убирая его из JSON.

Типы полей, `subject`, `master`, **GEOLOCATE**, **VERSION_INFO**: [Интеграция → Универсальная форма mxDadataForm](/components/mxdadata/integration#универсальная-форма-mxdadataform).

::: tip Fenom и `auto_escape`
При включённом **auto_escape** выводите сниппет как сырой HTML. Для `mxDadataForm` в шаблонах с `{extends}` / `{block}` надёжнее передавать **`suggestionsChunk`**, а не длинный `suggestions` из переменной. Иначе в браузере может оказаться пустой `[]`.
:::

## Поведение

- Скрипт регистрируется в конец страницы. Инициализация — после `DOMContentLoaded` и готовности `window.mxDadataForm`
- Библиотека опрашивается 100 раз по 50 мс (около 5 секунд). Если она не появилась, в консоль пишется ошибка, инициализация прекращается
- Конфиг без валидного `suggestions` или без найденного `selector` и пустой `connectorUrl` приводит к отказу в инициализации с записью в консоль
- Пауза перед запросом 300 мс, предыдущий запрос отменяется через `AbortController`. Минимум 3 символа для **ADDRESS** и 1 символ для остальных типов. Клиентского кэша подсказок нет
- Метка подсказки берётся из `value`, иначе из `unrestricted_value`
- При выборе подсказки типа **PARTY**, если в значении 10 и больше цифр, скрипт автоматически добирает реквизиты запросом `Party/FindById` и раскладывает их по `subject` и `master`
- **GEOLOCATE** и **VERSION_INFO** — не поля ввода: скрипт ищет по ключу кнопку или элемент вывода внутри `selector`
- Отладка в консоли: `mxdadata_debug_mode`, `?mxdadata_debug=1`, `localStorage mxdadata_web_debug = 1`. См. [Интеграция → отладка](/components/mxdadata/integration#отладка-на-витрине)

## См. также

- [Подключение на сайте — демо чанка](/components/mxdadata/frontend#демо-чанка)
- [Интеграция](/components/mxdadata/integration)
