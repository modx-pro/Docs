# JavaScript

Скрипты mFilter подключаются сами и сами находят форму фильтров — для обычного каталога здесь ничего делать не нужно. Страница пригодится, чтобы подключить скрипты вручную, настроить поведение формы или слайдер диапазона.

Управлять фильтром из своего кода — [JS API](js-api). Работать с сервером без формы, из своего приложения — [Headless API](headless).

## Подключение

Стили и скрипты добавляет плагин mFilter — на каждую страницу сайта, даже без формы фильтров. Список файлов берётся из системной настройки `mfilter.frontend_assets`, скрипты встают в конец страницы с атрибутом `defer`.

Чтобы подключать файлы самому, выключите настройку `mfilter.register_frontend` и добавьте в шаблон ресурса те же файлы в том же порядке:

```html
<link rel="stylesheet" href="/assets/components/mfilter/css/web/vendor/nouislider/nouislider.min.css">
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">

<script src="/assets/components/mfilter/js/web/vendor/nouislider/nouislider.min.js" defer></script>
<script src="/assets/components/mfilter/js/web/core/ApiClient.js" defer></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js" defer></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js" defer></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js" defer></script>
<script src="/assets/components/mfilter/js/web/ui/FilterUI.js" defer></script>
<script src="/assets/components/mfilter/js/web/ui/SelectedFilters.js" defer></script>
<script src="/assets/components/mfilter/js/web/mfilter.slider.js" defer></script>
<script src="/assets/components/mfilter/js/web/mfilter.js" defer></script>
```

Порядок не меняйте: `mfilter.js` запускает форму и рассчитывает, что остальные файлы уже загружены. После обновления mFilter сверьте список с настройкой `mfilter.frontend_assets` — в новых версиях в неё добавляются файлы.

## Настройки формы {#form-options}

Поведение формы задают `data`-атрибуты тега `<form>`. Сниппет `mFilterForm` выводит свои атрибуты переменной `{$formAttrs}` в чанке формы — параметр `&tplOuter`, по умолчанию `mfilter.form`. В своей копии чанка оставьте переменную и допишите нужные атрибуты рядом:

```fenom
<form{$formAttrs} data-mfilter-pagination-mode="loadmore">
```

Три атрибута — `data-mfilter-mode`, `data-mfilter-auto-submit` и `data-mfilter-delay` — `mFilterForm` выводит сам. Их меняют параметрами сниппета `&ajaxMode`, `&autoSubmit` и `&autoSubmitDelay`. Второй такой же атрибут в чанк не дописывайте: из двух одинаковых браузер учитывает только первый. Без параметров автоотправка и её задержка берутся из настроек `mfilter.auto_submit` и `mfilter.auto_submit_delay`, а при включённой автоотправке режим всегда `instant`.

«По умолчанию» в таблице — значение, когда атрибута нет. В колонке «Опция» — то же название для [формы, созданной вручную](js-api#sozdat-formu-vruchnuyu).

| Атрибут | Опция | По умолчанию | Что задаёт |
|---|---|---|---|
| `data-mfilter-mode` | `ajaxMode` | `form` | `instant` — следить за полями формы. Без этого не работают автоотправка и событие `mfilter:change` |
| `data-mfilter-auto-submit` | `autoSubmit` | `false` | Отправлять запрос при изменении поля |
| `data-mfilter-delay` | `autoSubmitDelay` | `500` | Задержка автоотправки, мс |
| `data-mfilter-ajax` | `ajax` | `true` | `false` — форма и ссылки пагинации перезагружают страницу |
| `data-mfilter-seo-url` | `seoUrl` | `true` | SEO-адрес вместо параметров в адресе |
| `data-mfilter-push-state` | `pushState` | `true` | Менять адрес страницы и историю браузера |
| `data-mfilter-reset-page` | `resetPage` | `true` | Возвращаться на первую страницу при смене фильтров |
| `data-mfilter-scroll-to-results` | `scrollToResults` | `true` | Прокручивать к результатам после обновления |
| `data-mfilter-scroll-offset` | `scrollOffset` | `100` | Отступ прокрутки сверху, px |
| `data-mfilter-pagination` | `paginationSelector` | `.mfilter-pagination` | Куда вставлять пагинацию |
| `data-mfilter-pagination-mode` | `paginationMode` | `links` | `links`, `loadmore` или `infinite` — см. [Пагинация](../frontend/pagination) |
| `data-mfilter-loading-overlay` | `loadingOverlay` | `true` | Добавлять класс `active` элементу `.mfilter-overlay` на время запроса |
| `data-mfilter-debug` | `debug` | `false` | Предупреждения о разметке в консоли браузера и замеры запроса в блоке `.mfilter-profiler` |
| — | `resultsSelector` | `.mfilter-results` | Куда вставлять карточки |
| — | `loadingClass` | `mfilter-loading` | Класс формы на время запроса |

Атрибут-переключатель выключает только значение `"false"`, любое другое, в том числе пустое, включает.

## Слайдер диапазона

Слайдер у числового фильтра строит библиотека noUiSlider, она входит в mFilter. Скрипт находит элемент `data-mfilter-slider` и связывает его с полями `data-range="min"` и `data-range="max"`. Поля ищутся внутри родителя слайдера, поэтому все три элемента должны лежать в общем блоке.

Разметка — стандартный чанк `mfilter.slider`, параметр `&tplSlider` сниппета `mFilterForm`. Чтобы настроить слайдер, допишите атрибуты элементу слайдера в своей копии чанка:

```fenom
<div data-mfilter-slider data-key="{$key}" data-min="{$min}" data-max="{$max}" data-step="100" data-pips="true"></div>
```

| Атрибут | Без атрибута | Что задаёт |
|---|---|---|
| `data-step` | Шаг подбирается сам — до ста шагов на весь диапазон | Шаг ручек |
| `data-tooltips="false"` | Над ручками видны числа | Скрыть числа над ручками |
| `data-pips="true"` | Шкалы нет | Шкала с делениями под слайдером |

Поставить диапазон из своего кода — `mfilterGet().setFilter('price', { min: 1000, max: 5000 })`, слайдер передвинется сам. Подробнее — [JS API](js-api).
