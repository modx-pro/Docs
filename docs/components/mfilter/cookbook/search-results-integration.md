# Фильтры на странице результатов поиска

Рецепт интеграции mFilter со страницей результатов поиска (mSearch).

## Проблема

На странице результатов поиска фильтры не отображаются (или показывается только `vendor_id`), хотя FilterSet привязан к странице и профайлер считает suggestions для всех фильтров.

Типичная разметка:

```html
{'!mSearchForm' | snippet : ['autocomplete' => 1]}

<div class="catalog-wrapper">
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet}
    </aside>

    <div class="catalog-content">
        {'!mFilter' | snippet : [
            'element' => 'msProducts',
            'parents' => $_modx->resource.id,
            ...
        ]}
    </div>
</div>
```

## Причина

Сниппет `mFilter` формирует список ID товаров из `mSearch` и сохраняет его в плейсхолдер `mfilter.baseIds`. Этот список использует `mFilterForm` для построения релевантных suggestions.

Но в примере выше `mFilterForm` вызывается **раньше** `mFilter` — в момент рендера формы плейсхолдер ещё пуст. `mFilterForm` падает в стандартный режим: ищет значения фильтров у дочерних ресурсов текущей страницы. У страницы «Результаты поиска» дочерних товаров обычно нет → пустые suggestions → фильтры скрыты.

Исключение — `vendor_id`: он берёт список брендов напрямую из `msVendor` и при отсутствии подходящих товаров просто не добавляет фильтр по ID. Поэтому показывает всех брендов системы.

## Решение

Вызвать `mFilter` **первым** и сохранить его вывод в переменную Fenom. Форма, рендерящаяся после, увидит готовые `mfilter.baseIds`.

```html
{'!mSearchForm' | snippet : ['autocomplete' => 1]}

{set $mfilterOutput = '!mFilter' | snippet : [
    'element' => 'msProducts',
    'parents' => $_modx->resource.id,
    'includeThumbs' => 'small,medium',
    'includeVendorFields' => 'name,logo',
    'formatPrices' => 1,
    'withCurrency' => 1,
    'limit' => 12,
    'sortby' => 'menuindex',
    'sortdir' => 'ASC',
    'tplOuter' => 'mfilter.outer',
    'tpl' => 'tpl.msProducts.row',
    'tpls' => ['tpl1' => 'mfilter.grid', 'tpl2' => 'mfilter.row']
]}

<div class="catalog-wrapper">
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet}
    </aside>

    <div class="catalog-content">
        {$mfilterOutput}
    </div>
</div>
```

Конструкция `{set $x = '!mFilter' | snippet : [...]}`:

- Вызывает сниппет **немедленно** — плейсхолдеры (`mfilter.baseIds`, `mfilter.total`, `mfilter.hash` и др.) устанавливаются как сайд-эффект.
- Результат рендера (`tplOuter`) сохраняется в `$mfilterOutput`.
- Сниппет `mFilterForm`, вызванный следующим, уже видит `mfilter.baseIds` и строит suggestions по найденным товарам.
- Готовый HTML выводится там, где нужно, через `{$mfilterOutput}`.

## Важно

- Не используйте параметр `toPlaceholders` у `mFilter` — он разбивает вывод на `mfilter.results` и `mfilter.pagination` **без** оборачивающего `tplOuter`-чанка. Теряются атрибуты `data-mfilter-results`, `data-page-count`, `data-total` и прочая SSR-инициализация.
- Привяжите страницу результатов поиска к FilterSet в админке mFilter — без этого фильтры не сконфигурированы, независимо от порядка вызовов.
- Параметр `parents` в вызове `mFilter` может быть любым подходящим: страница поиска, корень каталога или `0`. `mFilter` всё равно отдаст приоритет ID из `mSearch`.
