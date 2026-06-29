---
title: FAQ
---

# FAQ

## Общее

### Чем ImageOptimizer отличается от Thumb3x / pThumb?

ImageOptimizer создаёт статические WebP/AVIF рядом с оригиналом и оборачивает `<img>` в `<picture>` на выходе страницы. Thumb3x и pThumb делают on-the-fly ресайз по URL. Пакеты можно комбинировать, но не дублируйте responsive на одних и тех же картинках. См. [Совместимость](compatibility).

### Нужен ли MiniShop3?

Нет. Inject работает на любом HTML-сайте MODX. MS3 чаще всего на витрине магазина.

### Ломается ли SVG?

SVG не конвертируется и не попадает в очередь. Обрабатываются растровые форматы: jpg, png, gif; webp как source тоже пропускается.

## Очередь и конвертация

### После установки тысячи pending — это нормально?

Да, если вы сделали rebuild по корню `assets/` или большому каталогу. Ограничьте path при rebuild (`assets/images/catalog`) или используйте cron с меньшим `imageoptimizer_cron_limit`.

### Очередь сама не обрабатывается?

Worker не стартует от upload или rebuild. Варианты:

1. **Очередь → Обработать очередь** в админке (до `cron_limit` за раз)
2. Cron: `cron/convert.php`
3. CLI: `cli/convert.php --limit=N`

### Rebuild по папке показывает 0?

Путь относительно корня media source (basePath), без ведущего `/`. Пример MS3: `images/resources`, не `/images/resources`. Dry-run считает файлы; строк очереди будет больше (breakpoints × formats).

### Почему статус skipped?

Частые причины: `upscale=0` (картинка меньше breakpoint), preflight (SVG, animated GIF, HEIC без декодера), MemoryLimit.

### Failed: «Unable to create cache directory»

Создайте каталог вручную и проверьте права записи:

```bash
mkdir -p core/cache/imageoptimizer
chmod 775 core/cache/imageoptimizer
```

### Как переконвертировать после смены quality?

Удалите варианты `*.webp` / `*.avif` на диске, удалите записи `done` или сделайте rebuild по path.

## Фронтенд

### `<picture>` не появляется

1. `imageoptimizer_enabled` и `imageoptimizer_inject_frontend` = 1
2. Плагин активен, событие `OnWebPagePrerender`
3. Путь `<img src>` резолвится в media source (локальный `assets/...`)
4. На диске есть готовые варианты (status `done`)
5. Очистите кэш MODX

Подробнее: [Решение проблем](troubleshooting).

### Как отключить для одной картинки?

`class="no-optim"` (из `skip_classes`), атрибут `data-imageoptimizer-skip` или свой класс в `imageoptimizer_skip_classes`.

### Уже есть srcset на img

ImageOptimizer не перезаписывает ваш srcset; может добавить lazy/decoding. Для полного `<picture>` уберите ручной srcset или используйте skip.

### Работает ли inject в письмах?

Нет. `imageoptimizer_inject_email` в настройках зарезервирован, код inject для email не реализован.

## Админка

### Белый экран / VueTools

Установите **VueTools ≥ 1.1.2-pl**, очистите кэш браузера. Пересборка админки нужна только при установке из исходников, не из ModStore. См. [README на GitHub](https://github.com/Ibochkarev/ImageOptimizer#сборка).

### Нет пункта меню

Проверьте ACL: группа должна иметь `imageoptimizer_view`. Переустановите пакет или добавьте права вручную. См. [Админка](manager#права-доступа).

### Ошибка JSON в Overview («Unexpected token '<'»)

Коннектор вернул HTML. Обновите страницу, проверьте Network → `connector.php`. См. [Решение проблем](troubleshooting).

### Server: все энкодеры «Не найден» (macOS Valet)

FPM часто без imagick и с пустым PATH. CLI и FPM должны быть одной версии PHP. См. [Решение проблем](troubleshooting#энкодеры-не-найдены-на-valet--herd-macos).

## Производительность

### Нагрузка на cron

Уменьшите `imageoptimizer_cron_limit`. Конвертируйте ночью большими `--limit` через CLI.

### Размер диска

Каждый breakpoint × format — отдельный файл. Для каталога из 10k фото × 5 breakpoints × 2 formats планируйте место или сократите breakpoints/formats.

## Связанные разделы

- [Решение проблем](troubleshooting) — пошаговая диагностика
- [Системные настройки](settings) — все ключи
- [Авто-inject и picture](frontend) — разметка и inject

Баги и предложения: [Issues на GitHub](https://github.com/Ibochkarev/ImageOptimizer/issues).
