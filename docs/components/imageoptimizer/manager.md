---
title: Админка
---

# Админка

**Пакеты → ImageOptimizer** или `manager/?a=index&namespace=imageoptimizer`.

![Пункт меню «Пакеты → ImageOptimizer»](/components/imageoptimizer/screenshots/menu-imageoptimizer.png)

Интерфейс на Vue 3 + PrimeVue через [VueTools](/components/vuetools/). Без VueTools ≥ 1.1.2-pl страница покажет `vuetools_required`.

## Права доступа

ImageOptimizer регистрирует три permission. По умолчанию их получают группы **Administrator** и **Manager**.

| Permission | Описание |
| --- | --- |
| `imageoptimizer_view` | Просмотр: очередь, статистика, Server, Compatibility, чтение настроек |
| `imageoptimizer_settings` | Сохранение системных настроек `imageoptimizer_*` |
| `imageoptimizer_run` | Очередь: process, rebuild, retry, clear, reset stuck |

Поведение UI:

- Пункт меню скрыт без `imageoptimizer_view`
- Форма **Настройки** read-only без `imageoptimizer_settings`
- Кнопки **Обработать очередь**, **Остановить**, **Retry**, **Rebuild**, **Clear**, **Reset stuck** только с `imageoptimizer_run`

### Роли

**Редактор (только просмотр):** `imageoptimizer_view`

**Контент-менеджер (upload + rebuild):** `imageoptimizer_view`, `imageoptimizer_run`

**Технический администратор:** все три permission

Путь: **Настройки → Права доступа → Policies / User groups**.

CLI и cron инициализируют MODX как `mgr` без сессии пользователя. ACL connector на cron не распространяется. Ограничьте доступ к shell и crontab на сервере.

## Вкладки

| Вкладка | Назначение |
| --- | --- |
| **Обзор** | Сводка очереди, прогресс, готовность сервера, **Обработать очередь** / **Остановить** |
| **Очередь** | Таблица задач, фильтры, rebuild, retry, clear |
| **Настройки** | Форма `imageoptimizer_*` по группам |
| **Сервер** | PHP, энкодеры, cron-команда |
| **Совместимость** | VueTools, Thumb3x, MS3 |

## Обзор

Сводка состояния:

- статистика очереди: `pending`, `processing`, `done`, `failed`, `skipped`
- прогресс выполнения (% done)
- готовность сервера (энкодеры WebP/AVIF)
- кнопки **Обработать очередь**, **Остановить** и **Сбросить зависшие** (при `imageoptimizer_run`)

Переключатель **Live** обновляет сводку каждые 5 секунд. Подсказка под переключателем: для фоновой обработки без открытой вкладки настройте cron (команда на вкладке **Server**).

![Вкладка «Обзор» — статистика очереди и обработка](/components/imageoptimizer/screenshots/overview.png)

## Очередь

Таблица `imageoptimizer_queue`: каждая строка — один вариант (исходник + ширина + формат).

### Колонки

| Колонка | Значение |
| --- | --- |
| ID | Первичный ключ |
| Source | ID media source |
| Path | Относительный путь в source |
| Format | `webp`, `avif`, … |
| Width | Целевая ширина (`0` = full-size WebP/AVIF) |
| Status | `pending`, `processing`, `done`, `failed`, `skipped` |
| Sizes | `original_size → converted_size` (байты) |
| Error | Текст последней ошибки |

### Фильтры и toolbar

- по статусу, поиск по пути, пагинация (lazy load)
- **Live** — автообновление таблицы (только отображение, не worker)
- **Обработать очередь**, **Пересобрать очередь**, **Очистить варианты**

![Вкладка «Очередь» — таблица задач и фильтры](/components/imageoptimizer/screenshots/queue.png)

### Действия

| Действие | Право | Connector | Описание |
| --- | --- | --- | --- |
| **Обработать очередь** | `imageoptimizer_run` | `queue/process` | Конвертация pending батчами до `pending = 0` |
| **Остановить** | `imageoptimizer_run` | — | Прерывает цикл батчей (текущий HTTP-запрос дорабатывает) |
| **Пересобрать очередь** | `imageoptimizer_run` | `queue/rebuild` | Scan и enqueue |
| **Очистить варианты** | `imageoptimizer_run` | `queue/clear` | Удаление файлов вариантов, строк очереди и HTML-кэша |
| **Повторить выбранные** | `imageoptimizer_run` | `queue/retry` | `failed`/`skipped` → `pending` |
| **Сбросить зависшие** | `imageoptimizer_run` | `queue/reset_stuck` | `processing` → `pending` |

#### Обработать очередь

Кнопка на вкладках **Обзор** и **Очередь** запускает тот же worker, что cron и `cli/convert.php`. С 1.0.4:

1. Сбрасывает зависшие `processing` (как cron)
2. Берёт lock `core/cache/imageoptimizer/cron.lock`. Параллельно с cron не стартует
3. Отправляет батчи `queue/process` по **`imageoptimizer_cron_limit`** задач за HTTP-запрос
4. Повторяет батчи, пока `pending` не станет 0 или вы не нажмёте **Остановить**
5. При `409 worker_busy` (cron уже работает) — до 3 повторов с паузой 2 с
6. Метка кнопки во время работы: «Обработка… осталось N»

Итоговые уведомления:

- очередь пуста — «Обработано N задач. Очередь пуста.»
- **Остановить** — «Остановлено. Обработано N, в очереди M.»
- лимит времени PHP — «Достигнут лимит времени PHP…» (остаток дожмёт cron или повторный клик)

Для больших каталогов без открытой вкладки используйте cron на вкладке **Server**.

#### Диалог «Пересобрать очередь»

1. **Media source** — ID источника (обычно `1`, Filesystem)
2. **Path** — файл или папка относительно **корня source**, не URL сайта:
   - пусто — весь source рекурсивно
   - `assets/images/products` — каталог MiniShop
   - `images/resources` — загрузки MS3
   - `assets/test/hero.jpg` — один файл
3. **Только просмотр** — сколько **файлов** попадёт в scan (не число строк очереди)
4. **Запустить** — постановка задач

![Диалог «Пересобрать очередь» — source, path, dry-run](/components/imageoptimizer/screenshots/queue-rebuild.png)

После rebuild нажмите **Обработать очередь** или дождитесь cron.

### Типичные статусы

- **skipped** — upscale skip, SVG, уже WebP, animated GIF, HEIC без декодера, MemoryLimit
- **failed** — нет энкодера, ошибка диска; смотрите Error и [Решение проблем](troubleshooting)

## Настройки

Форма всех `imageoptimizer_*` с группировкой: **Общие**, **Форматы**, **Фронтенд**, **Обработка**. Сохранение через connector → `modSystemSetting`.

После смены breakpoints или formats для уже загруженных файлов нужен **rebuild** или повторная загрузка. См. [Системные настройки](settings).

![Вкладка «Настройки» — форма imageoptimizer_*](/components/imageoptimizer/screenshots/settings.png)

## Сервер

Проверка окружения (read-only):

- версия PHP, лимиты memory / execution time
- GD / Imagick: WebP, AVIF, HEIC
- CLI: `cwebp`, `avifenc`, `heif-convert` (с fallback на `/opt/homebrew/bin` при пустом PATH в FPM)
- готовность сервера (%)
- **Cron-команда** — копирование в буфер

Карточки энкодеров: **Доступен** / **Не найден**.

На Valet/Herd CLI и FPM могут быть разными PHP: imagick в CLI ≠ imagick в FPM. См. [Решение проблем](troubleshooting#энкодеры-не-найдены-на-valet--herd-macos).

![Вкладка «Server» — PHP, энкодеры, cron-команда](/components/imageoptimizer/screenshots/server.png)

### Минимальные требования

| Компонент | Требование |
| --- | --- |
| PHP | ≥ 8.2 |
| Расширения | `fileinfo`, `gd` или `imagick`, `json` |
| WebP | GD с WebP, Imagick или CLI `cwebp` |
| AVIF | `avifenc` или Imagick с AVIF при `avif_enabled=1` |

Рекомендуемые лимиты: `memory_limit` ≥ 256M (для больших фото 512M), `max_execution_time` ≥ 60 для CLI/cron.

ImageOptimizer пишет в `assets/...` (варианты) и `core/cache/imageoptimizer/` (temp, HTML cache, lock). Пользователь PHP должен иметь запись в media source и `core/cache/`.

## Совместимость

Вкладка **Compatibility**: статус VueTools, подсказки по Thumb3x / MS3. См. [Совместимость](compatibility).

![Вкладка «Compatibility» — VueTools и связанные extras](/components/imageoptimizer/screenshots/compatibility.png)

## Ошибки UI

API: `assets/components/imageoptimizer/connector.php`, POST, параметр `action`, cookie сессии mgr + `HTTP_MODAUTH` / заголовок `Modauth`.

| HTTP | Причина |
| --- | --- |
| **401** | Нет сессии mgr или неверный modAuth |
| **403** | Нет permission на action |
| **409** | `worker_busy`: cron или другой **Обработать** уже работает |

### «Unexpected token '<'» / invalid JSON

Коннектор вернул HTML вместо JSON (PHP warning, 404, гонка загрузки Vue). Обновите страницу (`Cmd+Shift+R`), проверьте `connector.php` в Network. Пустая страница / «VueTools not found» — установите VueTools. Если ставили пакет из GitHub без transport, соберите админку по [README](https://github.com/Ibochkarev/ImageOptimizer#сборка).

Подробнее: [Решение проблем](troubleshooting).

## Связанные разделы

- [CLI и cron](cli) — то же, что cron, из shell
- [Системные настройки](settings) — описание каждого ключа
