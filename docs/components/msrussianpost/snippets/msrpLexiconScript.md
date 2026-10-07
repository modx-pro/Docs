---
title: msrpLexiconScript
---
# Сниппет msrpLexiconScript

Выводит встроенный тег **`script`** с объектом **`window.msrpLexicon`**: строки интерфейса виджета на языке текущего контекста сайта в MODX.

Подключается лексикон **`msrussianpost:default`**. Ключи в JavaScript совпадают с именами записей лексикона (префикс `msrussianpost_`).

## Параметры

Параметров **нет**.

## Порядок вызова

Вызывать **строго перед** [msRussianPost](msRussianPost) и до загрузки `russianpost.js`, чтобы при инициализации скрипта объект `window.msrpLexicon` уже существовал.

## Пример

::: code-group

```modx
[[!msrpLexiconScript]]
[[!msRussianPost]]
```

```fenom
{'msrpLexiconScript' | snippet}
{'msRussianPost' | snippet}
```

:::

## Ключи в `window.msrpLexicon`

Сниппет берёт фиксированный список из массива `$keys` в своём коде (`core/components/msrussianpost/elements/snippets/msrpLexiconScript.php`). Ключи, которые читает `russianpost.js` на витрине:

- `msrussianpost_calculating` — текст во время расчёта
- `msrussianpost_select_method` — приглашение выбрать способ
- `msrussianpost_days` — подпись единицы срока в списке методов
- `msrussianpost_free_delivery` — «бесплатно», если у метода нет цены
- `msrussianpost_no_methods` — API не вернул ни одного метода
- `msrussianpost_error_no_index` — в поле индекса меньше шести цифр
- `msrussianpost_error_api` — коннектор недоступен, ответил ошибкой или запрос отвалился по таймауту

Остальные ключи из `$keys` на витрине не читаются:

- `msrussianpost_delivery_cost` — использует чанк `tplRussianPostStatus`, он берёт строку из лексикона MODX на стороне сервера, а не из `window.msrpLexicon`;
- `msrussianpost_error_invalid_index` — только в разделе **Extras → Почта России** в менеджере;
- `msrussianpost_delivery_period` — в коде пакета не используется: ни JS, ни чанки его не читают.

## Почему сниппет обязателен {#why-required}

Запасных строк в JavaScript нет. Если ключа нет в объекте, `russianpost.js` подставляет **сам ключ**:

```js
const getLexicon = (key) => (lexicon[key] != null ? lexicon[key] : key);
```

Без `msrpLexiconScript` объект `window.msrpLexicon` не создаётся. До версии 1.0.1 в этом случае покупатель видел в статусе и в списке методов технические имена вида `msrussianpost_error_api` или `msrussianpost_select_method` — сниппет был обязателен на странице оформления заказа.

Начиная с версии **1.0.1** в `russianpost.js` встроены русские строки по умолчанию, поэтому технические ключи посетителю не показываются никогда, а в режиме отладки появляется предупреждение в консоли. Но текст останется русским на любом сайте, поэтому сниппет по-прежнему нужен для локализации — подключайте его **до** `msRussianPost` и `russianpost.js`.

Часть текста при этом не пострадает: чанк `tplRussianPostStatus` берёт начальные строки (`msrussianpost_calculating`, `msrussianpost_delivery_cost`, `msrussianpost_days`) из лексикона MODX напрямую, минуя `window.msrpLexicon`. Ломается всё, что выводит JS.

Строки переопределяются через лексикон MODX в текущем контексте сайта: сначала скрипт берёт `window.msrpLexicon`, а к встроенным русским строкам прибегает только когда ключа нет. Поэтому лексикон всегда приоритетнее, а подключение сниппета ничего не ломает.

Список ключей в сниппете сокращён до семи — именно столько читает `russianpost.js`. Ключи `msrussianpost_delivery_cost`, `msrussianpost_delivery_period` и `msrussianpost_error_invalid_index` больше не отправляются на клиент, потому что не читаются нигде.
