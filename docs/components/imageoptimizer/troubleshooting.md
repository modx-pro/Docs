---
title: Решение проблем
---

# Решение проблем

Пошаговая диагностика. Краткие ответы: [FAQ](faq).

## Очередь не обрабатывается

### Симптомы

Записи остаются в `pending`, файлы `*.webp` не появляются.

### Шаги

1. **Админка** — **Очередь → Обработать очередь** (нужно `imageoptimizer_run`). За клик обрабатывается до `cron_limit` задач; для большой очереди нажимайте несколько раз или настройте cron.
2. **Cron** — строка в crontab указывает на правильный PHP и путь:

   ```bash
   php core/components/imageoptimizer/cron/convert.php
   ```

3. **Lock** — если предыдущий процесс упал, удалите устаревший lock только после проверки, что worker не запущен: `core/cache/imageoptimizer/cron.lock`
4. **Ручной прогон:**

   ```bash
   php core/components/imageoptimizer/cli/convert.php --limit=10
   ```

5. **Зависшие processing** — **Сбросить зависшие** или дождитесь cron (`stuck_minutes`).
6. **Энкодеры** — вкладка **Server**: WebP должен быть «Доступен».
7. **enabled** — `imageoptimizer_enabled=1`.
8. **409 worker_busy** — другой cron или **Обработать** уже работает; подождите или снимите lock.

### Ошибка «Unable to create cache directory»

Worker не может создать `core/cache/imageoptimizer/`. Создайте каталог вручную и проверьте права записи для пользователя PHP:

```bash
mkdir -p core/cache/imageoptimizer
chmod 775 core/cache/imageoptimizer
```

## Нет WebP/AVIF на сайте (нет `<picture>`)

### Чеклист

1. `imageoptimizer_enabled=1` и `imageoptimizer_inject_frontend=1`
2. Плагин **ImageOptimizer** активен, событие `OnWebPagePrerender` в списке
3. В очереди для этого пути статус **done** (не только pending)
4. `src` у `<img>` — локальный путь в media source (`assets/...`), не внешний URL
5. Нет skip: класс из `skip_classes`, `skip_src_pattern`, `data-imageoptimizer-skip`
6. **Кэш:** очистите кэш MODX; при `html_cache=1` сбросьте HTML-кэш ImageOptimizer
7. Страница не больше `max_html_size` (1 МБ по умолчанию)

### Проверка HTML

```bash
curl -s 'https://example.com/page.html' | grep -E '<picture|\.webp'
```

### Путь в `src` не попадает в media source

Inject ищет файл на диске и сопоставляет его с **Filesystem** media source. Если сопоставление не удалось, `<picture>` не строится.

Проверьте:

1. `src` указывает на **существующий** файл: `assets/...` или `/assets/...`, не внешний URL и не `data:`
2. Файл лежит внутри `basePath` одного из Filesystem sources (часто source `1` с корнем `assets/`)
3. S3, FTP и другие non-filesystem sources inject не поддерживает
4. В очереди для этого пути статус **done**, варианты `*.webp` / `*.avif` есть на диске
5. Нет skip: класс из `skip_classes`, подстрока `thumb3x` в URL, `data-imageoptimizer-skip`

Подробнее про skip: [Авто-inject и picture](frontend#условия-пропуска).

## Статус skipped в очереди

Смотрите колонку **Error** / skip_reason:

| Причина | Действие |
| --- | --- |
| Upscale skip | `upscale=0` и картинка меньше breakpoint; включите `upscale=1` если нужны «широкие» варианты |
| SvgSkip | SVG не конвертируется |
| AlreadyWebp | Источник уже WebP |
| AnimatedNotSupported | GIF с анимацией |
| MemoryLimit | Увеличьте `max_memory_limit`, уменьшите breakpoints |
| NonFilesystemSource | Очередь только для Filesystem media source |

## Ошибки памяти / timeout

- `imageoptimizer_max_memory_limit` → `512M` или `768M`
- Меньше breakpoints: `480,768,1024`
- Меньше `cron_limit` и `--limit` в CLI
- Конвертируйте большие каталоги ночью с `--time-budget=3600`

## Админка не открывается / белый экран

1. Установите **VueTools ≥ 1.1.2-pl**
2. Установка из **ModStore**: пересборка админки не нужна, в transport уже есть `imageoptimizer-admin.min.js`. Сборка из [исходников на GitHub](https://github.com/Ibochkarev/ImageOptimizer#сборка) без `npm run build:mgr` даст пустую страницу
3. Очистите кэш браузера и MODX
4. Консоль браузера: ошибки загрузки `imageoptimizer-admin.min.js`
5. Сообщение `imageoptimizer_vuetools_required` — VueTools не установлен или версия ниже минимума

## JSON / «Unexpected token '<'» в Overview

Коннектор вернул HTML (PHP warning, редирект на login, 404) вместо JSON.

1. Hard refresh (`Cmd+Shift+R`)
2. DevTools → Network → `connector.php` — статус и тело ответа
3. Убедитесь, что в HTML менеджера задан `window.imageoptimizerConfig.connectorUrl` (откройте **Компоненты → ImageOptimizer**, hard refresh)
4. Проверьте права и modAuth (401 → HTML страница mgr)

## Rebuild показывает 0 файлов для каталога

Путь в диалоге относительно корня media source, не URL сайта:

- MS3 uploads: часто `images/resources`, не `/images/resources`
- MiniShop: `assets/images/products/…`
- Один файл: полный относительный путь с расширением

Dry-run в диалоге считает **файлы**, не строки очереди (файл × breakpoints × formats).

## Энкодеры «Не найден» на Valet / Herd (macOS)

CLI `php -m` показывает imagick, а вкладка **Server** нет: FPM использует другой бинарник и пустой `PATH`.

1. Один PHP для CLI и FPM: `valet use php@8.3` / Herd → та же версия
2. Установить imagick для **FPM PHP**: `pecl install imagick`
3. CLI-утилиты: `brew install webp libavif libheif imagemagick`
4. В `php-fpm.d/valet-fpm.conf` (или аналог): `env[PATH] = /opt/homebrew/bin:/usr/local/bin:…`
5. Перезапустить FPM (при «залипшем» master может понадобиться `sudo kill` старого php-fpm)

Preflight ищет `cwebp`, `avifenc`, `heif-convert` также в `/opt/homebrew/bin`. Рекомендация: `valet use php@X.Y` и один `php -v` для CLI и сокета FPM.

## Огромная очередь после rebuild

Rebuild по корню `assets/` ставит задачи на каждый файл × breakpoints × formats.

**Решение:** rebuild с узким `path` (`assets/images/catalog`), cron с меньшим `cron_limit`, или остановка и очистка лишних pending через **Очистить варианты** (осторожно: удаляет файлы вариантов).

## Диск переполнен

Каждый вариант — отдельный файл. Сократите `formats`, `breakpoints` или `avif_enabled`. Настройте `disk_warn_gb` для раннего предупреждения в UI.

## Связанные разделы

- [FAQ](faq)
- [Админка](manager) — вкладка Server
- [CLI и cron](cli)

Сообщите о баге с логами и версией PHP: [Issues на GitHub](https://github.com/Ibochkarev/ImageOptimizer/issues).
