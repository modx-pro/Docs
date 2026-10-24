---
title: API и интерфейсы
---
# API и интерфейсы

## Сниппет `mxQuickView.initialize`

Подключает CSS/JS быстрого просмотра и выводит HTML встроенной модалки.

### Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `modalSize` | непустое свойство перекрывает `mxquickview_modal_size` (в transport `modal-lg`) | Классы `modal-sm`, `modal-lg`, `modal-xl` только для `native` и `bootstrap`. В `native` значение переводится в класс `qv-modal__box--sm/lg/xl` (неизвестное значение даёт `--lg`), в `bootstrap` подставляется в `modal-dialog` |
| `mouseoverDelay` | непустое свойство перекрывает `mxquickview_mouseover_delay` | Задержка наведения в мс. Пустая строка свойства = «не задано»: читается настройка (по умолчанию 300) |
| `modalLibrary` | `native` | `native`, `bootstrap`, `fancybox` (`bootstrap5` alias). Нет `window.bootstrap.Modal` или нет `#mxqv-bootstrap-modal` → `native`. Нет Fancybox API (`Fancybox.show`) → `native`. Проверка повторяется при каждом открытии: если API пропал уже после инициализации, компонент переключается на `native` |
| `debug` | `mxquickview_debug`, если параметр не передан | Лог `[mxqv]` в консоли. В карточке сниппета в панели управления поля нет, работает через `scriptProperties` |
| `loadingText` | лексикон `mxqv_loading` | Текст загрузки в modal/selector. Не в свойствах transport сниппета, только `scriptProperties` |
| `fancyboxCss` | `mxquickview_fancybox_css`, если параметр не задан или пустой | URL/путь к CSS Fancybox. Непустое значение используется как есть, без проверки существования файла. Пусто — поиск в `vendor/fancybox/`, затем CDN `@fancyapps/ui` |
| `fancyboxJs` | то же | JS Fancybox |
| `bootstrapCss` | то же | CSS Bootstrap для `modalLibrary=bootstrap` |
| `bootstrapJs` | то же | JS Bootstrap |

### data-атрибуты триггера

Читаются с элемента, на который повешен быстрый просмотр.

| Атрибут | Описание |
| --- | --- |
| `data-mxqv-click` | Загрузка по клику |
| `data-mxqv-mouseover` | Загрузка по наведению |
| `data-mxqv-mode` | Режим вывода: `modal` или `selector` (по умолчанию `modal`) |
| `data-mxqv-action` | Тип отрисовки: `chunk`, `snippet`, `template` (по умолчанию `chunk`) |
| `data-mxqv-element` | Имя/ID элемента для отрисовки (чанк, сниппет, шаблон) |
| `data-mxqv-id` | ID ресурса |
| `data-mxqv-title` | Заголовок модалки для `mode=modal` |
| `data-mxqv-output` | CSS selector контейнера для `mode=selector` |
| `data-mxqv-context` | Ключ контекста (несколько языков или сайтов) |
| `data-mxqv-parent` | Контейнер списка для loop |
| `data-mxqv-loop` | `true` — собрать соседние триггеры для prev/next (только клик, не mouseover) |

### data-атрибуты разметки компонента

Их ставит сам компонент или чанк, вручную задавать не нужно.

| Атрибут | Где появляется | Описание |
| --- | --- | --- |
| `data-mxqv-nav` | разметка `native` и `bootstrap` | Кнопка навигации, значение `prev` или `next`. На границах списка кнопка скрывается |
| `data-mxqv-close` | разметка `native` и `bootstrap` | Кнопка закрытия |
| `data-mxqv-fancybox-title` | заголовок внутри `.mxqv-fancybox-content` | Заголовок окна Fancybox |
| `data-mxqv-variants` | чанк товара, `.qv-product` | Флаг наличия вариантов, обрабатываются значения `true`, `1`, `yes`, `on` |
| `data-mxqv-variants-json` | чанк товара, `.qv-product` | JSON массива вариантов для пересчёта цены на клиенте |
| `data-mxqv-price` | чанк товара | Элемент, в который пишется текущая цена выбранного варианта |
| `data-mxqv-ms3-render-token` | коннектор, `.mxqv-ms3-render` | Токен рендера MiniShop3, переносится в `ms3Config.render.cart` |
| `data-mxqv-ms3-render-selector` | коннектор, `.mxqv-ms3-render` | CSS selector контейнера корзины, необязательный |

### Плейсхолдеры чанков поставки

`mxqv_product` (карточка товара)

| Плейсхолдер | Источник |
| --- | --- |
| `id` | поле ресурса |
| `pagetitle` | поле ресурса |
| `article` | поле `msProductData` (артикул MiniShop3) |
| `description` | `msProductData.description` либо поле ресурса |
| `price` | `msProductData.price` |
| `old_price` | `msProductData.old_price` |
| `thumb` | `msProductData.thumb`, иначе картинка-заглушка MiniShop3 |
| `assets_url` | системная настройка `assets_url` |
| `has_variants` | `true` или `false`, зависит от ms3Variants |
| `variants_html` | разметка выбора варианта от `msProductVariants` |
| `variants_json` | JSON вариантов: `id`, `sku`, `price`, `old_price`, `count`, `file_id`, `options` |

`mxqv_resource` (страница, статья, новость)

| Плейсхолдер | Источник |
| --- | --- |
| `id` | поле ресурса |
| `pagetitle` | поле ресурса |
| `introtext` | поле ресурса |
| `content` | поле ресурса |

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

- `<link ... mxqv.min.css?v=filemtime>` (если `mxqv.min.css` нет, запасной `mxqv.css`)
- `<script>window.mxqvConfig = ...</script>`
- `<script src="...mxqv.min.js?v=filemtime" defer></script>` (если `mxqv.min.js` нет, запасной `mxqv.js`)
- разметку нативной модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`)
- при `modalLibrary=bootstrap` — контейнер `#mxqv-bootstrap-modal` и Bootstrap. Путь берётся из `bootstrapCss/bootstrapJs` (или системных настроек) как есть; значение по умолчанию указывает на файлы в `assets/components/mxquickview/vendor/bootstrap/`. Только при пустом значении идёт поиск файла в `vendor/bootstrap/`, затем CDN `bootstrap@5.3.2`
- при `modalLibrary=fancybox` — Fancybox. Путь берётся из `fancyboxCss/fancyboxJs` (или системных настроек) как есть; значение по умолчанию указывает на файлы в `assets/components/mxquickview/vendor/fancybox/`. Только при пустом значении идёт поиск файла в `vendor/fancybox/`, затем CDN `@fancyapps/ui`

## CSS переменные нативной модалки

Для `modalLibrary=native` объявлены в `assets/components/mxquickview/css/mxqv.css`.

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
| `--mxqv-btn-hover-bg` | `#f0f0f0` | Фон кнопок в header при наведении |
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

Коннектор принимает только `POST` с `action=render` и отвечает JSON.

### Точка входа

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
| `context` | нет | Ключ контекста. Если невалиден, берётся `web` |
| `mode` | нет | `modal` или `selector`. Учитывается только в `renderSnippet` для `msCart` / `msMiniCart` |
| `output` | нет | CSS selector контейнера. Только для `msCart` при `mode=selector` (параметр `selector` сниппета) |
| `modal_library` | нет | `native`, `bootstrap`, `fancybox`. Только для `msCart`: selector корзины по умолчанию. Для Fancybox selector по умолчанию пустой: скрипт вешает token на актуальный контейнер |

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

В JSON поле `message` содержит **готовую строку**, не ключ. До загрузки MODX коннектор отдаёт английские литералы.

| Условие | Ключ лексикона | RU | EN |
| --- | --- | --- | --- |
| Метод не POST | `mxqv_invalid_request` есть в лексиконе, PHP не вызывает | | всегда `Invalid request method` |
| `action != render` | `mxqv_invalid_action` | лексикон: Недопустимое действие | |
| Не найден `index.php` | `mxqv_index_not_found` есть в лексиконе, PHP не вызывает | | всегда `index.php not found` |
| `element` пуст или `id <= 0` | `mxqv_missing_element_or_id` | Не переданы element или id | Missing element or id |
| Ресурс не найден | `mxqv_resource_not_found` | Ресурс не найден | Resource not found |
| Нет права просмотра | `mxqv_access_denied` | Доступ запрещён | Access denied |
| Чанк не в белом списке | `mxqv_chunk_not_allowed` | Чанк не разрешён | Chunk not allowed |
| Чанк не найден | `mxqv_chunk_not_found` | Чанк не найден | Chunk not found |
| Сниппет не в белом списке | `mxqv_snippet_not_allowed` | Сниппет не разрешён | Snippet not allowed |
| Сниппет не найден | `mxqv_snippet_not_found` | Сниппет не найден | Snippet not found |
| Шаблон не в белом списке | `mxqv_template_not_allowed` | Шаблон не разрешён | Template not allowed |
| Шаблон не найден | `mxqv_template_not_found` | Шаблон не найден | Template not found |
| Неподдерживаемый `data_action` | `mxqv_invalid_data_action` | Недопустимый тип рендера | Invalid action |

Имя сниппета в POST `element` для `data_action=snippet`: ведущий `!` снимается (`Render.php`).

## JS API (через события)

Отдельного объекта API нет. События `CustomEvent` публикуются на `document`:

| Событие | Когда | `detail` |
| --- | --- | --- |
| `mxqv:open` | модалка открыта | `{ title }` |
| `mxqv:close` | модалка закрыта | — |
| `mxqv:loaded` | контент вставлен в модалку | `{ content }` |
| `ms3:cart:updated` | после `reinitIntegrations()` | `{ source: 'mxqv' }` |

### Клавиатура (modal открыта)

- **Escape**: обрабатывается компонентом только при `modalLibrary=native`. В `bootstrap` окно закрывает сам Bootstrap, в `fancybox` — Fancybox.
- **← / →**: prev/next в списке loop. Проверяются только факт открытой модалки и индекс, поэтому работают во всех режимах, включая `fancybox`.

### Кнопки prev/next

Кнопки `[data-mxqv-nav="prev|next"]` есть только в разметке `native` и `bootstrap`. В `fancybox` `updateNavButtons()` не выполняется, кнопок нет; переключение остаётся на клавишах ← / →.

### Маркеры msCart / ms3 render

После отрисовки `msCart` в HTML добавляется скрытый `<span class="mxqv-ms3-render">` с:

- `data-mxqv-ms3-render-token` — токен для `ms3Config.render.cart`
- `data-mxqv-ms3-render-selector` — необязательный CSS selector контейнера корзины

Маркер появляется только при работающем сервисе MiniShop3 `ms3_token_service` с методом `generateSnippetToken`. Без него `msCart` отрисуется, но токен в `ms3Config.render.cart` не попадёт.

JS переносит token в `window.ms3Config.render.cart` без inline-script. Если у контейнера, в который вставлен ответ, нет `id`, компонент генерирует его сам: `mxqv-ms3-cart-{timestamp}-{random}`, и этот `id` подставляется в `selector` записи рендера.

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
