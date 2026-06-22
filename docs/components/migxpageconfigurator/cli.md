# Консольные команды (CLI)

Кроме старых скриптов нарезки (`slice_tpl.php`, `mgr_tpl.php`, `mgr_elems.php` — см. [Начало работы](setup) и [Создание и обновление элементов](elements)), у компонента есть CLI-обёртка `console/mpc` — декларативное управление MODX из проектных манифестов: ресурсы, плагины, MIGX-конфиги, системные/контекстные настройки, настройки ClientConfig, установка пакетов, нарезка и экспорт лексиконов. Идея — не лазить в админку: вы описываете желаемое состояние в PHP-файле, одна команда приводит админку к нему (идемпотентно).

## Обёртка console/mpc

Запуск через тонкую обёртку (не нужно писать полный путь к `mpc.php`):

```bash
./console/mpc <группа> <действие> [аргументы] [флаги]
```

Обёртка берёт PHP из переменной окружения `MPC_PHP`, иначе из `PATH`. На большинстве хостингов системный `php` в `PATH` — это старая версия (5.x), которая не запустит код компонента. Поэтому указывайте PHP 7.4+ явно:

```bash
export MPC_PHP=/usr/local/php/php-7.4/bin/php
./console/mpc settings apply
```

Или одной строкой на вызов:

```bash
MPC_PHP=/usr/local/php/php-7.4/bin/php ./console/mpc settings apply
```

Прямой вызов тоже работает:

```bash
php core/components/migxpageconfigurator/console/mpc.php settings apply
```

::: warning Симптом неправильной версии PHP
`Parse error: syntax error, unexpected '['` — значит обёртка запустилась под PHP < 5.4. Выставьте `MPC_PHP` на php-7.4+.
:::

::: tip CLI в MODX 3
В версии для **MODX Revolution 3** код требует **PHP 8.1+** — указывайте php-8.2:

```bash
export MPC_PHP=/usr/local/php/php-8.2/bin/php
./console/mpc cut all
```

Отдельные старые скрипты (`mgr_tpl.php`, `mgr_elems.php`, `clear_cache.php`) в MODX 3 убраны — все операции выполняются через единую обёртку `mpc` (`cut`, `configs`, `cache clear` и т. д.).
:::

## Группы и команды

| Команда | Что делает |
|---|---|
| `resources apply [файл]` | Дерево ресурсов. Идемпотентно по `context_key + pagetitle`. Создаёт/обновляет, не удаляет. `--only=<pagetitle\|alias>` — точечно. |
| `cut <файл.tpl\|all> [--upd]` | Нарезка шаблона в контексте `--ctx` (по умолчанию `web`). **Без `--upd`** — нарезка + умный мерж (ручные правки сохраняются); **с `--upd`** — нарезка + полная перезапись контента секций и переводов из вёрстки. С `--theme=<имя>` — нарезка вёрстки темы (см. [Темизация](themes)). |
| `theme set <имя> [--template=ID]` | Включить тему: на весь сайт или (с `--template=ID`) только для одного шаблона. Чистит кэш `parsed/`. См. [Темизация](themes). |
| `theme clear [--template=ID]` | Выключить тему (вернуть базовую вёрстку): везде или только для шаблона. Чистит кэш `parsed/`. |
| `theme status` | Показать текущую тему, темы по шаблонам и папку тем. Ничего не меняет. |
| `plugins apply [файл]` | Создать/обновить плагины и синхронизировать их события. `events` в спеке — полный желаемый набор: лишние привязки отвяжутся. |
| `configs sync` | Применить сид MIGX-конфигов (`migx_configs.json`, merge: новые поля + сохранение правок). |
| `settings apply [файл]` | Системные (`modSystemSetting`) и контекстные (`modContextSetting`) настройки MODX. Upsert по ключу. |
| `settings list [--namespace=ns] [--context=web] [--key=часть]` | Список настроек с фильтрами. |
| `clientconfig apply [файл]` | Настройки ClientConfig (`cgSetting` + `cgContextValue`). Требует установленного ClientConfig. |
| `clientconfig list [--group=имя] [--key=часть]` | Список настроек ClientConfig. |
| `packages apply [файл]` | Установка / удаление пакетов. Деструктив → `--force`. |
| `cache clear [id,…]` | Очистить запечённые `parsed/` (без id — все; безопасно, регенерируются). |
| `lexicon export-all` | Экспорт всех лексиконов одним файлом (XLSX). |
| `lexicon export-untranslated <filename>` | Экспорт только непереведённых ключей ресурса. |
| `lexicon list` | Список lexicon-файлов с заголовками. |
| `help` | Справка. |

::: tip Имя файла для `cut` — с расширением
`cut` ищет файл как есть, без автодобавления расширения. Передавайте имя с расширением: `cut wrapper.tpl`, а не `cut wrapper` (иначе файл не найдётся).
:::

### Флаги

- `--dry-run` — только показать план, без записи. **Рекомендуется перед боевым запуском.**
- `--force` — выполнить деструктив (нужен для `packages`).
- `--only=<ref>` — точечно (только указанный ресурс), для `resources`.
- `--json` — машинный вывод (план + результат в JSON).

## Манифесты

Манифест — это PHP-файл, возвращающий массив (`return [...]`). Шаблоны лежат в `console/examples/`: `resources.example.php`, `settings.example.php`, `clientconfig.example.php`, `plugins.example.php`, `packages.example.php`.

::: warning Манифест — исполняемый PHP
Держите манифесты в доверенном репозитории проекта: при `apply` файл выполняется.
:::

### База манифестов и дефолты имён

Боевые манифесты кладите в **базовую папку** — тогда путь можно не передавать. База определяется в порядке убывания приоритета:

1. переменная окружения `MPC_MANIFESTS_PATH`;
2. системная настройка `mpc_manifests_path`;
3. дефолт `components/migxpageconfigurator/console/manifests/`.

Относительный путь резолвится от папки `core/` MODX. Аргумент `apply` необязателен:

| Вызов | Какой файл |
|---|---|
| `settings apply` | `{base}/settings.php` (дефолт по имени группы) |
| `settings apply prod` | `{base}/prod.php` (профиль/окружение) |
| `settings apply ./my/path.php` | указанный файл как есть |

Имя без расширения дополняется `.php`. Существующий файл по абсолютному или относительному пути всегда берётся напрямую, минуя базу.

## Настройки MODX: системные и контекстные

Команда `settings apply` создаёт и обновляет **системные** (`modSystemSetting`) и **контекстные** (`modContextSetting`) настройки. Upsert по ключу: есть → обновляется при отличии значения, нет → создаётся. Удаление не выполняется (аддитивно).

Три формы записи:

```php
<?php
return [
    // 1. КРАТКАЯ форма — системная настройка, обновление существующей
    'mpc_use_lexicons'     => true,
    'mpc_default_language' => 'ru',

    // 2. ПОЛНАЯ форма — для СОЗДАНИЯ новой системной настройки
    'my_project_api_key' => [
        'value'     => '',
        'xtype'     => 'textfield',
        'namespace' => 'myproject',
        'area'      => 'myproject:main',
    ],

    // 3. КОНТЕКСТНАЯ настройка (modContextSetting) — ключ 'context'
    'mpc_available_languages' => [
        'value'   => 'ru,en',
        'context' => 'web',
    ],
];
```

- Без ключа `'context'` запись идёт в системную таблицу.
- С `'context' => '<ключ_контекста>'` — в контекстную (`modContextSetting`), переопределяя системное значение для этого контекста.

Просмотр:

```bash
./console/mpc settings list --namespace=myproject
./console/mpc settings list --context=web --key=lang
```

## Настройки ClientConfig

Команда `clientconfig apply` создаёт и обновляет настройки [ClientConfig](https://github.com/Mark-H/ClientConfig): базовое значение (`cgSetting`) и контекстное (`cgContextValue`). Upsert по ключу. Требует установленного пакета ClientConfig (иначе команда вернёт ошибку).

```php
<?php
return [
    // 1. КРАТКАЯ форма — базовое значение существующей настройки
    'phone' => '8 800 000-00-00',

    // 2. ПОЛНАЯ форма — СОЗДАНИЕ новой настройки в группе
    'company_name' => [
        'value' => 'ООО Ромашка',
        'xtype' => 'textfield',
        'group' => 'Контакты',
    ],

    // 3. КОНТЕКСТНОЕ значение (cgContextValue) — ключ 'context'
    'phone_secondary' => [
        'value'   => '8 800 111-11-11',
        'context' => 'web',
    ],
];
```

- `'group'` (id или label/имя группы `cgGroup`) указывается **только при создании** новой настройки.
- `'context'` необязателен: без него пишется базовое значение `cgSetting`; с ним — контекстное `cgContextValue`.

Просмотр:

```bash
./console/mpc clientconfig list --group=Контакты
```

::: info Куда какие настройки
Системные и контекстные настройки MODX — через `settings`. Настройки ClientConfig — через `clientconfig`. Это разные хранилища и разные команды. Служебную информацию из вёрстки (`data-mpc-info`) можно писать и в те, и в другие — см. [Системные настройки](markup#системные-настройки).
:::

## Безопасность

- Деструктив (`packages` install/remove) — только с `--force`.
- `resources` / `settings` НЕ удаляют отсутствующие в манифесте сущности (работают аддитивно).
- `plugins` — события приводятся к указанному набору для перечисленных плагинов (лишнее **отвяжется**) — всегда сверяйтесь с `--dry-run`.
- Перед боевым запуском прогоняйте `--dry-run`.
