# Фронтенд

## Чанки

Скопируйте чанк под новым именем и укажите его в параметре, прежде чем править. Обновление пакета перезаписывает чанки msCatalyst.

### msCatalyst.outer

Весь блок. Плейсхолдеры:

- `[[+groups]]`, `[[+results]]`, `[[+chips]]`, `[[+pagination]]`, `[[+more]]`, `[[+empty]]`: готовый HTML частей;
- `[[+total]]` (текст «Найдено: N»), `[[+totalNum]]`, `[[+applyText]]`, `[[+badge]]`, `[[+badgeHidden]]`;
- `[[+sortOptions]]`, `[[+sortHidden]]`, `[[+limitOptions]]`, `[[+limitHidden]]`;
- `[[+q]]`, `[[+searchParam]]`, `[[+searchHidden]]`;
- `[[+viewCls]]`, `[[+gridPressed]]`, `[[+listPressed]]`, `[[+viewHidden]]`;
- служебные `[[+uid]]`, `[[+hash]]`, `[[+base]]`, `[[+uri]]`, `[[+hidden]]` (скрытые поля формы для сайтов без ЧПУ, где адрес раздела выглядит как `index.php?id=5`), `[[+limit]]`, `[[+sort]]`, `[[+breakpoint]]`, `[[+rowsClass]]`;
- подписи из лексикона `[[+l_filters]]`, `[[+l_close]]`, `[[+l_search]]`, `[[+l_search_ph]]`, `[[+l_apply]]`, `[[+l_sort]]`, `[[+l_limit]]`, `[[+l_view]]`, `[[+l_view_grid]]`, `[[+l_view_list]]`, `[[+l_results]]`.

Скрипт ищет в разметке эти элементы: `.msc[data-msc]` с атрибутами `data-*`, `.msc-form`, `.msc-panel`, `.msc-overlay`, `.msc-open`, `.msc-close`, `.msc-total`, `.msc-badge`, `.msc-apply-js`, `.msc-chips`, `.msc-rows`, `.msc-empty-wrap`, `.msc-more`, `.msc-pages`. Если меняете разметку, оставьте их.

### msCatalyst.group

`[[+key]]`, `[[+uid]]`, `[[+title]]`, `[[+expanded]]`, `[[+bodyHidden]]`, `[[+reset]]`, `[[+resetHidden]]`, `[[+rows]]`, `[[+find]]` (поиск внутри длинной группы), `[[+more]]` (кнопка «Показать все»).

### msCatalyst.option

`[[+key]]`, `[[+value]]`, `[[+label]]`, `[[+count]]`, `[[+cls]]`, `[[+checked]]`, `[[+disabled]]`, `[[+uid]]`. Имя поля должно быть `[[+key]][]`.

### msCatalyst.range

Те же плейсхолдеры группы плюс:

- `[[+min]]`, `[[+max]]`: границы ползунка;
- `[[+availMin]]`, `[[+availMax]]`: что доступно при текущих фильтрах;
- `[[+from]]`, `[[+to]]`: выбранный диапазон;
- `[[+step]]`, `[[+l_from]]`, `[[+l_to]]`.

Поля ввода называются `[[+key]]_min` и `[[+key]]_max`.

### msCatalyst.empty

`[[+title]]`, `[[+text]]`, `[[+query]]`, `[[+reset]]`, `[[+resetUrl]]`.

## Плейсхолдеры страницы

После вызова сниппета на странице доступны:

| Плейсхолдер | Значение |
|---|---|
| `[[!+mscatalyst.total]]` | Сколько товаров найдено. |
| `[[!+mscatalyst.page]]`, `[[!+mscatalyst.pages]]` | Текущая страница и число страниц. |
| `[[!+mscatalyst.active]]` | Сколько фильтров выбрано. |
| `[[!+mscatalyst.query]]` | Строка запроса текущего состояния. |
| `[[!+mscatalyst.title]]`, `[[!+mscatalyst.h1]]`, `[[!+mscatalyst.description]]` | Title, H1 и description из [посадочной](landings) или по шаблонам из настроек `mscatalyst_seo_*`. Без выбранных фильтров это заголовок страницы. |
| `[[!+mscatalyst.intro]]`, `[[!+mscatalyst.text]]` | HTML над и под товарами из посадочной или шаблона текстов. |
| `[[!+mscatalyst.canonical]]` | Полный адрес страницы с текущими фильтрами, со схемой и доменом. |

Пример для шаблона:

```modx
<title>[[!+mscatalyst.title]][[!+mscatalyst.page:gt=`1`:then=` (страница [[!+mscatalyst.page]])`]]</title>
<meta name="description" content="[[!+mscatalyst.description]]">

<h1 data-msc-h1>[[!+mscatalyst.h1]]</h1>
```

Поисковый робот получает эти значения сразу, без JavaScript. После AJAX-обновления скрипт сам меняет `<title>`, description и H1 с атрибутом `data-msc-h1`. Остальные плейсхолдеры за пределами блока фильтра, например `mscatalyst.total`, получат новые значения при следующей полной загрузке страницы.

Если плейсхолдер выше вызова сниппета остаётся пустым, вызовите сниппет в начале шаблона с `` &toPlaceholder=`mscatalyst` ``, а `[[!+mscatalyst]]` выведите там, где нужен фильтр.

## Оформление

Стили используют CSS-переменные. Цвета и размеры можно поменять, не трогая файл:

```css
.msc {
    --msc-accent: #16a34a;
    --msc-radius: 4px;
    --msc-panel: 300px;
}
```

Переменные: `--msc-accent`, `--msc-accent-contrast`, `--msc-accent-soft`, `--msc-accent-line`, `--msc-text`, `--msc-muted`, `--msc-line`, `--msc-line-strong`, `--msc-surface`, `--msc-soft`, `--msc-radius`, `--msc-radius-sm`, `--msc-panel`, `--msc-gap`, `--msc-shadow`, `--msc-shadow-float`.

Боковая колонка включается, когда ширина блока достигает 720px (container query). Ниже 992px панель выезжает по кнопке «Фильтры». Если меняете `&breakpoint`, поменяйте и медиазапрос в CSS. Для RTL поставьте `dir="rtl"` на `<html>`.

Чтобы оформить фильтр полностью своими стилями, очистите настройку `mscatalyst_frontend_css`. Если стили написаны под msFacets, включите `mscatalyst_legacy_markup`: разметка получит и старые классы `msf-*`.

## История и кнопка «Назад»

Каждый AJAX-переход по фильтрам, сортировке, номерам страниц и «Показать ещё» делает `history.pushState`. «Назад» восстанавливает состояние через AJAX: страница 3, затем 2, затем 1. Посетитель остаётся на сайте и не попадает на предыдущую вкладку истории.

## JavaScript

Скрипт без зависимостей, ES5, поддерживает несколько фильтров на странице. События всплывают от корня `.msc`:

| Событие | Когда | `event.detail` |
|---|---|---|
| `mscatalyst:ready` | Фильтр инициализирован. | `{instance}` |
| `mscatalyst:load` | Ушёл запрос. | `{instance, query}` |
| `mscatalyst:updated` | Результаты вставлены. | `{instance, data, append}` |
| `mscatalyst:seo` | После AJAX, на `document`. | `{seo, data}` |

`data` содержит `total`, `page`, `pages`, `ids` (ID товаров на странице), `query` и HTML частей.

```js
document.addEventListener('mscatalyst:updated', function (e) {
    // переинициализировать слайдеры карточек, отправить событие в аналитику
    console.log('Найдено', e.detail.data.total, e.detail.data.ids);
});
```

API:

- `msCatalyst.init(element)`: инициализировать фильтры внутри элемента, например после вставки HTML через AJAX;
- `msCatalyst.instances`: список экземпляров;
- `instance.reload()`: перезапросить результаты с текущими фильтрами.

Если запрос не удался, скрипт открывает обычную страницу с теми же фильтрами. Посетитель всё равно увидит результат.

## REST

Коннектор отдаёт JSON для headless-витрин:

```
/assets/components/mscatalyst/connector.php?action=schema&resource=5
```

Действия: `schema` (фасеты и значения каталога), `apply` (выдача по фильтрам), `suggest` (подсказки поиска).
