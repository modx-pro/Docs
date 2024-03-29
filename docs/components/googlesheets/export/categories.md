# Категории (msCategory)

## Поля экспорта

Поддерживаются все поля ресурса.

## Системные события

Класс **gsCategory** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка категорий
  case 'gsOnBeforeGetCategories':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetCategories':
    // $categories - массив категорий со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Выбираем категории с определенным родителем

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetCategories') {
      $query->where(array('parent' => 23)); // 23  - id родителя
    }
    ```

2. Меняем значение поля publishedon (миллисекунды => дата)

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetCategories') {
      $modx->event->params['categories'] = array_map(function($category){
        if (!empty($category['publishedon'])) {
          $category['publishedon'] = date("d-m-Y", $category['publishedon']);
        }
        return $category;
      }, $categories);
    }
    ```
