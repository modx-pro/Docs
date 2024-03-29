# События

Доступны следующие события:

## Импорт

- **gsOnBeforeImportValues** - получение данных с таблицы, до форматирования полей
  - `values` - массив значений
- **gsOnImportValues** - получение данных с таблицы после форматирования полей
  - `values` - массив значений

## Экспорт

- **gsOnBeforeExportValues** - массив значений для экспорта до форматирования
  - `values` - массив значений
- **gsOnExportValues** - массив значений для экспорта после форматирования
  - `values` - массив значений

### Ресурсы

- **gsOnBeforeGetResource** - получение списка ресурсов
  - `query` - запрос выборки
- **gsOnGetResource** - готовый список ресурсов
  - `resources` - массив ресурсов

### Категории

- **gsOnBeforeGetCategories** - получение списка категорий
  - `query` - запрос выборки
- **gsOnGetCategories** - готовый список категорий
  - `categories` - массив категорий

### Продукты

- **gsOnBeforeGetProducts** - получение списка продуктов
  - `query` - запрос выборки
- **gsOnGetProducts** - готовый список продуктов
  - `products` - массив продуктов

### Заказы

- **gsOnBeforeGetOrders** - получение списка заказов (minishop2)
  - `query` - запрос выборки
- **gsOnGetOrders** - готовый список заказов (minishop2)
  - `orders` - массив заказов

### Производители

- **gsOnBeforeGetVendors** - получение списка производителей (minishop2)
  - `query` - запрос выборки
- **gsOnGetVendors** - готовый список производителей (minishop2)
  - `vendors` - массив производителей

### Пользователи

- **gsOnBeforeGetUsers** - получение списка пользователей
  - `query` - запрос выборки
- **gsOnGetUsers** - готовый список пользователей
  - `orders` - массив пользователей

### Покупатели

- **gsOnBeforeGetClients** - получение списка покупателей (minishop2)
  - `query` - запрос выборки
- **gsOnGetClients** - готовый список покупателей
  - `users` - массив покупателей

### msOptionsPrice2

- **gsOnBeforeGetOptionsPrice2** - получение списка опций
  - `query` - запрос выборки
- **gsOnGetOptionsPrice2** - готовый список опций
  - `options` - массив опций

### msProductRemains

- **gsOnBeforeGetRemains** - получение списка остатков товаров
  - `query` - запрос выборки
- **gsOnGetRemains** - готовый список остатков товаров
  - `remains` - массив остатков

>Все события еще имеют параметр `range` - название листа таблицы.
