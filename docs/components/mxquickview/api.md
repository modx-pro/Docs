---
title: API и интерфейсы
---
# API и интерфейсы

## Сниппет `mxQuickView.initialize`

Подключает CSS/JS quick view и выводит HTML встроенной модалки.

### Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `modalSize` | из `mxquickview_modal_size` | Размер модалки: `modal-sm`, `modal-lg`, `modal-xl` |
| `mouseoverDelay` | из `mxquickview_mouseover_delay` | Задержка перед загрузкой по наведению |
| `modalLibrary` | `native` | Режим модалки: `native`, `bootstrap`, `fancybox` (`bootstrap5` поддерживается как alias) |
| `debug` | `0` | Включить диагностическое логирование в консоль (`[mxqv]`) |
| `loadingText` | из лексикона `mxqv_loading` | Текст индикатора загрузки в modal/selector |
| `fancyboxCss` | пусто | URL/путь к CSS Fancybox. Если пусто, используется bundled-файл `assets/components/mxquickview/vendor/fancybox/fancybox.css`, при отсутствии — CDN |
| `fancyboxJs` | пусто | URL/путь к JS Fancybox. Если пусто, используется bundled-файл `assets/components/mxquickview/vendor/fancybox/fancybox.umd.js`, при отсутствии — CDN |
| `bootstrapCss` | пусто | URL/путь к CSS Bootstrap для `modalLibrary=bootstrap`. Если пусто, используется bundled-файл `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.css`, при отсутствии — CDN |
| `bootstrapJs` | пусто | URL/путь к JS Bootstrap для `modalLibrary=bootstrap`. Если пусто, используется bundled-файл `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.js`, при отсутствии — CDN |

### data-атрибуты триггера

| Атрибут | Описание |
| --- | --- |
| `data-mxqv-click` | Триггер загрузки по клику |
| `data-mxqv-mouseover` | Триггер загрузки по наведению |
| `data-mxqv-mode` | Режим вывода: `modal` или `selector` (по умолчанию `modal`) |
| `data-mxqv-action` | Тип рендера: `chunk`, `snippet`, `template` (по умолчанию `chunk`) |
| `data-mxqv-element` | Имя/ID элемента для рендера (чанк, сниппет, шаблон) |
| `data-mxqv-id` | ID ресурса |
| `data-mxqv-title` | Заголовок модалки для `mode=modal` |
| `data-mxqv-output` | CSS selector контейнера для `mode=selector` |
| `data-mxqv-context` | Ключ контекста (для мультиязычности / мультисайта) |

### Примеры вызова

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
  &modalLibrary=`native`
  &debug=`1`
  &loadingText=`Загрузка...`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350,
  'modalLibrary' => 'native',
  'debug' => 1,
  'loadingText' => 'Загрузка...'
]}
```

:::

### Что добавляет на страницу

- `<link ... mxqv.min.css?v=filemtime>` (если `mxqv.min.css` отсутствует, fallback на `mxqv.css`)
- `<script>window.mxqvConfig = ...</script>`
- `<script src="...mxqv.min.js?v=filemtime" defer></script>` (если `mxqv.min.js` отсутствует, fallback на `mxqv.js`)
- разметку нативной модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`)
- при `modalLibrary=bootstrap` — bootstrap-контейнер `#mxqv-bootstrap-modal` и Bootstrap из `bootstrapCss/bootstrapJs` или bundled-файлы в `assets/components/mxquickview/vendor/bootstrap/`; если не найдено, используется CDN `bootstrap`
- при `modalLibrary=fancybox` — Fancybox из `fancyboxCss/fancyboxJs` или bundled-файлы в `assets/components/mxquickview/vendor/fancybox/`; если не найдено, используется CDN `@fancyapps/ui`

## CSS переменные нативной модалки

Переменные работают для встроенной модалки (`modalLibrary = native`) и объявлены в:

- `assets/components/mxquickview/css/mxqv.css`

### Полный список переменных

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `--mxqv-backdrop-bg` | `rgba(0, 0, 0, 0.5)` | Фон backdrop |
| `--mxqv-backdrop-z-index` | `1050` | Z-index backdrop |
| `--mxqv-backdrop-padding-mobile` | `0` | Отступы backdrop на мобильных |
| `--mxqv-backdrop-padding-tablet` | `1rem` | Отступы backdrop на tablet/desktop |
| `--mxqv-modal-bg` | `#fff` | Цвет фона модалки |
| `--mxqv-modal-radius-mobile` | `0` | Скругление модалки на мобильных |
| `--mxqv-modal-radius-tablet` | `0.25rem` | Скругление модалки на tablet/desktop |
| `--mxqv-modal-shadow` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` | Тень модалки |
| `--mxqv-modal-width-mobile` | `100%` | Рабочая ширина модалки на мобильных |
| `--mxqv-modal-width-tablet` | `90vw` | Рабочая ширина модалки на tablet/desktop |
| `--mxqv-modal-max-width-mobile` | `100%` | Максимальная ширина модалки на мобильных |
| `--mxqv-modal-max-width-tablet` | `90vw` | Максимальная ширина модалки на tablet/desktop |
| `--mxqv-modal-max-height-mobile` | `100%` | Максимальная высота модалки на мобильных |
| `--mxqv-modal-max-height-tablet` | `90vh` | Максимальная высота модалки на tablet/desktop |
| `--mxqv-modal-size-sm` | `24rem` | Максимальная ширина размера `modal-sm` |
| `--mxqv-modal-size-lg` | `50rem` | Максимальная ширина размера `modal-lg` |
| `--mxqv-modal-size-xl` | `70rem` | Максимальная ширина размера `modal-xl` |
| `--mxqv-header-gap` | `0.5rem` | Расстояние между элементами header |
| `--mxqv-header-padding` | `1rem 1.25rem` | Отступы заголовка |
| `--mxqv-header-border-color` | `#dee2e6` | Граница заголовка |
| `--mxqv-title-font-size` | `1.25rem` | Размер шрифта заголовка |
| `--mxqv-title-font-weight` | `600` | Насыщенность заголовка |
| `--mxqv-actions-gap` | `0.25rem` | Расстояние между кнопками действий |
| `--mxqv-btn-padding` | `0.25rem 0.5rem` | Отступы кнопок управления |
| `--mxqv-btn-radius` | `0.25rem` | Скругление кнопок управления |
| `--mxqv-btn-font-size` | `1.25rem` | Размер шрифта кнопок управления |
| `--mxqv-close-font-size` | `1.5rem` | Размер кнопки закрытия |
| `--mxqv-body-padding` | `1.25rem` | Отступы body |
| `--mxqv-btn-hover-bg` | `#f0f0f0` | Hover-фон кнопок в header |
| `--mxqv-loading-color` | `#6c757d` | Цвет текста индикатора загрузки |
| `--mxqv-loading-padding` | `1rem 0` | Отступы индикатора загрузки |

### Пример переопределения

```css
:root {
  --mxqv-modal-size-lg: 56rem;
  --mxqv-modal-size-xl: 76rem;
  --mxqv-modal-bg: #ffffff;
  --mxqv-header-border-color: #e9ecef;
  --mxqv-backdrop-bg: rgba(0, 0, 0, 0.6);
}
```

## Коннектор `assets/components/mxquickview/connector.php`

## Endpoint

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
| `context` | нет | Ключ контекста; если невалиден, будет `web` |
| `mode` | нет | `modal` или `selector` (служебно для snippet/template рендера) |
| `output` | нет | CSS selector целевого контейнера (для `mode=selector`) |
| `modal_library` | нет | `native`, `bootstrap`, `fancybox` (служебно для корректного selector у cart-сниппетов) |

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
| Нет права просмотра | `Access denied` |
| Чанк не в whitelist | `Chunk not allowed` |
| Чанк не найден | `Chunk not found` |
| Сниппет не в whitelist | `Snippet not allowed` |
| Сниппет не найден | `Snippet not found` |
| Шаблон не в whitelist | `Template not allowed` |
| Шаблон не найден | `Template not found` |
| Неподдерживаемый `data_action` | `Invalid action` |

Примечание: текст ошибок локализуется через лексикон `mxquickview:default` (ключи `mxqv_*`).

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
