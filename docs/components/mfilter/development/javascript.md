# JavaScript

Скрипты mFilter подключаются сами и сами находят форму фильтров — для обычного каталога здесь ничего делать не нужно.

Управлять фильтром из своего кода — [JS API](js-api). Работать с сервером без формы, из своего приложения — [Headless API](headless).

## Подключение

Стили и скрипты добавляет плагин mFilter — на каждую страницу сайта, даже без формы фильтров. Список файлов — в системной настройке `mfilter.frontend_assets`, скрипты встают в конец страницы с атрибутом `defer`.

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

Скрипты шлют запросы на `/assets/components/mfilter/api.php`. С выключенной `mfilter.register_frontend` плагин не выводит адрес API, поэтому на сайте в подкаталоге или с другим `assets_url` задайте его перед скриптами сами:

```fenom
<script>var mfilterConfig = { apiUrl: '{$_modx->config.assets_url}components/mfilter/api.php' };</script>
```

## Настройки формы {#form-options}

Поведение формы задают `data`-атрибуты тега `<form>`. Сниппет `mFilterForm` выводит свои атрибуты переменной `{$formAttrs}` в чанке формы — параметр `&tplOuter`, по умолчанию `mfilter.form`. В своей копии чанка оставьте переменную и допишите нужные атрибуты рядом:

```fenom
<form{$formAttrs} data-mfilter-pagination-mode="loadmore">
```

Три атрибута `mFilterForm` выводит сам — их меняют параметрами сниппета:

- `data-mfilter-mode` — параметр `&ajaxMode`. При включённой автоотправке режим всегда `instant`.
- `data-mfilter-auto-submit` — параметр `&autoSubmit`, по умолчанию — настройка `mfilter.auto_submit`.
- `data-mfilter-delay` — параметр `&autoSubmitDelay`, по умолчанию — настройка `mfilter.auto_submit_delay`.

Не дописывайте в чанк второй такой же атрибут: из двух одинаковых браузер учитывает только первый. Это касается и служебных атрибутов из `{$formAttrs}`: `id`, `class`, `method`, `action`, адресов, разделителей, текущих фильтров и `data-mfilter-debug` при включённой настройке `mfilter.debug_profiler`. `id` и `class` формы меняют параметры `&formId` и `&formClass` — см. [mFilterForm](../snippets/mfilterform#forma).

Так выглядит тег стандартного чанка формы, когда ничего не выбрано:

```html
<form id="mfilter-form"
      class="mfilter-form"
      method="POST"
      action="bytovaya-tehnika/"
      data-mfilter="true"
      data-mfilter-mode="instant"
      data-mfilter-auto-submit="true"
      data-mfilter-delay="300"
      data-mfilter-action="/assets/components/mfilter/api.php"
      data-resource-id="152148"
      data-base-url="/bytovaya-tehnika/"
      data-mfilter-url-separator="--"
      data-mfilter-values-separator="-or-"
      data-mfilter-active-filters="{}">
```

`data-mfilter-mode`, `data-mfilter-auto-submit` и `data-mfilter-delay` задают параметры сниппета, остальное — служебные атрибуты.

«По умолчанию» в таблице — значение, когда атрибута нет. «Опция» — то же название для [формы, созданной вручную](js-api#sozdat-formu-vruchnuyu). Атрибут-переключатель выключается только значением `"false"`, любое другое, даже пустое, его включает.

| Атрибут | Опция | По умолчанию | Что задаёт |
|---|---|---|---|
| `data-mfilter-mode` | `ajaxMode` | `form` | `instant` — следить за полями формы. Без этого не работают автоотправка и событие `mfilter:change` |
| `data-mfilter-auto-submit` | `autoSubmit` | `false` | Отправлять запрос при изменении поля |
| `data-mfilter-delay` | `autoSubmitDelay` | `500` | Задержка автоотправки, мс |
| `data-mfilter-ajax` | `ajax` | `true` | `false` — кнопка отправки формы и ссылки пагинации перезагружают страницу. Автоотправка, сортировка, число на странице и JS API по-прежнему обновляют выдачу без перезагрузки |
| `data-mfilter-seo-url` | `seoUrl` | `true` | `false` — при загрузке читать фильтры из параметров адреса, а не из SEO-адреса. Адрес после фильтрации всё равно SEO: его строит сервер |
| `data-mfilter-push-state` | `pushState` | `true` | Менять адрес страницы и историю браузера |
| `data-mfilter-reset-page` | `resetPage` | `true` | Возвращаться на первую страницу при смене фильтров |
| `data-mfilter-scroll-to-results` | `scrollToResults` | `true` | Прокручивать к результатам после обновления |
| `data-mfilter-scroll-offset` | `scrollOffset` | `100` | Отступ прокрутки сверху, px |
| `data-mfilter-pagination` | `paginationSelector` | `.mfilter-pagination` | Куда вставлять пагинацию |
| `data-mfilter-pagination-mode` | `paginationMode` | `links` | `links`, `loadmore` или `infinite` — см. [Пагинация](../frontend/pagination) |
| `data-mfilter-loading-overlay` | `loadingOverlay` | `true` | Добавлять класс `active` элементу `.mfilter-overlay` на время запроса. В стандартных чанках этого элемента нет — см. [Индикатор загрузки](../cookbook/index#indikator-zagruzki) |
| `data-mfilter-debug` | `debug` | `false` | Предупреждения о разметке в консоли браузера и замеры запроса в блоке `.mfilter-profiler` |
| — | `resultsSelector` | `.mfilter-results` | Куда вставлять карточки |
| — | `totalSelector` | `.mfilter-total` | Где обновлять число найденных товаров |
| — | `emptyResultsSelector` | `.mfilter-empty` | Блок «ничего не найдено» |
| — | `profilerSelector` | `.mfilter-profiler` | Куда выводить замеры при `debug` |
| — | `infiniteOffset` | `200` | За сколько пикселей до конца выдачи подгружать следующую страницу при `infinite` |
| — | `loadingClass` | `mfilter-loading` | Класс формы на время запроса |

## Слайдер диапазона

Слайдер у числового фильтра строит библиотека noUiSlider, она входит в mFilter. Скрипт находит элемент с атрибутом `data-mfilter-slider` и связывает его с полями `data-range="min"` и `data-range="max"`. Поля ищутся внутри родителя слайдера, поэтому все три элемента должны лежать в общем блоке.

Разметка — стандартный чанк `mfilter.slider`, параметр `&tplSlider` сниппета `mFilterForm`. Чтобы настроить слайдер, допишите атрибуты элементу слайдера в своей копии чанка:

```fenom
<div data-mfilter-slider data-key="{$key}" data-min="{$min}" data-max="{$max}" data-step="100" data-pips="true"></div>
```

| Атрибут | Без атрибута | Что задаёт |
|---|---|---|
| `data-step` | Шаг подбирается сам — до ста шагов на весь диапазон | Шаг ручек |
| `data-tooltips="false"` | Над ручками видны числа | Скрыть числа над ручками |
| `data-pips="true"` | Шкалы нет | Шкала с делениями под слайдером |

| Без атрибутов | `data-pips="true"` | `data-tooltips="false"` |
|---|---|---|
| ![Слайдер без атрибутов](/components/mfilter/screenshots/slider-default.png) | ![Слайдер со шкалой](/components/mfilter/screenshots/slider-pips.png) | ![Слайдер без чисел над ручками](/components/mfilter/screenshots/slider-no-tooltips.png) |

Поставить диапазон из своего кода — `mfilterGet().setFilter('price', { min: 1000, max: 5000 })`, слайдер передвинется сам. Подробнее — [JS API](js-api).
