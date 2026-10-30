# mFilterCrumbs

Сниппет выводит хлебные крошки с выбранными фильтрами. Работает поверх pdoCrumbs.

## Описание

Вывод зависит от адреса страницы:

- **Страница с фильтрами** — фильтры в SEO-адресе: `/catalog/color--red/`. Сниппет берёт крошки разделов у pdoCrumbs, добавляет по крошке на каждый фильтр и выводит всё своими чанками. В выводе — обёртка `nav.mfilter-crumbs`, микроразметка Schema.org, при `schemaJsonLd` — JSON-LD.
- **Остальные страницы** — без фильтров или с фильтрами в строке запроса: `?color=red`. Сниппет передаёт вызов pdoCrumbs целиком, и тот выводит крошки своими чанками (`<ol class="breadcrumb">`), без микроразметки и JSON-LD.

Крошку фильтра даёт сегмент адреса вида `ключ--значение`. Диапазоны — цена, даты — и сегменты из [паттернов URL](../interface/patterns) крошек не дают. После фильтрации без перезагрузки крошки не обновляются — остаются такими, как при загрузке страницы.

## Параметры

### Свои параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showFilterCrumbs` | `true` | Показывать крошки фильтров |
| `tplFilterCrumb` | как `tpl` | Чанк крошки фильтра, кроме последней: её выводит `tplCurrent`. При одном фильтре в адресе не применяется |
| `schemaJsonLd` | `false` | Добавить JSON-LD в конец вывода. Работает только на странице с фильтрами в SEO-адресе |

### Чанки

Значения по умолчанию из таблицы действуют на странице с фильтрами в SEO-адресе. На остальных страницах — значения по умолчанию pdoCrumbs, а чанки, переданные в вызове, pdoCrumbs выводит и там.

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | встроенный, с разметкой Microdata | Чанк крошки |
| `tplCurrent` | встроенный | Чанк текущей крошки (без ссылки) |
| `tplHome` | — | Чанк главной страницы |
| `tplWrapper` | встроенный: `nav.mfilter-crumbs` и `ol` | Обёртка списка. Получает `{$output}` |

### Параметры pdoCrumbs

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showCurrent` | `true` | Показывать текущую крошку. На странице с фильтрами при `0` скрывается последняя крошка фильтра, но в JSON-LD она остаётся |
| `showHome` | `false` | Показывать главную страницу |
| `fastMode` | `false` | Быстрый режим обработки чанков |
| `outputSeparator` | пусто на странице с фильтрами, перевод строки — на остальных | Разделитель между крошками |
| `scheme` | значение `link_tag_scheme` | Вид адресов разделов, как у pdoCrumbs |

Прочие параметры pdoCrumbs действуют на остальных страницах. На странице с фильтрами не учитываются `hideSingle`, `tplMax`, `toSeparatePlaceholders`, `tplOdd`, чанки по номеру и `direction`.

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `toPlaceholder` | — | Вывести в плейсхолдер вместо возврата |
| `return` | — | `data` — вернуть массив вместо HTML: все крошки, включая текущий раздел и главную при `showHome`, а на странице с фильтрами — и крошки фильтров. `showCurrent` здесь не учитывается |
| `wrapIfEmpty` | `false` | Применять `tplWrapper` и к пустому результату |

## Переменные чанков

### Общие

| Переменная | Описание |
|-------------|----------|
| `{$id}` | ID ресурса (0 у крошки фильтра) |
| `{$pagetitle}`, `{$menutitle}` | Заголовок раздела; у крошки фильтра — подписи значений через запятую |
| `{$longtitle}` | Длинный заголовок раздела; у крошки фильтра — «Метка: значения», например «Цвет: Красный, Синий» |
| `{$link}` | Адрес крошки. Адрес раздела — как у pdoCrumbs, зависит от `scheme`; адрес фильтра — от корня сайта: `/catalog/color--red/` |
| `{$idx}` | Порядковый номер |
| `{$position}` | Позиция для Schema.org — только на странице с фильтрами. Для своего чанка с разметкой Microdata на всех страницах берите `{$idx}` |

### Только у крошек фильтров

| Переменная | Описание |
|-------------|----------|
| `{$is_filter}` | `true`, если это крошка фильтра |
| `{$filter_key}` | Ключ фильтра: `color`, `size` |
| `{$filter_label}` | Название фильтра: подпись из набора фильтров, затем лексикон `mfilter.field.<ключ>`, иначе ключ с заглавной буквы |
| `{$filter_values}` | Массив подписей значений |

Подпись значения — значение из адреса. Для числового `vendor_id` или `vendor` — имя производителя MiniShop3, для числового `parent` — заголовок раздела.

Крошки фильтров идут в порядке сегментов адреса, по одной на ключ. Адрес каждой — сегменты от начала до неё: `/catalog/color--red/`, `/catalog/color--red/size--xl/`.

## Примеры

### Базовый вызов

```fenom
{'!mFilterCrumbs' | snippet : [
    'showHome' => 1
]}
```

### С разметкой JSON-LD

```fenom
{'!mFilterCrumbs' | snippet : [
    'showHome' => 1,
    'scheme' => 'abs',
    'schemaJsonLd' => true
]}
```

`'scheme' => 'abs'` нужен для верных адресов разделов в JSON-LD. При значении `link_tag_scheme` по умолчанию pdoCrumbs отдаёт адрес без начального `/`, и тот склеивается с доменом без разделителя: `https://site.rucatalog/`.

На странице с фильтрами сниппет добавит в конец вывода:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://site.ru/"},
        {"@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://site.ru/catalog/"},
        {"@type": "ListItem", "position": 3, "name": "Красный"}
    ]
}
</script>
```

### Свои чанки

```fenom
{'!mFilterCrumbs' | snippet : [
    'tpl' => '@INLINE <li><a href="{$link | esc}">{$menutitle | esc}</a></li>',
    'tplCurrent' => '@INLINE <li>{$menutitle | esc}</li>',
    'tplWrapper' => '@INLINE <nav><ul>{$output}</ul></nav>'
]}
```

На остальных страницах pdoCrumbs выведет эти же чанки — они переданы в вызове.

### Без фильтров в крошках

```fenom
{'!mFilterCrumbs' | snippet : [
    'showFilterCrumbs' => false
]}
```

### Вывод в плейсхолдер

```fenom
{'!mFilterCrumbs' | snippet : [
    'toPlaceholder' => 'crumbs'
]}

{* Позже в шаблоне *}
{$_modx->getPlaceholder('crumbs')}
```

### Получение данных массивом

```fenom
{set $crumbs = '!mFilterCrumbs' | snippet : ['return' => 'data']}
{foreach $crumbs as $crumb}
    {$crumb.menutitle} ({$crumb.link})
{/foreach}
```

## SEO-разметка

На странице с фильтрами в SEO-адресе сниппет выводит микроразметку Schema.org:

```html
<nav class="mfilter-crumbs" aria-label="Breadcrumb">
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/"><span itemprop="name">Главная</span></a>
        <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/catalog/"><span itemprop="name">Каталог</span></a>
        <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">Красный</span>
        <meta itemprop="position" content="3">
    </li>
</ol>
</nav>
```

На остальных страницах разметку задают чанки pdoCrumbs. Чтобы микроразметка была и там, передайте в вызове свои чанки с ней — pdoCrumbs их выведет.

## CSS-стили

Базовые стили в `mfilter.css` действуют на обёртку `.mfilter-crumbs` — на странице с фильтрами или в своём `tplWrapper` с этим классом. Вид меняют модификаторы обёртки:

| Класс | Что даёт |
|---|---|
| `mfilter-crumbs--arrow` | Разделитель → |
| `mfilter-crumbs--chevron` | Разделитель › |
| `mfilter-crumbs--compact` | Крошки компактнее |

Сами правила — в `assets/components/mfilter/css/web/mfilter.css`.
