---
title: "image"
description: "Media-объект изображения с alt и enrich metadata"
---

# Поле image

Версия: **Free**. Кадрирование — capability `image-crop` (**Pro**).

<!-- ![image](/components/pagebuilder/screenshots/fields/image.jpg) -->

## Зачем этот тип

- После сохранения в объекте есть ширина, высота и расширение
- Альтернативный текст и подпись — отдельные поля схемы секции; `title` media-объекта редактируют в Info
- Одно изображение, без списка как у [gallery](gallery)

## Когда использовать

- Фон первого экрана, превью карточки, фото автора
- Логотип партнёра с альтернативным текстом

## Советы

В чанке берите `{$photo.url}`, а не строку пути к файлу.

## Похожие типы

- [gallery](gallery) для набора изображений (Pro)
- [file](file) для любых файлов, не только изображений

## Настройка

```json
{
  "name": "photo",
  "type": "image",
  "label": "Изображение",
  "description": "Рекомендуемый размер 1920×1080",
  "crops": {
    "hero": { "name": "Hero", "size": "1600x900" },
    "card": { "name": "Card", "ratio": "4x3" }
  },
  "width": 50,
  "tab": "Контент",
  "active": true
}
```

`crops` опционален: с Pro и `image-crop` в инспекторе доступно кадрирование. Именованные пресеты задают размеры; без пресетов кадр сохраняют под ключом `default`.

## Значение

Media-объект: кнопка Info редактирует `width`, `height`, `title`. При выборе из браузера подтягиваются `size` и имя файла.

## Данные секции {#vyvod-v-section-data}

Ключ `photo` в данных секции после save enrich:

```json
{
  "photo": {
    "url": "assets/images/hero.jpg",
    "id": 12,
    "path": "assets/images/",
    "filename": "hero.jpg",
    "extension": "jpg",
    "name": "hero",
    "title": "hero.jpg",
    "width": 1920,
    "height": 1080,
    "size": 245760,
    "type": "image"
  }
}
```

- Поля `width`, `height`, `size` дополняются с диска, если файл доступен MODX.
- Именованные кадры лежат в `photo.crops.*` и не перезаписывают исходный `url`.
- Плагин на `pbOnAfterMediaCrop` может дописать `crops.<ключ>.variants`. Это уменьшенные файлы рядом с кадром.

## Отображаемый URL {#display-url}

Выводимый URL выбирают по правилу: `crops.default` → первый кадр с `url` → `url`. Fenom-модификатор `pb_image_src` применяет его:

```fenom
{$photo|pb_image_src}
```

Чанк `pagebuilder_partial_image` уже берёт `src` через этот модификатор. Если кадров нет, модификатор вернёт `url` как есть.

## Пример в chunk

::: code-group

```modx
[[$pagebuilder_partial_image?
  &image=`[[+photo]]`
  &alt=`[[+photo.title]]`
  &class=`pb-image__media`
]]
```

```fenom
{include 'pagebuilder_partial_image' image=$photo alt=$photo.title class='pb-image__media'}
```

:::

<a id="crop-plugin"></a>

## Плагин после кадрирования

Процессор `mgr/media/crop` после записи файла вызывает `pbOnAfterMediaCrop`. Параметр `result`: `\PageBuilder\Media\MediaCropResult` (`url`, `width`, `height`, `path`, `sourcePath`). Ядро не делает водяной знак и нарезку. Плагин правит кадр и кладёт URL копий в `variants`.

Кадр пишется не поверх исходника, а в подкаталог `pagebuilder-crops` рядом с ним: `assets/images/pagebuilder-crops/hero-<хеш>.<расширение>`. Имя файла — исходное имя плюс хеш геометрии; файлы `variants` ложатся в этот же каталог.

```php
<?php
switch ($modx->event->name) {
    case 'pbOnAfterMediaCrop':
        $result = $scriptProperties['result'] ?? null;
        if (!$result instanceof \PageBuilder\Media\MediaCropResult || !is_file($result->path)) {
            break;
        }
        $image = imagecreatefromstring((string) file_get_contents($result->path));
        if ($image === false) {
            break;
        }
        $ink = imagecolorallocate($image, 255, 255, 255);
        imagestring($image, 3, 8, 8, 'sample', $ink);
        imagejpeg($image, $result->path, 85);
        $thumb = imagescale($image, 400);
        $variantPath = preg_replace('/\.\w+$/', '-400.jpg', $result->path);
        if ($thumb !== false && is_string($variantPath)) {
            imagejpeg($thumb, $variantPath, 85);
            imagedestroy($thumb);
            $result->variants[] = [
                'key' => '400',
                'url' => preg_replace('/\.\w+$/', '-400.jpg', $result->url),
                'width' => 400,
                'height' => imagesy($image) > 0 ? (int) round(400 * imagesy($image) / imagesx($image)) : 400,
            ];
        }
        imagedestroy($image);
        break;
}
```

В шаблоне: `{$photo.crops.hero.variants.0.url ?: $photo.crops.hero.url}`.

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `crops` (Pro, `image-crop`); `responsive` у типа нет, enrich при save.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
