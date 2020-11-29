# msProductRemains

Остатки товара

## Стандартные поля

| Поле       | Название            |
| ---------- | ------------------- |
| id         | id остатка          |
| product_id | id товара           |
| options    | Опции               |
| remains    | Количество остатков |

### Модификации

| Поле                | Название       |
| ------------------- | -------------- |
| options.name_option | Значение опции |

## Примеры экспорта:

### 1.Вариант

**Поля экспорта:** `id,product_id,options,remains`

**Результат:**

![](https://file.modx.pro/files/9/f/5/9f5b5d30d94f6258825b6f5250ddd4bd.jpg)

### 2.Вариант

**Поля экспорта:** `id,product_id,options.color,options.size,remains`

**Результат:**

![](https://file.modx.pro/files/4/d/8/4d8e757c7369996cdeb441d0f35ed7aa.jpg)
