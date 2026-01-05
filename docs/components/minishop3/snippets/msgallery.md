---
title: msGallery
---
# msGallery

Сниппет для вывода галереи изображений товара.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msGallery` | Чанк оформления галереи |
| **product** | текущий ресурс | ID товара |
| **limit** | `0` | Количество изображений (0 = все) |
| **offset** | `0` | Пропустить указанное количество |
| **sortby** | `position` | Поле сортировки |
| **sortdir** | `ASC` | Направление сортировки |
| **where** | | JSON с дополнительными условиями |
| **filetype** | | Фильтр по типу файла |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения |
| **return** | `tpl` | Формат: `tpl`, `data`, `json` |

## Примеры

### Базовый вывод

```fenom
{'msGallery' | snippet}
```

### Для конкретного товара

```fenom
{'msGallery' | snippet : [
    'product' => 15
]}
```

### Первые 5 изображений

```fenom
{'msGallery' | snippet : [
    'limit' => 5
]}
```

### Только изображения (без видео и документов)

```fenom
{'msGallery' | snippet : [
    'filetype' => 'image'
]}
```

### Сортировка по имени

```fenom
{'msGallery' | snippet : [
    'sortby' => 'name',
    'sortdir' => 'ASC'
]}
```

### Получение данных

```fenom
{set $images = 'msGallery' | snippet : [
    'return' => 'data'
]}

{foreach $images as $image}
    <img src="{$image.url}" alt="{$image.name}">
{/foreach}
```

## Плейсхолдеры в чанке

Для каждого файла галереи:

- `{$id}` — ID файла
- `{$product_id}` — ID товара
- `{$name}` — Имя файла
- `{$description}` — Описание
- `{$url}` — URL оригинала
- `{$path}` — Путь к файлу
- `{$type}` — MIME-тип
- `{$createdon}` — Дата добавления
- `{$position}` — Позиция в галерее
- `{$idx}` — Порядковый номер в выборке

### Превью (thumbnails)

Превью доступны по имени папки:

- `{$small}` — Маленькое превью
- `{$medium}` — Среднее превью
- `{$large}` — Большое превью

::: info Имена превью
Имена превью зависят от настроек медиа-источника товаров. По умолчанию создаются `small`, `medium`, `large`.
:::

## Пример чанка

```fenom
{* tpl.msGallery *}
<div class="product-gallery" data-gallery>
    {* Главное изображение *}
    <div class="gallery-main">
        <a href="{$url}" data-fancybox="gallery">
            <img src="{$medium}" alt="{$name}">
        </a>
    </div>

    {* Превью *}
    {if $total > 1}
        <div class="gallery-thumbs">
            {foreach $images as $image}
                <button type="button"
                        data-index="{$image.idx}"
                        class="{if $image.idx == 1}active{/if}">
                    <img src="{$image.small}" alt="{$image.name}">
                </button>
            {/foreach}
        </div>
    {/if}
</div>
```

## Альтернативный чанк для слайдера

```fenom
{* tpl.msGallery.slider *}
<div class="swiper product-slider">
    <div class="swiper-wrapper">
        {foreach $images as $image}
            <div class="swiper-slide">
                <a href="{$image.url}" data-fancybox="product-gallery">
                    <img src="{$image.large}"
                         alt="{$image.name}"
                         loading="{if $image.idx > 1}lazy{else}eager{/if}">
                </a>
            </div>
        {/foreach}
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>

<div class="swiper product-thumbs">
    <div class="swiper-wrapper">
        {foreach $images as $image}
            <div class="swiper-slide">
                <img src="{$image.small}" alt="{$image.name}">
            </div>
        {/foreach}
    </div>
</div>
```

## Работа с видео

Если в галерее есть видео:

```fenom
{foreach $files as $file}
    {if $file.type | match : 'video'}
        <video controls>
            <source src="{$file.url}" type="{$file.type}">
        </video>
    {else}
        <img src="{$file.medium}" alt="{$file.name}">
    {/if}
{/foreach}
```
