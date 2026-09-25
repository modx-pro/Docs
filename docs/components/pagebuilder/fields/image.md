---
title: "image"
description: "Media-объект изображения с alt и enrich metadata"
---

# Поле image

Версия: **Free**. Кадрирование — capability `image-crop` (**Pro**).

<!-- ![image](/components/pagebuilder/screenshots/fields/image.jpg) -->

## Зачем этот тип

- После сохранения в объекте есть ширина, высота и расширение
- Альтернативный текст и подпись — отдельные поля схемы секции (`text` и т.п.); у media-объекта редактируется `title` в Info
- Одно изображение, без списка как у [gallery](gallery)

## Когда использовать

- Фон первого экрана, превью карточки, фото автора
- Картинка для превью внутри секции
- Логотип партнёра с альтернативным текстом

## Советы

- Несколько фото: [gallery](gallery) (Pro)
- В чанке берите `{$photo.url}`, не путь к файлу строкой

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

Ключ `crops` опционален. С Pro и `image-crop` в инспекторе доступно кадрирование; именованные пресеты из `crops` задают размеры, без них — свободный кадр `default`.

## Значение

Media-объект. Кнопка Info редактирует width, height, title. При выборе из браузера подтягиваются size и имя файла.

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
                'height' => (int) round(400 * imagesy($image) / max(1, imagesx($image))),
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

- Дополнительно: `crops` (Pro, `image-crop`). Нет `responsive`. Значение — media-объект, enrich при save.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
