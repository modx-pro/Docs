# Готовые шаблоны миграций

Готовый шаблон создаёт самостоятельный PHP-файл для типовой задачи. Он не
выполняет миграцию и не меняет базу. Без `--apply` результат только печатается,
поэтому его можно сначала прочитать и только затем записать.

В командах CLI шаблоны называются `recipe`, поэтому дальше рядом с понятным
названием указан технический идентификатор.

::: tip Связь с xPDO-моделью
Если таблица найдена в разделе `models`, шаблоны колонок и индексов одновременно
готовят изменение её XML-схемы. После применения миграции выполните
`model:build --apply`. Для таблицы, которой нет ни в одной настроенной схеме,
создаётся только миграция базы.
:::

## Список

| Шаблон (`recipe`) | Параметры | Что генерирует |
| --- | --- | --- |
| `empty` | — | Пустую идемпотентную заготовку. |
| `drop-settings` | `class`, `keys` | Удаление настроек MODX по ключам. |
| `drop-tables` | `tables` | Удаление таблиц по именам без системного префикса. |
| `drop-elements` | `class`, `names` | Удаление элементов MODX по полю `name`. |
| `add-column` | `table`, `column`, `type` | Добавление отсутствующей колонки. |
| `modify-column` | `table`, `column`, `type` | Изменение SQL-типа существующей колонки. |
| `drop-column` | `table`, `column` | Удаление существующей колонки. |
| `add-index` | `table`, `name`, `columns`, `unique` | Создание обычного или уникального индекса. |
| `drop-index` | `table`, `name` | Удаление индекса. |
| `create-tables` | зависит от версии MODX | Создание таблиц классов xPDO-модели. |

Точные параметры установленной версии доступны из CLI:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php recipe:list

php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php recipe:help create-tables
```

Списки передаются через запятую без пробелов либо в кавычках.

## Общие параметры шаблонов

У любого шаблона можно передать `--purpose=...`. Текст попадёт в заголовок
файла и объяснит причину изменения:

```bash
new add_order_status --recipe=add-column \
  --purpose="хранить этап обработки заказа" \
  --table=site_orders --column=status \
  --type="VARCHAR(20) NOT NULL DEFAULT 'new'"
```

`--purpose` не относится к телу операции и не отображается в краткой справке
шаблона.

## Колонки

### Добавление

```bash
new add_order_status --recipe=add-column \
  --table=site_orders \
  --column=status \
  --type="VARCHAR(20) NOT NULL DEFAULT 'new'" \
  --apply
```

Если колонка уже существует, миграция завершится успешно без изменения.

### Изменение типа

```bash
new expand_order_status --recipe=modify-column \
  --table=site_orders \
  --column=status \
  --type="VARCHAR(50) NOT NULL DEFAULT 'new'" \
  --apply
```

Миграция сравнивает текущий `COLUMN_TYPE`, поэтому различает, например,
`varchar(20)` и `varchar(50)`. Отсутствующая колонка считается ошибкой.

### Удаление

```bash
new drop_legacy_status --recipe=drop-column \
  --table=site_orders --column=legacy_status --apply
```

::: danger Удаление необратимо
Шаблон проверяет наличие колонки, но не может определить, читает ли её код и
нужны ли данные. До создания миграции проверьте использование и резервную копию.
:::

## Индексы

Обычный индекс:

```bash
new index_orders_status --recipe=add-index \
  --table=site_orders --name=status_createdon \
  --columns=status,createdon --apply
```

Уникальный индекс:

```bash
new unique_external_id --recipe=add-index \
  --table=site_orders --name=external_id \
  --columns=external_id --unique --apply
```

Для уникального индекса заготовка сначала ищет дубликаты значений и бросает
исключение, если они есть. Уже существующий индекс с таким именем считается
целевым состоянием.

Удаление:

```bash
new drop_old_index --recipe=drop-index \
  --table=site_orders --name=old_status --apply
```

## Таблицы xPDO-модели

Здесь платформы различаются: MODX 2 загружает старую xPDO-модель, MODX 3 —
PSR-4-модель.

### MODX 2

```bash
new create_site_tables --recipe=create-tables \
  --package=site \
  --model-path=core/components/site/model/ \
  --classes=SiteOrder,SiteOrderAddress \
  --apply
```

`model-path` передаётся так, как его ожидает `addPackage()`. Миграция загружает
xPDO-пакет и для каждого класса:

- получает физическое имя таблицы;
- пропускает уже существующую таблицу;
- вызывает `manager->createObjectContainer()` для отсутствующей;
- проверяет, что таблица действительно появилась.

### MODX 3

```bash
new create_site_tables --recipe=create-tables \
  --package='Site\Model' \
  --model-path='/var/www/site/core/components/site/src/' \
  --namespace-prefix='Site\' \
  --classes='Site\Model\Order,Site\Model\OrderProduct' \
  --apply
```

Для MODX 3 нужны PSR-4-имя пакета, корневой namespace и полные имена классов.
Проверьте регистр имён и доступность модели на всех средах.

## Удаление объектов MODX

Для штатных системных настроек `--class` можно не указывать: пакет подставит
`modSystemSetting` в MODX 2 и `MODX\Revolution\modSystemSetting` в MODX 3.

```bash
new drop_old_settings --recipe=drop-settings \
  --keys=site.old_mode,site.legacy_url \
  --apply
```

Так же работает класс плагина по умолчанию:

```bash
new drop_old_plugins --recipe=drop-elements \
  --names=SiteLegacy,SiteImportOld --apply
```

Параметр `--class` нужен для другого типа объекта. В MODX 3 передавайте FQCN,
например `--class='MODX\Revolution\modChunk'`.

После фактического удаления заготовки очищают кеш MODX. Отсутствующий объект
считается уже приведённым к целевому состоянию.

## Удаление таблиц

```bash
new drop_legacy_tables --recipe=drop-tables \
  --tables=site_old_orders,site_old_rows --apply
```

Имена указываются без `table_prefix`; миграция добавит префикс текущего сайта.

## Пустая заготовка

```bash
new backfill_order_status --recipe=empty --apply
```

Используйте её для данных и проектной логики, которые не покрывает типовой
шаблон. Сохраните правило автономности: весь код, нужный при будущем выполнении,
должен находиться в самом файле.
