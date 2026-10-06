---
title: msGallery
---
# msGallery

Выводит изображения и файлы из галереи товара.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **product** | текущий ресурс | ID товара |
| **tpl** | `tpl.msGallery` | Чанк оформления галереи |
| **limit** | `0` | Количество изображений (0 = все) |
| **offset** | `0` | Пропустить указанное количество. Действует только вместе с `limit > 0` |
| **sortby** | `position` | Поле сортировки |
| **sortdir** | `ASC` | Направление сортировки |
| **where** | | JSON с дополнительными условиями |
| **filetype** | | Фильтр по типу: `image` либо расширения файлов через запятую |
| **thumbnails** \* | | Фильтр превью по именам, через запятую ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |
| **showInactive** \* | `false` | Показывать неактивные файлы |
| **extensionsDir** \* | `components/minishop3/img/mgr/extensions/` | Путь к иконкам типов файлов (от `assets/`) для не-изображений |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать журнал выполнения. Виден только при активной сессии в админке |
| **return** | `tpl` | Формат вывода: `tpl`, `data`, `json`, `sql`. `json` отдаёт строки выборки без слияния превью и поля `thumbnail`; `sql` — текст SQL-запроса, сам запрос при этом не выполняется |

\* В свойствах сниппета не объявлен.

## Примеры

```fenom
{* Галерея текущего товара *}
{'msGallery' | snippet}

{* Галерея конкретного товара *}
{'msGallery' | snippet : ['product' => 15]}

{* Первые 5 изображений *}
{'msGallery' | snippet : ['limit' => 5]}

{* Только превью small и medium *}
{'msGallery' | snippet : ['thumbnails' => 'small,medium']}

{* Сортировка по имени файла *}
{'msGallery' | snippet : ['sortby' => 'name', 'sortdir' => 'ASC']}

{* Только изображения *}
{'msGallery' | snippet : ['filetype' => 'image']}

{* Только видео — перечисляются расширения *}
{'msGallery' | snippet : ['filetype' => 'mp4,webm,mov']}

{* Изображения и видео *}
{'msGallery' | snippet : ['filetype' => 'image,mp4,webm']}
```

### Массив вместо HTML

```fenom
{set $files = 'msGallery' | snippet : ['return' => 'data']}

{foreach $files as $file}
    <img src="{$file['url']}" alt="{$file['name']}">
{/foreach}
```

::: info Значение `return` по умолчанию
После установки у сниппета стоит `return=tpl` — вывод через чанк `tpl.msGallery`. Запасное значение в коде другое, `data`: оно сработает только при пустом свойстве ([#823](https://github.com/modx-pro/MiniShop3/issues/823)). Поэтому массив запрашивайте явным `return=data`.
:::

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
| --- | --- |
| `{$files}` | Массив файлов галереи |
| `{$scriptProperties}` | Параметры вызова сниппета |

### Поля каждого файла

| Поле | Описание |
| --- | --- |
| `{$file['id']}` | ID файла |
| `{$file['product_id']}` | ID товара |
| `{$file['name']}` | Имя файла |
| `{$file['description']}` | Описание |
| `{$file['url']}` | URL оригинала |
| `{$file['path']}` | Папка внутри медиа-источника: у оригинала `{product_id}/`, у превью `{product_id}/{размер}/`. Имя файла лежит отдельно, в `file` |
| `{$file['file']}` | Имя файла на диске |
| `{$file['type']}` | `image` для изображений, расширение файла для всего остального (`mp4`, `pdf`, `zip`) |
| `{$file['thumbnail']}` | URL иконки типа (для не-изображений, из `extensionsDir`) |
| `{$file['createdon']}` | Дата добавления |
| `{$file['createdby']}` | ID пользователя |
| `{$file['position']}` | Позиция в галерее |
| `{$file['active']}` | Активен (1/0) |
| `{$file['hash']}` | Хеш файла |

### Превью изображений

Превью приходят отдельными полями. Имя поля — имя превью в медиа-источнике:

| Поле | Размер по умолчанию | Формат |
| --- | --- | --- |
| `{$file['thumb']}` | 150 × 150 | WebP |
| `{$file['small']}` | 300 × 300 | WebP |
| `{$file['medium']}` | 600 × 600 | WebP |
| `{$file['large']}` | 1200 × 1200 | JPEG |

::: info Имена и размеры задаёт медиа-источник
В таблице — значения из источника, который создаёт установщик. Измените у источника свойство `thumbnails` — изменятся и имена полей: поле называется так же, как превью.

Если очистить это свойство совсем, останется единственное превью `small` 120 × 120: таков запасной набор в коде.
:::

::: warning `thumb` здесь и `thumb` у товара — разные вещи
В галерее `thumb` — имя превью из медиа-источника. А `{$product.thumb}` в каталоге и корзине — отдельная колонка таблицы товара, с превью галереи не связанная. Имена совпали, источники разные.
:::

### Служебные переменные цикла

```fenom
{foreach $files as $file}
    {$file@index}      {* индекс с 0 *}
    {$file@index + 1}  {* номер с 1 *}
    {$file@first}      {* true для первого *}
    {$file@last}       {* true для последнего *}
{/foreach}
```

## Нештатные ситуации

| Что происходит | Что выводится |
| --- | --- |
| У товара нет изображений | При `return=tpl` чанк всё равно отрисовывается с пустым `$files`; штатный чанк показывает заглушку. При `return=data` — пустой массив |
| В `product` передан id не товара | Пустая строка, в журнал MODX уходит `[msGallery] Resource is not msProduct` |
| Товар закрыт правами групп ресурсов | Пустая строка. Проверка работает только когда `product` отличается от текущего ресурса |

::: warning Публикация товара не проверяется
Галерея снятого с публикации товара выведется, если обратиться к ней по `&product` напрямую. Права групп ресурсов при этом учитываются, а флаг публикации — нет.
:::

::: tip Просмотр страницы создаёт папку в медиа-источнике
Сниппет инициализирует медиа-источник при каждом вызове, а инициализация создаёт папку `{id товара}/` — даже если изображений нет и загружать нечего. На фронтенде папки появляются от обычных просмотров каталога.
:::

::: warning Адреса файлов записаны в базу при загрузке
Поле `url` заполняется один раз, в момент загрузки файла. Если потом сменить базовый адрес медиа-источника, сохранённые адреса не перепишутся — в галерее останутся старые ссылки. То же касается превью.
:::

## Чанк по умолчанию

Поставляемый чанк `tpl.msGallery` строит слайдер на Splide.js и открывает фото в GLightbox. Ниже — упрощённая версия: в поставке больше опций плеера и заглушка с `srcset`.

```fenom
{* tpl.msGallery *}
{if $files?}
    {* Splide Slider + GLightbox CSS/JS *}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css">
    <script src="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js"></script>

    <div class="ms3-gallery">
        {* Основной слайдер *}
        <div class="splide ms3-gallery-main" id="ms3-gallery-main">
            <div class="splide__track">
                <ul class="splide__list">
                    {foreach $files as $file}
                        <li class="splide__slide">
                            <a href="{$file['url']}"
                               class="glightbox"
                               data-gallery="ms3-product-gallery"
                               data-title="{$file['name']}"
                               data-description="{$file['description']}">
                                <img src="{$file['medium'] ?: $file['url']}"
                                     alt="{$file['description'] ?: $file['name']}"
                                     loading="{$file@first ? 'eager' : 'lazy'}">
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </div>

        {* Слайдер миниатюр *}
        {if ($files | length) > 1}
            <div class="splide ms3-gallery-thumbs" id="ms3-gallery-thumbs">
                <div class="splide__track">
                    <ul class="splide__list">
                        {foreach $files as $file}
                            <li class="splide__slide">
                                <img src="{$file['small'] ?: $file['medium'] ?: $file['url']}"
                                     alt="{$file['description'] ?: $file['name']}">
                            </li>
                        {/foreach}
                    </ul>
                </div>
            </div>
        {/if}
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var main = new Splide('#ms3-gallery-main', {
                type: 'fade',
                rewind: true,
                pagination: false,
                arrows: true,
            });

            var thumbsEl = document.getElementById('ms3-gallery-thumbs');
            if (thumbsEl) {
                var thumbs = new Splide('#ms3-gallery-thumbs', {
                    fixedWidth: 100,
                    fixedHeight: 80,
                    gap: 10,
                    rewind: true,
                    pagination: false,
                    arrows: false,
                    isNavigation: true,
                    focus: 'center',
                });
                main.sync(thumbs);
                main.mount();
                thumbs.mount();
            } else {
                main.mount();
            }

            GLightbox({ selector: '.glightbox', loop: true });
        });
    </script>
{else}
    <div class="ms3-gallery ms3-gallery-empty">
        <img src="{'assets_url' | option}components/minishop3/img/web/ms3_medium.png" alt="">
    </div>
{/if}
```

## Чанк без внешних библиотек

```fenom
{* tpl.msGallery.simple *}
{if $files?}
    <div class="product-gallery">
        {foreach $files as $file}
            <a href="{$file['url']}" target="_blank">
                <img src="{$file['medium'] ?: $file['url']}"
                    alt="{$file['name']}"
                    loading="{$file@first ? 'eager' : 'lazy'}">
            </a>
        {/foreach}
    </div>
{/if}
```

## Работа с видео

```fenom
{set $files = 'msGallery' | snippet : ['return' => 'data']}

{foreach $files as $file}
    {if $file['type'] != 'image'}
        <video controls>
            <source src="{$file['url']}" type="video/{$file['type']}">
        </video>
    {else}
        <img src="{$file['medium'] ?: $file['url']}" alt="{$file['name']}">
    {/if}
{/foreach}
```
