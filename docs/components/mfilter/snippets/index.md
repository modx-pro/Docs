# Сниппеты

mFilter предоставляет два основных сниппета для работы с фильтрацией.

## Обзор

| Сниппет | Назначение |
|---------|------------|
| [mFilter](mfilter) | Вывод отфильтрованных результатов |
| [mFilterForm](mfilterform) | Рендеринг формы фильтров |

## Типичное использование

```fenom
{* Форма фильтров в сайдбаре *}
<aside>
    {'!mFilterForm' | snippet}
</aside>

{* Результаты фильтрации *}
<main>
    {'!mFilter' | snippet : [
        'element' => 'msProducts',
        'paginator' => 'pdoPage',
        'parents' => $_modx->resource.id,
        'limit' => 24
    ]}

    {$_modx->getPlaceholder('page.nav')}
</main>
```

## Режимы работы

### Element/Paginator режим (рекомендуемый)

Делегирует получение и рендеринг данных внешним сниппетам:

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',      {* Сниппет для данных *}
    'paginator' => 'pdoPage',       {* Сниппет для пагинации *}
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}
```

**Как это работает:**

1. mFilter получает все ID товаров через `element` с `returnIds=1`
2. Применяет фильтры к этим ID
3. Передаёт отфильтрованные ID в `paginator`
4. `paginator` вызывает `element` для рендеринга

### Legacy режим

mFilter сам выполняет запросы и рендеринг (без внешних сниппетов):

```fenom
{'!mFilter' | snippet : [
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'product.row',
    'class' => 'msProduct'
]}
```

Используется когда нужен полный контроль над запросом.

## AJAX

Оба сниппета поддерживают AJAX-обновление без перезагрузки страницы.

### Автоматический AJAX

По умолчанию включён. Форма отправляется через JavaScript, результаты обновляются динамически.

### Отключение AJAX

```fenom
{'!mFilterForm' | snippet : ['ajax' => 0]}
{'!mFilter' | snippet : ['ajax' => 0]}
```

### Режимы AJAX

| Режим | Описание |
|-------|----------|
| `form` | Отправка по нажатию кнопки |
| `instant` | Отправка при изменении любого фильтра |

```fenom
{'!mFilterForm' | snippet : ['ajaxMode' => 'instant']}
```
