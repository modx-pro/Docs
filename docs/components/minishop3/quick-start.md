---
title: Быстрый старт
---
# Быстрый старт

Это руководство поможет вам быстро настроить MiniShop3 и создать первые товары.

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| Composer | 2.x |

### Зависимости

- **pdoTools 3.x** — обязательно для работы сниппетов и шаблонизатора Fenom
- **[Scheduler](/components/scheduler/)** *(опционально)* — для фоновых задач (импорт, уведомления, очистка)

## Установка

### Через менеджер пакетов MODX

1. Перейдите в **Extras → Installer**
2. Нажмите **Download Extras**
3. Найдите **MiniShop3** в каталоге
4. Нажмите **Download** и **Install**

Подробнее о способах установки — на [главной странице документации](index).

## Что происходит при установке

MiniShop3 автоматически:

1. ✅ Создаёт таблицы в базе данных через систему миграций Phinx
2. ✅ Регистрирует сниппеты, плагины и чанки
3. ✅ Устанавливает системные настройки с префиксом `ms3_`
4. ✅ Создаёт статусы заказов по умолчанию
5. ✅ Создаёт способы доставки и оплаты

## Первоначальная настройка

### 1. Системные настройки

Перейдите в **System → System Settings** и найдите настройки с пространством имён `minishop3`:

| Настройка | Описание |
|-----------|----------|
| `ms3_order_redirect_thanks_id` | ID страницы «Спасибо за заказ» |
| `ms3_order_success_page_id` | ID страницы успешной оплаты |
| `ms3_customer_login_page_id` | ID страницы входа |
| `ms3_customer_profile_page_id` | ID страницы профиля |
| `ms3_customer_orders_page_id` | ID страницы истории заказов |

Полный список настроек — на странице [Системные настройки](settings).

### 2. Создание страниц магазина

Создайте следующие страницы:

1. **Корзина** — разместите сниппет `msCart`
2. **Оформление заказа** — разместите сниппет `msOrder`
3. **Личный кабинет** — разместите сниппет `msCustomer`

Укажите ID этих страниц в системных настройках.

### 3. Создание категорий

1. Перейдите в **Resources**
2. Создайте новый ресурс с **Resource Type** = `msCategory`
3. Заполните название и сохраните

### 4. Создание товаров

1. В категории создайте дочерний ресурс
2. Выберите **Resource Type** = `msProduct`
3. Заполните вкладку **Данные товара**:
   - Артикул
   - Цена
   - Вес (опционально)
   - Изображение
4. Сохраните товар

## Вывод каталога

### Простой список товаров

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}
```

### С пагинацией

```fenom
{'pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}

{$_modx->getPlaceholder('page.nav')}
```

### Из конкретной категории

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'depth' => 2,
    'limit' => 12
]}
```

## Корзина

### Минимальный вывод

```fenom
{'!msCart' | snippet}
```

### С кастомным чанком

```fenom
{'!msCart' | snippet : [
    'tpl' => 'myCartTemplate'
]}
```

::: warning Некэшируемый вызов
Сниппет `msCart` работает с сессией и должен вызываться **некэшированно** (с `!`).
:::

## Мини-корзина в шапке

```fenom
{set $cart = '!msOrderTotal' | snippet}

<a href="{'ms3_cart_page' | option}" class="header-cart">
    <span class="cart-count">{$cart.count}</span>
    <span class="cart-total">{$cart.cost}</span> руб.
</a>
```

## Добавление в корзину

### Кнопка добавления

```html
<button type="button"
        data-ms-action="cart/add"
        data-id="123">
    В корзину
</button>
```

### С указанием количества

```html
<form>
    <input type="number" name="count" value="1" min="1">
    <button type="button"
            data-ms-action="cart/add"
            data-id="123">
        В корзину
    </button>
</form>
```

### С опциями товара

```html
<form>
    <select name="options[color]">
        <option value="red">Красный</option>
        <option value="blue">Синий</option>
    </select>
    <select name="options[size]">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
    </select>
    <button type="button"
            data-ms-action="cart/add"
            data-id="123">
        В корзину
    </button>
</form>
```

## Оформление заказа

```fenom
{'!msOrder' | snippet}
```

Сниппет автоматически отображает:
- Список товаров в заказе
- Форму контактных данных
- Выбор доставки и оплаты
- Кнопку оформления

## Следующие шаги

- [Сниппеты](snippets/) — полный справочник по сниппетам
- [Интерфейс](interface/) — описание административного интерфейса
- [REST API](development/api) — интеграция через API
- [События](development/events) — расширение через плагины
