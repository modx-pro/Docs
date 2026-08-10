# XML-схемы и модели xPDO

mxMigrations может вести несколько моделей одного сайта: собственные таблицы,
miniShop и другие пакеты настраиваются отдельными записями `models`.

## Конфигурация

Для каждой модели задаются два фактических пути:

```php
'models' => [
    'site' => [
        'schema_path' => dirname(__DIR__) . '/components/site/model/schema/site.mysql.schema.xml',
        'model_path' => dirname(__DIR__) . '/components/site/model/site',
    ],
    'minishop2' => [
        'schema_path' => dirname(__DIR__) . '/components/minishop2/model/schema/minishop2.mysql.schema.xml',
        'model_path' => dirname(__DIR__) . '/components/minishop2/model/minishop2',
        'overlay' => true,
    ],
],
```

- `schema_path` — исходная XML-схема xPDO;
- `model_path` — каталог готовой модели;
- `overlay` — схема принадлежит стороннему пакету и не должна редактироваться.

В MODX 3 `model_path` обычно указывает на `src/Model`. Namespace и относительный
путь генератор получает из `package` в XML.

## Создание миграции

Шаблоны `add-column`, `modify-column`, `drop-column`, `add-index` и `drop-index`
ищут указанную таблицу во всех настроенных схемах:

```bash
new add_external_id --recipe=add-column \
  --table=ms2_orders --column=external_id \
  --type="VARCHAR(64) NULL" --apply
```

Если `ms2_orders` есть только в схеме miniShop2, изменение связывается с моделью
`minishop2`. Если одна таблица описана в нескольких схемах, выбор нужно указать
явно: `--model=minishop2`.

Для собственной модели команда обновляет XML. Для модели с `overlay` исходная
схема пакета остаётся нетронутой, а операция записывается в проектный файл
`migrations/.mxmigrations/model-changes.php`. Этот файл хранится в репозитории
сайта вместе с миграциями.

## Сборка модели

Действующая модель не меняется при создании миграции. Сначала примените базу:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php up
```

Затем посмотрите изменения модели и запишите их:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php model:build

php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php model:build --apply
```

Пока связанная миграция остаётся `pending`, сборка остановится. Это не позволяет
новой map начать запрашивать колонку, которой ещё нет в базе.

Сборка проходит во временном каталоге и записывает только платформенные файлы
модели. В MODX 2 это `metadata.mysql.php` и содержимое каталога `mysql/`:
классы вне `mysql/` команда не создаёт и не перезаписывает. В MODX 3 обновляются
сгенерированные классы в настроенном `src/Model` согласно структуре xPDO 3.

## После обновления стороннего пакета

Обновление miniShop может заменить его XML и готовую модель. Проектный overlay
при этом остаётся в каталоге миграций. После обновления снова выполните:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php model:build --apply
```

Команда возьмёт новую штатную схему, повторно наложит проектные изменения и
пересоберёт metadata/map.

## Порядок выкладки

Миграция, XML, overlay и готовая модель должны попадать в один коммит. На сервере
сначала применяют миграции БД, затем активируют новую модель. Если файлы
копируются прямо поверх работающего сайта, для несовместимого удаления колонок
нужен технический режим или двухэтапное изменение.
