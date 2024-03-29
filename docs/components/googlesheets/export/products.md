# Товары (msProduct)

## Поля экспорта

Поддерживаются все стандартные поля ресурса. И еще свои:

| Поле                  | Название              |
| --------------------- | --------------------- |
| price                 | Цена                  |
| old_price             | Старая цена           |
| article               | Артикул               |
| weight                | Вес                   |
| color                 | Список цветов         |
| size                  | Список размеров       |
| vendor                | Производитель (id)    |
| made_in               | Страна                |
| tags                  | Список тегов          |
| new                   | Новый                 |
| favorite              | Особый                |
| popular               | Популярный            |
| categories            | Список категорий (id) |
| images                | Список картинок       |
| option.название_опции | Опции                 |

### Модификации полей

| Поле            | Название                |
| --------------- | ----------------------- |
| vendor_name     | Производитель (name)    |
| categories_name | Список категорий (name) |

## ms2Gallery

| Поле   | Название        |
| ------ | --------------- |
| images | список картинок |

Все файлы картинок должны быть на сервере

## Пример экспорта

**Поля экспорта:** id,article,pagetitle,template_name,price,color,size,vendor_name

**Результат:**

![Результат](https://file.modx.pro/files/f/f/b/ffb1ea453acd93b6409c9415ee516096.jpg)

## Системные события

Класс **gsProduct** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка товаров
  case 'gsOnBeforeGetProducts':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetProducts':
    // $products - массив товаров со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Выбираем продукты с определенным производителем

    1.1 по id производителя:

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetProducts') {
      $query->where(array('Data.vendor' => 8)); // id производителя
    }
    ```

    1.2 по названию производителя

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetProducts') {
      $query->where(array('Vendor.name' => 'Samsung'));
    }
    ```

2. Прибавляем 10% к цене, а текущую цену записываем в старую цену.

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetProducts') {
      $modx->event->params['products'] = array_map(function($product){
          if (isset($product['old_price']) && !empty($product['price'])) {
            $product['old_price'] = $product['price'];
          }
          if (!empty($product['price'])) {
            $product['price'] = $product['price'] * 1.1;
          }
          return $product;
      }, $products);
    }
    ```
