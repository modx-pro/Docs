# Сортировка значений фильтра

Управление порядком отображения значений в фильтрах.

## Уровни сортировки

Сортировка значений настраивается на двух уровнях:

1. **Конфигурация фильтра** (в наборе фильтров) — настройки в JSON
2. **Параметры сниппета** mFilterForm — переопределение для вывода

## Порядок по умолчанию

По умолчанию значения сортируются **по количеству товаров (DESC)** — сначала популярные значения.

## Настройки в конфигурации фильтра

В админке **mFilter → Наборы фильтров** можно указать параметры сортировки для каждого фильтра:

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Цвет",
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### Параметры сортировки

| Параметр | Описание | Значения |
|----------|----------|----------|
| `sort` | Поле сортировки | `count` (по умолчанию), `value` |
| `sort_dir` | Направление | `desc` (по умолчанию), `asc` |
| `selected_first` | Выбранные вверху | `true`, `false` |
| `pinned` | Закреплённые значения | Массив значений |
| `custom_order` | Полный кастомный порядок | Массив значений |

## Примеры конфигурации

### По алфавиту (А-Я)

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Бренд",
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### По алфавиту (Я-А)

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Бренд",
        "sort": "value",
        "sort_dir": "desc"
    }
}
```

### По количеству товаров (больше → меньше)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "label": "Цвет",
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

### По количеству товаров (меньше → больше)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "label": "Цвет",
        "sort": "count",
        "sort_dir": "asc"
    }
}
```

### Выбранные значения вверху

Активированные пользователем значения поднимаются наверх списка:

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Размер",
        "sort": "value",
        "sort_dir": "asc",
        "selected_first": true
    }
}
```

### Закреплённые значения

Определённые значения всегда вверху, остальные сортируются стандартно:

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Бренд",
        "pinned": ["Apple", "Samsung", "Xiaomi"],
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

Результат:
1. Apple
2. Samsung
3. Xiaomi
4. (остальные по убыванию количества)

### Полностью кастомный порядок

Явно задаём порядок всех значений:

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Размер",
        "custom_order": ["XS", "S", "M", "L", "XL", "XXL"]
    }
}
```

Значения, не указанные в `custom_order`, добавляются в конец.

## Параметры сниппета mFilterForm

### sortByCount

Переопределяет сортировку — значения с большим количеством товаров вверху:

```fenom
{'!mFilterForm' | snippet : [
    'resourceId' => $_modx->resource.id,
    'sortByCount' => 1
]}
```

::: warning Приоритет
Параметр `sortByCount` в сниппете применяется **после** сортировки из конфигурации фильтра и переопределяет её.
:::

### hideZero

Скрывает значения с нулевым количеством товаров:

```fenom
{'!mFilterForm' | snippet : [
    'resourceId' => $_modx->resource.id,
    'hideZero' => 1
]}
```

По умолчанию `hideZero` = `true`.

## Комбинирование настроек

### Бренды: популярные + алфавит

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Бренд",
        "pinned": ["Apple", "Samsung"],
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

Результат:
1. Apple (закреплён)
2. Samsung (закреплён)
3. ASUS (алфавит)
4. Dell (алфавит)
5. HP (алфавит)
6. ...

### Размеры: кастомный порядок + выбранные вверху

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Размер",
        "custom_order": ["XS", "S", "M", "L", "XL", "XXL"],
        "selected_first": true
    }
}
```

## Порядок применения

Сортировка применяется в следующем порядке:

1. **custom_order** — если указан, полностью определяет порядок
2. **sort + sort_dir** — стандартная сортировка (если нет custom_order)
3. **selected_first** — выбранные поднимаются вверх
4. **pinned** — закреплённые значения перемещаются в начало
5. **sortByCount** (сниппет) — финальная пересортировка по количеству

## Натуральная сортировка

Для поля `value` используется **натуральная сортировка** (`strnatcasecmp`), что корректно сортирует числа в строках:

- Обычная: `1, 10, 2, 20, 3`
- Натуральная: `1, 2, 3, 10, 20`

Это важно для размеров (`S, M, L, XL`) и числовых значений в строках.

## Примеры для разных типов фильтров

### Цвета — по популярности

```json
{
    "color": {
        "type": "colors",
        "source": "option",
        "label": "Цвет",
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

### Производители — алфавит с топ-3 вверху

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Производитель",
        "pinned": ["Apple", "Samsung", "Sony"],
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### Годы — от новых к старым

```json
{
    "year": {
        "type": "year",
        "source": "field",
        "field": "publishedon",
        "label": "Год",
        "sort": "value",
        "sort_dir": "desc"
    }
}
```

### Размеры одежды — кастомный порядок

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "field": "size",
        "label": "Размер",
        "custom_order": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    }
}
```
