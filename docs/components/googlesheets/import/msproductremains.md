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

## Примеры импорта

### 1. Вариант

**Поля импорта:** id,product_id,options,remains

**Уникальное поле:** id

**Таблица:**

![1. Вариант](https://file.modx.pro/files/9/f/5/9f5b5d30d94f6258825b6f5250ddd4bd.jpg)

### 2. Вариант

**Поля импорта:** id,product_id,options.color,options.size,remains

**Уникальное поле:** id

**Таблица:**

![2. Вариант](https://file.modx.pro/files/4/d/8/4d8e757c7369996cdeb441d0f35ed7aa.jpg)
