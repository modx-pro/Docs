---
title: msGallery
---
# msGallery

Сниппет для вывода галереи изображений товара.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **product** | текущий ресурс | ID товара |
| **tpl** | `tpl.msGallery` | Чанк оформления галереи |
| **limit** | `0` | Количество изображений (0 = все) |
| **offset** | `0` | Пропустить указанное количество |
| **sortby** | `position` | Поле сортировки |
| **sortdir** | `ASC` | Направление сортировки |
| **where** | | JSON с дополнительными условиями |
| **filetype** | | Фильтр по типу файла (через запятую) |
| **thumbnails** | | Фильтр превью по именам (через запятую) |
| **showInactive** | `false` | Показывать неактивные файлы |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения |
| **return** | `data` | Формат: `data`, `tpl`, `json`, `sql` |

## Примеры

### Базовый вывод

```fenom
{'msGallery' | snippet : [
    'return' => 'tpl'
]}
```

### Для конкретного товара

```fenom
{'msGallery' | snippet : [
    'product' => 15,
    'return' => 'tpl'
]}
```

### Первые 5 изображений

```fenom
{'msGallery' | snippet : [
    'limit' => 5,
    'return' => 'tpl'
]}
```

### Только изображения (без видео и документов)

```fenom
{'msGallery' | snippet : [
    'filetype' => 'image',
    'return' => 'tpl'
]}
```

### Только определённые превью

```fenom
{'msGallery' | snippet : [
    'thumbnails' => 'small,medium',
    'return' => 'tpl'
]}
```

### Сортировка по имени

```fenom
{'msGallery' | snippet : [
    'sortby' => 'name',
    'sortdir' => 'ASC',
    'return' => 'tpl'
]}
```

### Получение данных для обработки

```fenom
{set $files = 'msGallery' | snippet}

{foreach $files as $file}
    <img src="{$file['url']}" alt="{$file['name']}">
{/foreach}
```

::: info return=data по умолчанию
По умолчанию сниппет возвращает массив данных (`return=data`). Для вывода через чанк укажите `return=tpl`.
:::

## Плейсхолдеры в чанке

В чанк передаются:

| Плейсхолдер | Описание |
|-------------|----------|
| `{$files}` | Массив файлов галереи |
| `{$scriptProperties}` | Параметры вызова сниппета |

### Поля каждого файла

| Поле | Описание |
|------|----------|
| `{$file['id']}` | ID файла |
| `{$file['product_id']}` | ID товара |
| `{$file['name']}` | Имя файла |
| `{$file['description']}` | Описание |
| `{$file['url']}` | URL оригинала |
| `{$file['path']}` | Путь к файлу |
| `{$file['file']}` | Имя файла на диске |
| `{$file['type']}` | Тип файла (image, video, document и т.д.) |
| `{$file['createdon']}` | Дата добавления |
| `{$file['createdby']}` | ID пользователя |
| `{$file['position']}` | Позиция в галерее |
| `{$file['active']}` | Активен (1/0) |
| `{$file['hash']}` | Хеш файла |

### Превью изображений

Превью добавляются как дополнительные поля с именем папки:

| Поле | Описание |
|------|----------|
| `{$file['small']}` | URL маленького превью |
| `{$file['medium']}` | URL среднего превью |
| `{$file['large']}` | URL большого превью |

::: info Имена превью
Имена превью зависят от настроек медиа-источника товаров. По умолчанию создаются `small`, `medium`, `large`.
:::

### Служебные переменные цикла

В Fenom доступны переменные итерации:

```fenom
{foreach $files as $file}
    {$file@index}     {* Индекс с 0 *}
    {$file@iteration} {* Номер с 1 *}
    {$file@first}     {* true для первого *}
    {$file@last}      {* true для последнего *}
{/foreach}
```

## Чанк по умолчанию

Стандартный чанк `tpl.msGallery` использует Splide.js для слайдера и GLightbox для просмотра:

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

## Простой чанк

Минимальный пример без внешних библиотек:

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

Если в галерее есть видео:

```fenom
{set $files = 'msGallery' | snippet}

{foreach $files as $file}
    {if $file['type'] == 'video'}
        <video controls>
            <source src="{$file['url']}" type="video/{$file['file'] | pathinfo : 'extension'}">
        </video>
    {else}
        <img src="{$file['medium'] ?: $file['url']}" alt="{$file['name']}">
    {/if}
{/foreach}
```

## Фильтрация по типу

```fenom
{* Только изображения *}
{'msGallery' | snippet : ['filetype' => 'image']}

{* Только видео *}
{'msGallery' | snippet : ['filetype' => 'video']}

{* Изображения и видео *}
{'msGallery' | snippet : ['filetype' => 'image,video']}
```
