# Архитектура и сборка

Внутреннее устройство одинаково по идее в обеих версиях (один сервис, одна таблица,
тот же захват источника, те же плагины и standalone). Различается реализация под
платформу — xPDO, регистрация сервиса, технология грида и инструмент сборки.

## Устройство

| Компонент | MODX 2 | MODX 3 |
| --- | --- | --- |
| Сервис | класс `mxLogger` (+ `mxLoggerProcess`), `model/mxlogger/mxlogger.class.php` | `MxLogger\MxLogger` (+ `MxLogger\MxLoggerProcess`), PSR-4 |
| Регистрация сервиса | JSON-настройка `extension_packages` → `$modx->mxlogger` | DI-контейнер в `bootstrap.php` (`$modx->services->add('mxlogger', …)`) |
| Фасад `$modx->mxl` (1.2.0) | плагин `mxLoggerFacade` на `OnMODXInit` | строка в `bootstrap.php` (`$modx->mxl = …`) |
| Модель | `mxLoggerLog` (xPDO 2), ручные мапы `model/mxlogger/mysql/*.map.inc.php` + `schema.xml` | `MxLogger\Model\MxLoggerLog` (xPDO 3), `schema/mxlogger.mysql.schema.xml`, version 3.0 |
| Менеджер | CMP-контроллер (ExtJS/MODExt) | контроллер `controllers/logs.class.php` + Vue-бандл |
| Плагин магазина | `mxLoggerMiniShop2` (static) | `mxLoggerMiniShop3` (static) |

Общее для обеих версий:

- Одна таблица `mxlogger_log`. Тэги — CSV-колонка `tags` (`,cart,purchase,`) с
  FULLTEXT-индексом.
- **Захват источника** — `debug_backtrace` с пропуском собственных классов и
  диспетчерских кадров фреймворка (`*::invokeEvent`, `mod*::process`,
  `include`/`eval`; в MODX 3 классы namespaced — `MODX\Revolution\modScript::process`)
  плюс `skip_classes` из опций.
- Плагин ротации `mxLoggerRotate` (`OnMODXInit`).
- **Break-glass** — `assets/components/mxlogger/standalone.php` (PDO напрямую, без
  бутстрапа MODX).

::: info Регистрация сервиса в MODX 2
JSON-настройка `extension_packages`:
`{"mxlogger":{"path":"[[++core_path]]components/mxlogger/model/","serviceName":"mxlogger","serviceClass":"mxLogger"}}`.
Сервис создаётся очень рано (на `_loadExtensionPackages`), когда `$modx->lexicon`
ещё `null` — конструктор не должен звать `lexicon->load()` без guard.
:::

## Структура репозитория (MODX 3)

- `core/components/mxlogger/` — PHP (`src/`, `controllers/`, `elements/`, `schema/`,
  `lexicon/`, `bootstrap.php`, runtime `vendor/`)
- `assets/components/mxlogger/` — коннектор, standalone, исходники и сборка UI
  (`js/mgr/` — Vue, `js/mgr/vue-dist/` — бандл)
- `package_builder/packages/mxlogger/` — конфиг, элементы, резолверы сборки
- `_modx2/` — первоисточник версии под MODX 2 (для сверки; в пакет не идёт)

В git хранятся: `package_builder/`, `vendor/`, `vue-dist/`. Не хранятся:
`node_modules/`, собранные `core/packages/*.zip`, IDE-файлы.

## Сборка

::: code-group

```bash [MODX 3]
# UI (Vue)
cd assets/components/mxlogger
npm install
npm run build      # → js/mgr/vue-dist/{logs.min.js, logs.min.css}

# transport-пакет
cd /path/to/mxlogger3
modxapp build mxlogger     # → core/packages/mxlogger-*.transport.zip
```

```bash [MODX 2]
# transport-пакет собирается modxbuilder на живом MODX
cd apps/mxlogger/modxbuilder/mxlogger/build
php build.transport.php    # → core/packages/mxlogger-*.transport.zip
```

:::

В MODX 3 `modxapp` подхватывает `core/components/mxlogger/docs/{readme,license,changelog}.txt`
в атрибуты пакета (вкладки при установке). В MODX 2 settings/menu/snippet захардкожены
в `build/data/transport.*` (для самодостаточности сборки).

## Выкатка

Собрать пакет локально → залить zip на сервер → установить (Package Management или
transport API). Для чистой переустановки на dev-окружении: снять старый пакет
(`uninstall`+`remove`), снести `core/components/mxlogger` и `assets/components/mxlogger`,
поставить заново из zip, сбросить кэш (`core/cache`).

> Не обновляйте код на сервере выборочным копированием отдельных файлов — file-vehicle
> и кэш скриптов держат старое, получается разнобой. Только сборка → установка из zip.

## Подводные камни (из опыта)

- **Charset.** Таблица должна быть utf8mb4 — иначе кириллица падает с «1366
  Incorrect string value». Резолвер приводит к utf8mb4 при install/upgrade.
- **`createObjectContainer` создаёт всё.** На чистой установке таблица создаётся сразу
  со всеми колонками/индексами из map — безусловные `addField`/`addIndex` после него
  сыплют «Duplicate column/key». Добавлять недостающее только после `SHOW COLUMNS`/
  `SHOW INDEX` (нужно лишь для апгрейда со старой схемы).
- **MODX 2: `createdon` — `phptype="integer"`**, не `timestamp` (иначе xPDO ломает
  чтение unix-времени). Ручные мапы и `schema.xml` держать синхронно.
- **MODX 2: `connector.php`** должен грузить connectors-бутстрап, а не фронтовый
  `index.php` — иначе грид получает HTML вместо JSON.
- **MODX 3: резолв контроллера CMP.** Имя строится как
  `ucfirst(namespace).action.'ManagerController'` (плоский класс), файл —
  `controllers/<action>.class.php`; PSR-4 `src/Controllers` тут не резолвится.
- **MODX 3: CSS бандла.** PrimeVue styled-mode инжектит CSS компонентов, но не шрифт
  PrimeIcons — он подключается отдельным CSS (инлайн base64).
- **Статичные плагины: проверять размер файла после заливки** — был случай заливки
  обрезанного файла (`getContent()` пустой → плагин молча не работал).
