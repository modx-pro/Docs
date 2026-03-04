---
title: API и интерфейсы
---
# API и интерфейсы

## Сниппет `mxQuickView.initialize`

Подключает CSS/JS quick view и выводит HTML встроенной модалки.

### Минимальный вызов

::: code-group

```fenom
{'!mxQuickView.initialize'|snippet}
```

```modx
[[!mxQuickView.initialize]]
```

:::

### Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `frontCss` | из `mxquickview_front_css` | Подключать CSS |
| `frontJs` | из `mxquickview_front_js` | Подключать JS |
| `modalSize` | из `mxquickview_modal_size` | Размер модалки: `modal-sm`, `modal-lg`, `modal-xl` |
| `mouseoverDelay` | из `mxquickview_mouseover_delay` | Задержка перед загрузкой по наведению |
| `modalLibrary` | `native` | Значение передаётся в `window.mxqvConfig` |

### Примеры вызова с параметрами

::: code-group

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350
]}
```

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
]]
```

:::

### Что добавляет на страницу

- `<link ... mxqv.css?v=filemtime>` (если `frontCss=1`)
- `<script>window.mxqvConfig = ...</script>`
- `<script src="...mxqv.js?v=filemtime" defer></script>` (если `frontJs=1`)
- разметку модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`)

## Коннектор `assets/components/mxquickview/connector.php`

### Endpoint

- Метод: `POST`
- `Content-Type` запроса: `application/x-www-form-urlencoded`
- Ответ: JSON `{ success, html?, message? }`

### Параметры POST

| Параметр | Обязательный | Описание |
| --- | --- | --- |
| `action` | да | Только `render` |
| `data_action` | нет | `chunk`, `snippet`, `template` (по умолчанию `chunk`) |
| `element` | да | Имя чанка/сниппета/шаблона |
| `id` | да | ID ресурса (целое > 0) |
| `context` | нет | Ключ контекста рендера. Если невалиден, используется `web`, но при несовпадении с `context_key` ресурса возвращается `Access denied` |

### Успешный ответ

```json
{
  "success": true,
  "html": "<div>...</div>"
}
```

### Ответ с ошибкой

```json
{
  "success": false,
  "message": "Chunk not allowed",
  "html": ""
}
```

## Ошибки и сообщения

| Условие | `message` |
| --- | --- |
| Метод не POST | `Invalid request method` |
| `action != render` | `mxqv_invalid_action` (лексикон) |
| Не найден `index.php` | `index.php not found` |
| `element` пуст или `id <= 0` | `Missing element or id` |
| Ресурс не найден | `Resource not found` |
| `context` не совпадает с `context_key` ресурса | `Access denied` |
| Ресурс не опубликован/вне окна публикации и нет права `view_unpublished` | `Access denied` |
| Нет права просмотра | `Access denied` |
| Чанк не в whitelist | `Chunk not allowed` |
| Сниппет не в whitelist | `Snippet not allowed` |
| Шаблон не в whitelist (при непустом списке) | `Template not allowed` |
| Неподдерживаемый `data_action` | `Invalid action` |

## JS API (через события)

Компонент не экспортирует отдельный объект API, но публикует события `CustomEvent` на `document`:

| Событие | Когда | `detail` |
| --- | --- | --- |
| `mxqv:open` | модалка открыта | `{ title }` |
| `mxqv:close` | модалка закрыта | — |
| `mxqv:loaded` | контент вставлен в модалку | `{ content }` |

## Пример запроса

```javascript
const response = await fetch('/assets/components/mxquickview/connector.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    action: 'render',
    data_action: 'chunk',
    element: 'mxqv_product',
    id: '7'
  })
});

const data = await response.json();
```
