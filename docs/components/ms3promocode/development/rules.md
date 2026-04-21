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
        {"field": "price", "operator": ">=", "value": 1000},
        {"field": "vendor", "operator": "IN", "value": [5, 7]}
    ],
    "product_option_rules": [
        {"key": "color", "value": ["red", "blue"]}
    ]
}
```

## Логика комбинирования

- **Между секциями** — AND. Товар должен пройти все непустые секции.
- **Внутри одной секции** — OR. Товар проходит секцию, если совпадает хотя бы одно значение.
- **Пустая секция** — игнорируется (не учитывается в AND).

Пример: `vendor_ids: [5, 7]` + `product_data_rules: [{price >= 1000}]` означает «товары брендов 5 ИЛИ 7, И с ценой >= 1000».

## Встроенные стратегии

| Класс                                          | Секция                  | Описание                                                       |
|------------------------------------------------|-------------------------|----------------------------------------------------------------|
| `ms3PromoCode\Rules\ProductIdsRule`            | `product_ids`           | Включить только указанные ID товаров                           |
| `ms3PromoCode\Rules\ExcludeProductIdsRule`     | `exclude_product_ids`   | Исключить указанные ID                                         |
| `ms3PromoCode\Rules\ParentIdsRule`             | `parent_ids`            | Только товары из указанных категорий                           |
| `ms3PromoCode\Rules\ExcludeParentIdsRule`      | `exclude_parent_ids`    | НЕ из указанных категорий                                      |
| `ms3PromoCode\Rules\VendorIdsRule`             | `vendor_ids`            | Только указанные бренды                                        |
| `ms3PromoCode\Rules\ProductDataRule`           | `product_data_rules`    | Универсальный фильтр по полям `modx_ms3_products`              |
| `ms3PromoCode\Rules\ProductOptionRule`         | `product_option_rules`  | Фильтр по опциям товара                                        |

## ProductDataRule — операторы

Это самая мощная секция — позволяет фильтровать по любому полю карточки товара.

| Оператор   | Тип значения       | Пример использования                                   |
|------------|--------------------|--------------------------------------------------------|
| `=`        | scalar             | `{"field": "vendor", "operator": "=", "value": 5}`     |
| `!=`       | scalar             | `{"field": "color", "operator": "!=", "value": "red"}` |
| `<`, `<=`  | number             | `{"field": "price", "operator": "<=", "value": 5000}`  |
| `>`, `>=`  | number             | `{"field": "stock", "operator": ">", "value": 0}`      |
| `IN`       | array              | `{"field": "vendor", "operator": "IN", "value": [5, 7]}` |
| `NOT IN`   | array              | `{"field": "vendor", "operator": "NOT IN", "value": [3]}` |
| `BETWEEN`  | array из 2 значений| `{"field": "price", "operator": "BETWEEN", "value": [1000, 5000]}` |
| `LIKE`     | string             | `{"field": "article", "operator": "LIKE", "value": "AP%"}` |
| `CONTAINS` | string             | `{"field": "pagetitle", "operator": "CONTAINS", "value": "Apple"}` |

Доступные поля — все колонки таблицы `modx_ms3_products` (см. `Mgr/ProductData/GetFields` процессор для актуального списка).

## ProductOptionRule

Опции товаров MS3 хранятся в отдельной таблице (`modx_ms3_product_options`). Структура секции:

```json
{
    "key": "color",
    "value": ["red", "blue", "green"]
}
```

| Поле   | Тип         | Описание                                                       |
|--------|-------------|----------------------------------------------------------------|
| `key`  | string      | Ключ опции (например, `color`, `size`, `material`)             |
| `value`| string или array | Значения. Массив = OR (любое из перечисленного)            |

## Создание собственного типа правила

Чтобы добавить новую логику фильтрации (например, по тегам, по складу, по цене со скидкой и т.п.), реализуйте класс по контракту `RuleInterface`.

### Шаг 1: создать класс правила

```php
<?php
namespace MyComponent\Rules;

use MiniShop3\Model\msProduct;
use ms3PromoCode\Rules\RuleInterface;

class ByTagRule implements RuleInterface
{
    /**
     * @param msProduct $product Проверяемый товар
     * @param mixed     $config  Значение из rules JSON для этой секции
     * @return bool             Подходит ли товар
     */
    public function match(msProduct $product, $config): bool
    {
        if (!is_array($config) || $config === []) {
            return true;  // пустая секция — пропускаем
        }

        $productTags = $product->get('tags');
        if (!is_array($productTags)) {
            return false;
        }

        // OR-логика: подходит, если есть хотя бы одно совпадение
        return (bool) array_intersect($productTags, $config);
    }
}
```

### Шаг 2: зарегистрировать в RuleEngine

В своём плагине на событии `OnMODXInit` или в любом другом раннем хуке:

```php
/** @var \ms3PromoCode\Services\RuleEngine $engine */
$engine = $modx->services->get('ms3promocode_rule_engine');

$engine->register('tags', new \MyComponent\Rules\ByTagRule());
```

Теперь в `rules` JSON можно использовать секцию `tags`:

```json
{
    "tags": ["sale", "new", "popular"]
}
```

### Шаг 3 (опционально): добавить редактор в Vue-админку

Сейчас Vue-редактор знает о фиксированном наборе секций. Чтобы добавить UI для своей секции:

- Создайте свой Vue-компонент (например, `TagsSection.vue`).
- Соберите его в свой бандл и подмените файл в overrides-папке `assets/components/ms3promocode-overrides/js/mgr/vue-dist/`.

Это сложнее — обычно проще править JSON в БД напрямую или через свой плагин.

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
     * Проверить, подходит ли товар под конфигурацию правила.
     *
     * @param msProduct $product Проверяемый товар MS3
     * @param mixed     $config  Значение из секции rules (массив, скаляр, объект)
     * @return bool
     */
    public function match(msProduct $product, $config): bool;
}
```

## Производительность

Правила вычисляются для каждого товара корзины при каждом применении / пересчёте кода. Для типичных корзин (5–20 позиций) это работает мгновенно. Для очень больших корзин (100+ позиций) и сложных правил (LIKE по большому полю) — может стать медленно. Если столкнётесь с этим — рассмотрите вариант кэширования matching-результата на уровне сессии.
