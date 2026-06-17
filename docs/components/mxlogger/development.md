# Архитектура и сборка

## Устройство

- **Сервис** — `MxLogger\MxLogger` (+ `MxLogger\MxLoggerProcess`), PSR-4. Регистрируется
  в DI-контейнере в `core/components/mxlogger/bootstrap.php`
  (`$modx->services->add('mxlogger', …)`) при загрузке namespace. Там же
  регистрируется xPDO-пакет модели:
  `$modx->addPackage('MxLogger\Model', …, 'MxLogger\\')`.
- **Модель** — `MxLogger\Model\MxLoggerLog` (xPDO 3, `schema/mxlogger.mysql.schema.xml`,
  version 3.0). Одна таблица `mxlogger_log`. Тэги — CSV-колонка `tags`
  (`,cart,purchase,`) с FULLTEXT-индексом.
- **Захват источника** — `debug_backtrace` с пропуском собственных классов и
  диспетчерских кадров фреймворка (в т.ч. namespaced MODX 3:
  `MODX\Revolution\modScript::process`, `*::invokeEvent`, `include`/`eval`) +
  `skip_classes` из опций.
- **Менеджер** — контроллер `core/components/mxlogger/controllers/logs.class.php`
  (плоский класс `MxloggerlogsManagerController` — так MODX 3 резолвит контроллер по
  паре namespace+action), Vue-бандл в `assets/components/mxlogger/js/mgr/vue-dist/`.
- **Плагины** — `mxLoggerRotate` (ротация, `OnMODXInit`) и `mxLoggerMiniShop3`
  (события магазина); оба static (код = файл).
- **Break-glass** — `assets/components/mxlogger/standalone.php` (PDO напрямую).

## Структура репозитория

- `core/components/mxlogger/` — PHP (`src/`, `controllers/`, `elements/`, `schema/`,
  `lexicon/`, `bootstrap.php`, runtime `vendor/`)
- `assets/components/mxlogger/` — коннектор, standalone, исходники и сборка UI
  (`js/mgr/` — Vue, `js/mgr/vue-dist/` — бандл)
- `package_builder/packages/mxlogger/` — конфиг, элементы, резолверы сборки
- `_modx2/` — первоисточник версии под MODX 2 (для сверки; в пакет не идёт)

В git хранятся: `package_builder/`, `vendor/`, `vue-dist/`. Не хранятся:
`node_modules/`, собранные `core/packages/*.zip`, IDE-файлы.

## Сборка

UI (Vue):

```bash
cd assets/components/mxlogger
npm install
npm run build      # → js/mgr/vue-dist/{logs.min.js, logs.min.css}
```

Transport-пакет (локально):

```bash
cd /path/to/mxlogger3
modxapp build mxlogger     # → core/packages/mxlogger-*.transport.zip
```

`modxapp` подхватывает `core/components/mxlogger/docs/{readme,license,changelog}.txt`
в атрибуты пакета (вкладки при установке).

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
- **Резолв контроллера CMP.** MODX 3 строит имя контроллера как
  `ucfirst(namespace).action.'ManagerController'` (плоский класс) и ищет файл
  `controllers/<action>.class.php` — PSR-4 `src/Controllers` тут не резолвится.
- **Иконка меню** — HTML `<i class="…">`, не путь к картинке.
- **CSS бандла.** PrimeVue styled-mode инжектит CSS компонентов, но не иконочный
  шрифт PrimeIcons — он подключается отдельным CSS (шрифт инлайнен base64).
