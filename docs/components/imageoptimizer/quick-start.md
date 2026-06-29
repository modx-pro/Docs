---
title: Быстрый старт
---

# Быстрый старт

За 10 минут: установить зависимости, настроить cron, получить первый `<picture>` на витрине.

## Шаг 1: Зависимости

Перед ImageOptimizer установите на сайте:

- [pdoTools](/components/pdotools/)
- [VueTools](/components/vuetools/) ≥ 1.1.2-pl

Без VueTools админка покажет сообщение `vuetools_required`.

## Шаг 2: Установите ImageOptimizer

1. **Extras → Installer** → **ImageOptimizer** → **Install**.
2. Проверьте, что плагин **ImageOptimizer** активен.
3. **Настройки → Очистить кэш**.

<!-- SCREENSHOT: Пункт меню Компоненты → ImageOptimizer -->
<!-- ![Пункт меню «Компоненты → ImageOptimizer»](/components/imageoptimizer/screenshots/menu-imageoptimizer.png) -->

## Шаг 3: Проверьте сервер

Откройте **Компоненты → ImageOptimizer** → вкладка **Server**.

На карточках WebP хотя бы один энкодер в статусе **Доступен** (GD, Imagick или `cwebp`). Если все «Не найдены», см. [Решение проблем](troubleshooting#энкодеры-не-найдены-на-valet--herd-macos).

<!-- SCREENSHOT: Вкладка Server — карточки энкодеров -->
<!-- ![Вкладка «Server» — готовность WebP-энкодеров](/components/imageoptimizer/screenshots/server.png) -->

По умолчанию уже включены:

- `imageoptimizer_enabled`
- `imageoptimizer_inject_frontend`
- `imageoptimizer_convert_on_upload`

## Шаг 4: Настройте cron

Worker не стартует сам после upload. Добавьте в crontab:

```bash
*/10 * * * * php /path/to/site/core/components/imageoptimizer/cron/convert.php >> /var/log/imageoptimizer-cron.log 2>&1
```

Замените `/path/to/site` на корень MODX. Раз в сутки для очистки старых записей очереди:

```bash
0 3 * * * php /path/to/site/core/components/imageoptimizer/cron/prune.php
```

Подробнее: [CLI и cron](cli).

## Шаг 5: Конвертируйте изображения

### Новая загрузка

Загрузите JPEG или PNG в **File Manager**. В **ImageOptimizer → Очередь** появятся задачи со статусом `pending`.

Нажмите **Обработать очередь** или дождитесь cron. После `done` на диске лежат файлы вида `photo.768.webp`, `photo.jpg.webp`.

### Существующий каталог

1. **Очередь → Пересобрать очередь**
2. **Media source** — обычно `1` (Filesystem)
3. **Path** — каталог относительно корня source, например `assets/images/catalog` или `images/resources` для MS3
4. **Запустить**, затем **Обработать очередь**

Через CLI:

```bash
php core/components/imageoptimizer/cli/convert.php --source=1 --scan --path=assets/images --limit=200
```

## Шаг 6: Проверьте витрину

На странице с обычным тегом:

```html
<img src="assets/images/hero.jpg" alt="Hero">
```

откройте исходный код. После обработки очереди и сброса кэша MODX вы увидите `<picture>` с `<source type="image/webp">` и `srcset`.

Если `<picture>` нет, пройдите [чеклист](troubleshooting#нет-webpavif-на-сайте-нет-picture).

## Что дальше

- [Системные настройки](settings) — breakpoints, quality, skip-классы
- [Авто-inject и picture](frontend) — `data-imageoptimizer-skip`, LCP, sizes
- [Админка](manager) — очередь, права, вкладка Server
- [Совместимость](compatibility) — Thumb3x и MiniShop3
