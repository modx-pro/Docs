---
title: Галерея товара
---
# Галерея товара

Система управления изображениями товаров в MiniShop3.

## Обзор

Галерея товара позволяет:

- Загружать изображения через современный drag-and-drop интерфейс
- Автоматически генерировать миниатюры различных размеров
- Редактировать изображения перед загрузкой
- Поддерживать современные форматы (WebP, AVIF)
- Сортировать изображения перетаскиванием

## Технология обработки изображений

### Intervention Image

MiniShop3 использует библиотеку [Intervention Image](https://image.intervention.io/) v3 — современное решение для обработки изображений на PHP.

**Преимущества над устаревшим phpThumb:**

| Характеристика | phpThumb | Intervention Image |
|----------------|----------|-------------------|
| Скорость генерации | 800ms | **250ms** (в 3 раза быстрее) |
| Потребление памяти | 45MB | **28MB** (-38%) |
| Поддержка WebP | Частичная | **Полная** |
| Поддержка AVIF | Нет | **Да** (с Imagick) |
| Современные алгоритмы | Нет | **Да** |

**Требования:**

- PHP 8.1+
- Imagick (рекомендуется) или GD расширение
- Для AVIF обязательно Imagick с libheif

### Поддерживаемые форматы

| Формат | Чтение | Запись | Примечание |
|--------|--------|--------|------------|
| JPEG | ✅ | ✅ | Основной формат |
| PNG | ✅ | ✅ | С прозрачностью |
| GIF | ✅ | ✅ | Анимация (только первый кадр) |
| WebP | ✅ | ✅ | -30% размер vs JPEG |
| AVIF | ✅ | ✅ | -50% размер (требует Imagick) |
| HEIC | ✅ | ❌ | Конвертируется при загрузке |

## Загрузчик изображений

### Технология Uppy

Загрузчик изображений построен на библиотеке [Uppy](https://uppy.io/) — современном решении для загрузки файлов.

**Возможности:**

- **Drag & Drop** — перетаскивание файлов в область загрузки
- **Множественная загрузка** — несколько файлов одновременно
- **Предпросмотр** — миниатюры перед загрузкой
- **Встроенный редактор** — обрезка, поворот, масштабирование
- **Прогресс** — отображение процесса загрузки
- **Валидация** — проверка типа и размера файлов

### Параметры загрузчика

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `maxFileSize` | 10 MB | Максимальный размер файла |
| `maxWidth` | 1920 px | Максимальная ширина |
| `maxHeight` | 1080 px | Максимальная высота |
| `allowedFileTypes` | JPEG, PNG, GIF, WebP, AVIF, HEIC | Разрешённые типы |

### Редактор изображений

Перед загрузкой изображение можно отредактировать:

- **Обрезка** — выбор нужной области
- **Поворот** — на 90° в любую сторону
- **Отражение** — по горизонтали/вертикали
- **Масштабирование** — изменение размера

## Конфигурация миниатюр

### Где настраивается

Конфигурация миниатюр хранится в **Media Source**:

1. Перейдите в **Медиа → Источники файлов**
2. Откройте источник товаров (по умолчанию `MS3 Images`)
3. Найдите свойство `thumbnails`
4. Укажите JSON-конфигурацию

### Формат конфигурации

```json
{
  "small": {
    "width": 150,
    "height": 150,
    "quality": 85,
    "mode": "cover",
    "format": "webp"
  },
  "medium": {
    "width": 400,
    "height": 400,
    "quality": 88,
    "mode": "cover",
    "format": "webp"
  },
  "large": {
    "width": 800,
    "height": 800,
    "quality": 90,
    "mode": "max",
    "format": "jpg"
  }
}
```

### Параметры миниатюры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `width` | int | Ширина в пикселях |
| `height` | int | Высота в пикселях |
| `quality` | int | Качество сжатия (0-100) |
| `mode` | string | Режим масштабирования |
| `format` | string | Формат файла |
| `position` | string | Позиция кадрирования |
| `background` | string | Цвет фона (hex) |

### Режимы масштабирования (mode)

#### cover — Заполнение с обрезкой

Изображение масштабируется и обрезается для точного заполнения размера.

```json
{
  "mode": "cover",
  "width": 300,
  "height": 300,
  "position": "center"
}
```

**Использование:** Карточки товаров, сетки, миниатюры — когда нужен единый размер.

#### contain — Вписывание с фоном

Изображение вписывается целиком, пустое пространство заполняется фоном.

```json
{
  "mode": "contain",
  "width": 300,
  "height": 300,
  "background": "#ffffff"
}
```

**Использование:** Товары на белом фоне, логотипы производителей.

#### max — Вписывание без увеличения

Изображение уменьшается до указанного размера, но не увеличивается.

```json
{
  "mode": "max",
  "width": 800,
  "height": 800
}
```

**Использование:** Галерея товара, zoom — когда важно сохранить качество.

#### fit — Масштабирование с пропорциями

Изображение масштабируется с сохранением пропорций, может быть меньше указанного размера.

```json
{
  "mode": "fit",
  "width": 1200,
  "height": 800
}
```

**Использование:** Адаптивные галереи с разными пропорциями.

### Позиции кадрирования (position)

Для режимов `cover` и `crop`:

| Позиция | Описание |
|---------|----------|
| `center` | По центру (по умолчанию) |
| `top` | Сверху |
| `bottom` | Снизу |
| `left` | Слева |
| `right` | Справа |
| `top-left` | Верхний левый угол |
| `top-right` | Верхний правый угол |
| `bottom-left` | Нижний левый угол |
| `bottom-right` | Нижний правый угол |

## Готовые конфигурации

### Базовая (минимальная)

Для небольших магазинов с ограниченным дисковым пространством.

```json
{
  "thumb": {
    "width": 150,
    "height": 150,
    "quality": 80,
    "mode": "cover",
    "format": "webp"
  },
  "medium": {
    "width": 600,
    "height": 600,
    "quality": 85,
    "mode": "cover",
    "format": "webp"
  },
  "large": {
    "width": 1200,
    "height": 1200,
    "quality": 85,
    "mode": "max",
    "format": "jpg"
  }
}
```

**Результат:** ~256 KB на изображение, 12-20 файлов на товар.

### Оптимальная (рекомендуется)

Баланс качества и производительности с поддержкой всех браузеров.

```json
{
  "thumb_webp": {
    "width": 150,
    "height": 150,
    "quality": 80,
    "mode": "cover",
    "format": "webp"
  },
  "thumb_jpg": {
    "width": 150,
    "height": 150,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  },
  "card_webp": {
    "width": 300,
    "height": 300,
    "quality": 82,
    "mode": "cover",
    "format": "webp"
  },
  "card_jpg": {
    "width": 300,
    "height": 300,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  },
  "gallery_webp": {
    "width": 800,
    "height": 800,
    "quality": 85,
    "mode": "max",
    "format": "webp"
  },
  "gallery_jpg": {
    "width": 800,
    "height": 800,
    "quality": 88,
    "mode": "max",
    "format": "jpg"
  },
  "zoom": {
    "width": 1500,
    "height": 1500,
    "quality": 90,
    "mode": "max",
    "format": "jpg"
  }
}
```

**HTML с fallback:**

```html
<picture>
  <source srcset="[[+card_webp]]" type="image/webp">
  <img src="[[+card_jpg]]" alt="[[+pagetitle]]">
</picture>
```

### Премиум (с Retina)

Максимальное качество для крупных магазинов.

```json
{
  "card_webp": {
    "width": 350,
    "height": 350,
    "quality": 82,
    "mode": "cover",
    "format": "webp"
  },
  "card_webp_2x": {
    "width": 700,
    "height": 700,
    "quality": 78,
    "mode": "cover",
    "format": "webp"
  },
  "card_jpg": {
    "width": 350,
    "height": 350,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  }
}
```

**HTML с Retina:**

```html
<picture>
  <source
    srcset="[[+card_webp]] 1x, [[+card_webp_2x]] 2x"
    type="image/webp">
  <img src="[[+card_jpg]]" alt="[[+pagetitle]]">
</picture>
```

## Дополнительные возможности

### Водяные знаки

```json
{
  "watermarked": {
    "width": 800,
    "height": 600,
    "quality": 85,
    "mode": "cover",
    "format": "jpg",
    "watermark": {
      "enabled": true,
      "path": "assets/watermark.png",
      "position": "bottom-right",
      "offset_x": 10,
      "offset_y": 10,
      "opacity": 50
    }
  }
}
```

### Эффекты обработки

| Параметр | Описание | Значения |
|----------|----------|----------|
| `sharpen` | Резкость | 0-100 |
| `blur` | Размытие | 0-100 |
| `brightness` | Яркость | -100 до +100 |
| `contrast` | Контрастность | -100 до +100 |
| `greyscale` | Черно-белое | true/false |

**Пример:**

```json
{
  "thumbnail_bw": {
    "width": 200,
    "height": 200,
    "mode": "cover",
    "quality": 85,
    "greyscale": true,
    "contrast": 10,
    "sharpen": 15
  }
}
```

### Оптимизация

```json
{
  "optimized": {
    "width": 600,
    "height": 400,
    "quality": 80,
    "mode": "cover",
    "format": "jpg",
    "progressive": true,
    "strip_exif": true
  }
}
```

| Параметр | Описание |
|----------|----------|
| `progressive` | Прогрессивный JPEG (быстрее воспринимаемая загрузка) |
| `strip_exif` | Удалить EXIF данные (экономит 20-50 KB) |

## Рекомендации по качеству

| Тип изображения | WebP | JPEG | Комментарий |
|-----------------|------|------|-------------|
| Миниатюры (≤200px) | 75-80% | 85% | Артефакты не видны |
| Карточки (200-400px) | 80-85% | 85-88% | Оптимальный баланс |
| Галерея (400-1000px) | 85% | 88-90% | Важны детали |
| Zoom (>1000px) | — | 90-92% | Максимальное качество |

::: tip Правило
WebP можно использовать на 3-5% меньше качества чем JPEG при том же визуальном восприятии.
:::

## Структура файлов

```
assets/images/products/
└── {product_id}/
    ├── photo.jpg           # Оригинал
    ├── thumb_webp/
    │   └── photo.webp      # Миниатюра WebP
    ├── thumb_jpg/
    │   └── photo.jpg       # Миниатюра JPEG
    ├── card_webp/
    │   └── photo.webp
    ├── card_jpg/
    │   └── photo.jpg
    └── ...
```

## Связанные страницы

- [Утилиты: Галерея](utilities/gallery) — массовая перегенерация миниатюр
- [msGallery](../snippets/msgallery) — сниппет вывода галереи на сайте

## API для разработчиков

### ImageService

Сервис для программной работы с изображениями:

```php
// Получение сервиса
$imageService = $modx->services->get('ms3_image');

// Генерация миниатюры
$thumbnailData = $imageService->makeThumbnail($sourceInfo, [
    'width' => 300,
    'height' => 200,
    'quality' => 85,
    'mode' => 'cover',
    'format' => 'webp'
]);

// Сохранение в Media Source
$path = $imageService->saveThumbnailToSource(
    $thumbnailData,
    'products/123/',
    'photo_thumb.webp',
    $mediaSource
);

// Информация о драйвере
$driverInfo = $imageService->getDriverInfo();
// ['driver' => 'Imagick', 'version' => '7.1.0', 'formats' => ['jpeg', 'png', 'webp', 'avif']]
```

### События

При работе с галереей вызываются события:

- `msOnBeforeFileUpload` — перед загрузкой файла
- `msOnFileUpload` — после загрузки файла
- `msOnBeforeThumbnailGenerate` — перед генерацией миниатюры
- `msOnThumbnailGenerate` — после генерации миниатюры

## Решение проблем

### Миниатюры не создаются

**Проверьте:**

1. Наличие Imagick или GD: `php -m | grep -E "(imagick|gd)"`
2. Права на запись в `assets/images/products/`
3. Корректность JSON в настройках Media Source
4. Логи MODX в `core/cache/logs/error.log`

### WebP не генерируется

**Требования:**

- Imagick с поддержкой WebP, или
- GD скомпилированный с `--enable-webp`

**Проверка:**

```php
$imageService = $modx->services->get('ms3_image');
$info = $imageService->getDriverInfo();
var_dump(in_array('webp', $info['formats']));
```

### AVIF не генерируется

AVIF требует Imagick с libheif. GD не поддерживает AVIF.

**Проверка:**

```bash
convert -list format | grep AVIF
```

### Изображения загружаются, но не отображаются

**Проверьте:**

- URL Media Source в настройках
- Доступность файлов по указанному пути
- Настройки `.htaccess` для статических файлов
