# Собственные шаблоны миграций

Этот раздел нужен разработчикам MODX-компонентов. Ниже `Site` — условное имя
компонента, который поставляет свой шаблон миграции.

Собственный шаблон нужен, когда одно и то же предметное изменение создаётся
регулярно и типового шаблона недостаточно. Например: заполнить данные товара,
снять сущности собственного xPDO-класса или подготовить миграцию импорта.

Шаблон работает **только при генерации**. Его результат — самостоятельный
PHP-файл, который не должен зависеть от дальнейшего существования или версии
класса шаблона.

## Структура

Пусть классы проекта загружаются Composer:

```text
core/components/site/
├── config/migrations.php
├── migrations/
├── src/Migrations/RecipeProvider.php
├── src/Migrations/SeedWarehouseRecipe.php
└── vendor/autoload.php
```

В конфиге подключите autoload и провайдер:

```php
return [
    'id' => 'site',
    'modx_root' => dirname(__DIR__, 4),
    'migrations_path' => __DIR__ . '/../migrations',
    'autoload' => [__DIR__ . '/../vendor/autoload.php'],
    'recipe_providers' => [Site\Migrations\RecipeProvider::class],
];
```

## Класс шаблона

Ниже показан вариант для MODX 2. В линии MODX 3 сигнатура сгенерированной
миграции должна быть
`return function (\MODX\Revolution\modX $modx): void` и классы модели передаются
как FQCN.

```php
<?php

namespace Site\Migrations;

use MxMigrations\Recipe\MigrationRecipeInterface;

final class SeedWarehouseRecipe implements MigrationRecipeInterface
{
    public function getName(): string
    {
        return 'site:seed-warehouse';
    }

    public function getDescription(): string
    {
        return 'добавить склад проекта';
    }

    public function getOptions(): array
    {
        return ['warehouse' => 'код склада'];
    }

    public function render(string $migrationName, array $arguments): string
    {
        $warehouse = trim((string)($arguments['warehouse'] ?? ''));
        if ($warehouse === '') {
            throw new \InvalidArgumentException('Укажите --warehouse=CODE.');
        }

        $code = var_export($warehouse, true);

        return <<<PHP
<?php

/**
 * {$migrationName} — добавить склад {$warehouse}.
 */

return function (modX \$modx): void {
    \$code = {$code};
    \$warehouse = \$modx->getObject('SiteWarehouse', ['code' => \$code]);

    if (\$warehouse) {
        echo 'Склад уже существует.' . PHP_EOL;
        return;
    }

    \$warehouse = \$modx->newObject('SiteWarehouse');
    \$warehouse->set('code', \$code);

    if (!\$warehouse->save()) {
        throw new RuntimeException('Не удалось создать склад ' . \$code . '.');
    }

    echo 'Склад создан.' . PHP_EOL;
};
PHP;
    }
}
```

`render()` получает имя будущего файла и все CLI-параметры, кроме служебных
`recipe`, `apply` и `config`. Метод обязан проверять входные данные до
возврата кода.

## Провайдер

```php
<?php

namespace Site\Migrations;

use MxMigrations\Recipe\MigrationRecipeProviderInterface;

final class RecipeProvider implements MigrationRecipeProviderInterface
{
    public function getRecipes(): array
    {
        return [
            new SeedWarehouseRecipe(),
        ];
    }
}
```

После подключения шаблон появится в общем списке:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/components/site/config/migrations.php \
  recipe:help site:seed-warehouse
```

Генерация:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/components/site/config/migrations.php \
  new seed_main_warehouse \
  --recipe=site:seed-warehouse \
  --warehouse=main \
  --apply
```

## Правила имён

Имя шаблона может состоять из латинских букв нижнего регистра, цифр, `_` и `-`.
Допускается один namespace через двоеточие:

```text
site:seed-warehouse
```

Для собственных шаблонов используйте префикс `<project>:`. Повторная регистрация
одного имени — ошибка; проект не может незаметно заменить готовый шаблон пакета.

## Автономность результата

Нельзя генерировать такую миграцию (пример для MODX 2):

```php
return function (modX $modx): void {
    Site\Migrations\CurrentHelper::seed($modx);
};
```

К моменту применения класс может измениться или исчезнуть. Вместо этого шаблон
должен встроить необходимые значения и логику в возвращаемую строку PHP.

Допустимы зависимости, являющиеся частью целевой среды миграции: MODX, xPDO-класс
устанавливаемого компонента или внешний пакет, наличие которого миграция явно
проверяет.

## Что тестировать

Минимальный тест собственного шаблона должен подтвердить, что:

1. обязательные параметры проверяются;
2. результат проходит `php -l`;
3. сгенерированный файл не содержит имя класса шаблона или временного helper;
4. повторное выполнение приводит к тому же целевому состоянию;
5. конфликт имени обнаруживается при создании реестра.
