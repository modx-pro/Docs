# Правила (Rules)

Правила определяют, к каким товарам корзины применяется скидка при `discount_scope = matching`. Реализованы как стратегии в `ms3PromoCode\Rules\`.

## Структура rules

В БД (поле `ms3_promo_codes.rules`) правила хранятся как JSON:

```json
{
    "product_ids": [12, 34, 56],
    "exclude_product_ids": [78],
    "parent_ids": [101, 102],
    "exclude_parent_ids": [],
    "vendor_ids": [5, 7],
    "product_data_rules": [
        {"field": "price",     "op": ">=", "value":  1000},
        {"field": "vendor_id", "op": "IN", "values": [5, 7]}
    ],
    "product_option_rules": [
        {"key": "color", "values": ["red", "blue"]}
    ]
}
```

Ключи, не привязанные к зарегистрированным правилам, молча игнорируются — ошибку движок не поднимает.

## Логика комбинирования

- **Между секциями** — AND. Товар должен пройти все непустые секции.
- **Внутри секций-списков** (`product_ids`, `exclude_product_ids`, `parent_ids`, `exclude_parent_ids`, `vendor_ids`) — OR. Товар проходит секцию, если его id совпадает хотя бы с одним значением списка (для `exclude_*` — наоборот).
- **Внутри `product_data_rules` и `product_option_rules`** клаузы объединяются **AND**: товар проходит секцию, только если выполнены все клаузы. OR действует только внутри одной клаузы — через массив `values` (операторы `IN` и `CONTAINS` в `product_data_rules`; поле `values` в `product_option_rules`). `BETWEEN` принимает массив из двух значений как диапазон, не как OR.
- **Пустая секция** — игнорируется (не учитывается в AND).

Пример: `vendor_ids: [5, 7]` + `product_data_rules: [{price >= 1000}]` означает «товары брендов 5 ИЛИ 7, И с ценой >= 1000».

## Встроенные стратегии

| Класс                                          | Секция                  | Описание                                                       |
|------------------------------------------------|-------------------------|----------------------------------------------------------------|
| `ms3PromoCode\Rules\ProductIdsRule`            | `product_ids`           | Включить только указанные ID товаров                           |
| `ms3PromoCode\Rules\ExcludeProductIdsRule`     | `exclude_product_ids`   | Исключить указанные ID                                         |
| `ms3PromoCode\Rules\ParentIdsRule`             | `parent_ids`            | Товары из указанных категорий. Проверяется и `parent` ресурса, и запись в `msCategoryMember` (связь многие-ко-многим) |
| `ms3PromoCode\Rules\ExcludeParentIdsRule`      | `exclude_parent_ids`    | Товары НЕ из указанных категорий (та же двойная проверка, с инверсией) |
| `ms3PromoCode\Rules\VendorIdsRule`             | `vendor_ids`            | Товары с `msProductData.vendor_id` из списка                   |
| `ms3PromoCode\Rules\ProductDataRule`           | `product_data_rules`    | Универсальный фильтр по полям `modx_ms3_products`              |
| `ms3PromoCode\Rules\ProductOptionRule`         | `product_option_rules`  | Фильтр по опциям товара (`modx_ms3_product_options`)           |

## ProductDataRule — операторы

Фильтр по любому полю карточки товара. Форма клаузы: `{"field": "...", "op": "...", "value": ... | "values": [...]}`.

| Оператор   | Ключ значения     | Пример клаузы                                                 |
|------------|-------------------|---------------------------------------------------------------|
| `=`        | `value`           | `{"field": "vendor_id", "op": "=", "value": 5}`               |
| `!=`, `<>` | `value`           | `{"field": "made_in", "op": "!=", "value": "China"}`          |
| `<`, `<=`  | `value` (число)   | `{"field": "price", "op": "<=", "value": 5000}`               |
| `>`, `>=`  | `value` (число)   | `{"field": "stock", "op": ">", "value": 0}`                   |
| `IN`       | `values` (массив) | `{"field": "vendor_id", "op": "IN", "values": [5, 7]}`        |
| `NOT IN`   | `values` (массив) | `{"field": "vendor_id", "op": "NOT IN", "values": [3]}`       |
| `BETWEEN`  | `values` (`[min, max]`) | `{"field": "price", "op": "BETWEEN", "values": [1000, 5000]}` |
| `LIKE`     | `value` (строка)  | `{"field": "article", "op": "LIKE", "value": "AP%"}`          |
| `CONTAINS` | `values` (массив) | `{"field": "tags", "op": "CONTAINS", "values": ["sale", "new"]}` |

Поведение операторов:

- **`!=` и `<>`** — синонимы.
- **`LIKE`** — шаблон применяется ко всей строке целиком. По задумке: `%` → любая подстрока, `_` → один символ.
  ::: warning Известный баг
  В текущей реализации `LIKE` символы-шаблоны `%` и `_` ищутся как **литералы** (отслеживается в [BACKLOG](https://github.com/biz87/ms3PromoCode/blob/main/BACKLOG.md)). До исправления оператор полезен только для точного равенства; для частичного совпадения — `CONTAINS` на JSON-поле или `=` на точном значении.
  :::
- **`CONTAINS`** — проверяет пересечение значений с полем-массивом (JSON): `tags`, `color`, `size` и подобные. По подстроке не ищет — для текстового поиска используйте `LIKE`.
- **Неизвестный `op`** — клауза возвращает `false`, а с ней и вся секция `product_data_rules`.

Доступные поля — все колонки `modx_ms3_products`; актуальный список выдаёт процессор `Mgr/ProductData/GetFields`. Фильтр по `vendor_id` эквивалентен секции `vendor_ids`.

## ProductOptionRule

Опции товаров MS3 хранятся в отдельной таблице (`modx_ms3_product_options`). Структура клаузы:

```json
{
    "key": "color",
    "values": ["red", "blue", "green"]
}
```

| Поле     | Тип           | Описание                                                       |
|----------|---------------|----------------------------------------------------------------|
| `key`    | строка        | Ключ опции (например, `color`, `size`, `material`)             |
| `values` | массив строк  | Значения опции. Клауза проходит, если у товара есть хотя бы одно из перечисленных (OR внутри клаузы). Одиночная строка не принимается — только массив |

## Создание собственного типа правила

Чтобы добавить своё правило (например, фильтр по тегам, по складу, по цене со скидкой), реализуйте класс по контракту `RuleInterface` и зарегистрируйте его через переопределение DI.

### Шаг 1: создать класс правила

```php
<?php
namespace MyComponent\Rules;

use MiniShop3\Model\msProduct;
use ms3PromoCode\Rules\RuleInterface;

class ByTagRule implements RuleInterface
{
    public function getKey(): string
    {
        return 'tags';
    }

    /**
     * @param array<string, mixed> $rules Полный объект rules из промо-кода
     */
    public function matches(msProduct $product, array $rules): bool
    {
        $wanted = $rules[$this->getKey()] ?? null;
        if (!is_array($wanted) || $wanted === []) {
            return true; // секция пуста или отсутствует — правило неактивно
        }

        $productTags = $product->get('tags');
        if (!is_array($productTags)) {
            return false;
        }

        // Подходит, если есть хотя бы одно пересечение
        return (bool) array_intersect($productTags, $wanted);
    }
}
```

Правило само достаёт свой срез из полного `$rules` через `getKey()` — движок передаёт весь JSON как есть.

### Шаг 2: подключить правило в RuleEngine

У `RuleEngine` нет публичного `register()` — набор стратегий задаётся через конструктор. Чтобы добавить своё правило, переопределите DI-регистрацию `ms3promocode_rule_engine` в своём плагине (на событии `OnMODXInit` или другом раннем) **после** `bootstrap.php` ms3PromoCode:

```php
use ms3PromoCode\Services\RuleEngine;
use ms3PromoCode\Rules\{
    ProductIdsRule, ExcludeProductIdsRule,
    ParentIdsRule, ExcludeParentIdsRule,
    VendorIdsRule, ProductDataRule, ProductOptionRule,
};

$modx->services->add('ms3promocode_rule_engine', function () {
    return new RuleEngine([
        new ProductIdsRule(),
        new ExcludeProductIdsRule(),
        new ParentIdsRule(),
        new ExcludeParentIdsRule(),
        new VendorIdsRule(),
        new ProductDataRule(),
        new ProductOptionRule(),
        new \MyComponent\Rules\ByTagRule(),
    ]);
});
```

Теперь в `rules` JSON можно использовать секцию `tags`:

```json
{
    "tags": ["sale", "new", "popular"]
}
```

::: tip Публичный `register()` в будущем
Такой метод записан в [BACKLOG компонента](https://github.com/biz87/ms3PromoCode/blob/main/BACKLOG.md). После его появления рецепт сократится до одной строки `$engine->register(new ByTagRule())`. До тех пор — переопределение DI.
:::

### Шаг 3 (опционально): добавить редактор в Vue-админку

Vue-редактор работает с фиксированным набором секций. Простого способа добавить свой компонент сейчас нет: папка переопределений `assets/components/ms3promocode-overrides/` подменяет только фронтенд-ассеты (их регистрирует плагин на `OnLoadWebDocument`), а Vue-бандл админки — `assets/components/ms3promocode/js/mgr/vue-dist/ms3promocode.min.js` — подключает контроллер `controllers/mgr/home.class.php` напрямую, минуя этот механизм.

Варианты:

- Править секцию напрямую в JSON поля `rules` промо-кода (из своего плагина или скриптом).
- Форкнуть `vueManager/` и собрать свою версию с новой секцией — тогда нужно подменить `ms3promocode.min.js` целиком, не через переопределения.

::: tip
Если ваше правило универсально и может быть полезно другим — сделайте PR в [репозиторий ms3PromoCode](https://github.com/biz87/ms3PromoCode).
:::

## RuleInterface

```php
<?php
namespace ms3PromoCode\Rules;

use MiniShop3\Model\msProduct;

interface RuleInterface
{
    /**
     * Ключ верхнего уровня в rules JSON, который читает это правило
     * (например, "product_ids", "vendor_ids", "product_data_rules").
     */
    public function getKey(): string;

    /**
     * Проверить, подходит ли товар под правило.
     *
     * @param array<string, mixed> $rules Полный объект rules; срез по своей
     *                                    секции правило берёт само через getKey().
     */
    public function matches(msProduct $product, array $rules): bool;
}
```

Контракт: если `$rules[getKey()]` отсутствует или пуст, правило возвращает `true` (неактивно). Все семь встроенных стратегий работают по этой же схеме — см. `src/Rules/*.php`.

## Производительность

Правила проверяются для каждого товара корзины при каждом применении и пересчёте кода. На корзинах 5–20 позиций — мгновенно. На корзинах от 100 позиций со сложными правилами (`LIKE` по большому полю) работа заметно замедлится — тогда кэшируйте результат отбора на уровне сессии.
