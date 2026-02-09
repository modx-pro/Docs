# msProductRemains

Product stock

## Standard fields

| Field      | Name            |
| ---------- | ------------------- |
| id         | Stock id          |
| product_id | product id           |
| options    | Options               |
| remains    | Stock quantity |

### Modifiers

| Field               | Name       |
| ------------------- | -------------- |
| options.name_option | Option value |

## Export examples

### 1. Variant

**Export fields:** id,product_id,options,remains

**Result:**

![1. Variant](https://file.modx.pro/files/9/f/5/9f5b5d30d94f6258825b6f5250ddd4bd.jpg)

### 2.Variant

**Export fields:** id,product_id,options.color,options.size,remains

**Result:**

![2.Variant](https://file.modx.pro/files/4/d/8/4d8e757c7369996cdeb441d0f35ed7aa.jpg)
