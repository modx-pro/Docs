---
title: Корзина
---
# Корзина

Корзина покупок — ключевой элемент интернет-магазина. MiniShop3 предоставляет гибкую систему для отображения корзины в любом месте сайта.

[![](https://file.modx.pro/files/3/f/b/3fb27bc4fb74bcbbfad003ba2165498cs.jpg)](https://file.modx.pro/files/3/f/b/3fb27bc4fb74bcbbfad003ba2165498c.png)

## Множественные корзины на странице

MiniShop3 позволяет размещать **неограниченное количество корзин** на одной странице. Каждая корзина может иметь свой шаблон и автоматически обновляться при изменении содержимого.

Ключевой параметр — `selector`. Он указывает CSS-селектор элемента-обёртки, содержимое которого будет автоматически обновляться при операциях с корзиной.

### Пример: основная корзина и мини-корзина в шапке

```fenom
{* Мини-корзина в шапке сайта *}
<div id="header-mini-cart">
    {'!msCart' | snippet : [
        'tpl' => 'tpl.msMiniCart',
        'selector' => '#header-mini-cart',
        'includeThumbs' => 'small'
    ]}
</div>

{* Основная корзина на странице *}
<div id="main-cart">
    {'!msCart' | snippet : [
        'tpl' => 'tpl.msCart',
        'selector' => '#main-cart',
        'includeThumbs' => 'medium'
    ]}
</div>
```

При добавлении товара или изменении количества **обе корзины обновятся автоматически** — каждая со своим шаблоном.

::: tip Как это работает
При вызове сниппета с параметром `selector` MiniShop3 регистрирует связку «токен → селектор» в JavaScript. Когда пользователь выполняет действие с корзиной, сервер перерисовывает HTML для каждого зарегистрированного токена и возвращает его на клиент, где JavaScript обновляет соответствующие DOM-элементы.
:::

## JavaScript-скрипты корзины

Работа корзины на фронтенде обеспечивается набором JavaScript-модулей:

| Файл | Назначение |
|------|------------|
| `js/web/ms3.js` | Главный объект `ms3`, инициализация всех модулей |
| `js/web/core/CartAPI.js` | API-клиент для операций с корзиной (add, remove, change, clean) |
| `js/web/ui/CartUI.js` | UI-обработчики: кнопки +/-, удаление, автообновление HTML |
| `js/web/core/TokenManager.js` | Управление токеном авторизации корзины |
| `js/web/core/ApiClient.js` | HTTP-клиент для запросов к серверу |

### Подключение скриптов

Скрипты подключаются автоматически плагином MiniShop3 на страницах, где вызываются сниппеты корзины или оформления заказа.

Для ручного подключения:

```html
<script src="/assets/components/minishop3/js/web/ms3.min.js"></script>
```

### Событие готовности

После инициализации MiniShop3 генерирует событие:

```javascript
document.addEventListener('ms3:ready', function() {
    console.log('MiniShop3 готов к работе');
});
```

### Событие обновления корзины

При любом изменении корзины:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Корзина обновлена:', e.detail);
    // e.detail содержит данные корзины: products, total
});
```

## Состав корзины и доступные поля

### Базовые поля товара в корзине

Каждый товар в корзине содержит:

| Поле | Описание |
|------|----------|
| `product_key` | Уникальный ключ позиции в корзине |
| `product_id` | ID товара (ресурса MODX) |
| `count` | Количество |
| `price` | Цена за единицу |
| `cost` | Стоимость позиции (price × count) |
| `weight` | Вес за единицу |
| `old_price` | Старая цена (если есть скидка) |
| `discount_price` | Размер скидки на единицу |
| `discount_cost` | Скидка на позицию |
| `pagetitle` | Название товара |
| `article` | Артикул |
| `options` | Массив выбранных опций |

### Итоговые значения

| Поле | Описание |
|------|----------|
| `total.count` | Общее количество товаров |
| `total.positions` | Количество позиций (уникальных товаров) |
| `total.cost` | Общая стоимость |
| `total.weight` | Общий вес |
| `total.discount` | Сумма скидок |

### Добавление изображений

Для вывода изображений товаров используйте параметр `includeThumbs`:

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small'
]}
```

В чанке будет доступно поле `thumb`:

```fenom
{foreach $products as $product}
    {if $product.thumb?}
        <img src="{$product.thumb}" alt="{$product.pagetitle}">
    {/if}
{/foreach}
```

Для нескольких размеров:

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small,medium,large'
]}

{* В чанке *}
<img src="{$product.small}" alt="">  {* Маленькое превью *}
<img src="{$product.medium}" alt=""> {* Среднее превью *}
```

### Добавление TV-параметров

Для вывода TV-полей товаров используйте параметр `includeTVs`:

```fenom
{'!msCart' | snippet : [
    'includeTVs' => 'brand,material,country'
]}
```

В чанке TV доступны напрямую:

```fenom
{foreach $products as $product}
    <p>Бренд: {$product.brand}</p>
    <p>Материал: {$product.material}</p>
    <p>Страна: {$product.country}</p>
{/foreach}
```

### Добавление опций товара

Опции, выбранные при добавлении товара в корзину, доступны двумя способами:

**1. Массив `options`:**

```fenom
{if $product.options?}
    {foreach $product.options as $name => $value}
        <span>{$name}: {$value}</span>
    {/foreach}
{/if}
```

**2. Отдельные поля с префиксом `option_`:**

```fenom
{if $product.option_size?}
    <span>Размер: {$product.option_size}</span>
{/if}
{if $product.option_color?}
    <span>Цвет: {$product.option_color}</span>
{/if}
```

### Данные производителя

Если у товара указан производитель, его данные доступны с префиксом `vendor.`:

```fenom
{if $product.vendor.name?}
    <p>Производитель: {$product.vendor.name}</p>
    {if $product.vendor.logo?}
        <img src="{$product.vendor.logo}" alt="{$product.vendor.name}">
    {/if}
{/if}
```

## Готовые чанки

MiniShop3 включает два готовых чанка для вывода корзины:

### tpl.msCart — полная корзина

[![](https://file.modx.pro/files/d/0/f/d0f58a2c70961d54036548714c0239c5.png)](https://file.modx.pro/files/d/0/f/d0f58a2c70961d54036548714c0239c5.png)

Табличный вывод со всеми элементами управления:

- Изображение товара
- Название со ссылкой
- Выбор опций (цвет, размер)
- Кнопки изменения количества (+/-)
- Удаление товара
- Итоговая строка

```fenom
{'!msCart' | snippet : [
    'tpl' => 'tpl.msCart',
    'includeThumbs' => 'small'
]}
```

### tpl.msMiniCart — компактная корзина

[![](https://file.modx.pro/files/b/e/3/be30d2bee57c7d32dad132bc3e4727cc.png)](https://file.modx.pro/files/b/e/3/be30d2bee57c7d32dad132bc3e4727cc.png)

Упрощённый вид для шапки сайта или сайдбара:

- Компактный список товаров
- Кнопка перехода на страницу корзины

```fenom
{'!msCart' | snippet : [
    'tpl' => 'tpl.msMiniCart',
    'includeThumbs' => 'small'
]}
```

::: info Кастомизация
Скопируйте стандартный чанк и создайте свой с нужным именем. Затем укажите его в параметре `tpl`. Стандартные чанки используют Bootstrap 5, но вы можете адаптировать вёрстку под любой CSS-фреймворк.
:::

## Демо-шаблон страницы корзины

В комплекте MiniShop3 поставляется готовый демо-шаблон страницы корзины:

```
core/components/minishop3/elements/templates/cart.tpl
```

Шаблон демонстрирует рекомендуемую структуру страницы корзины и включает:

- **Хлебные крошки** — навигация по сайту
- **Заголовок страницы** — с иконкой и описанием из `introtext`
- **Вызов сниппета msCart** — с параметром `selector` для автообновления
- **Кнопки действий** — «Продолжить покупки» и «Оформить заказ» (автоматически скрываются при пустой корзине)
- **Блок преимуществ** — информация о доставке, гарантии и оплате
- **CSS-стили** — оформление корзины и адаптивность
- **JavaScript** — логика отображения кнопок в зависимости от состояния корзины

[![](https://file.modx.pro/files/0/9/9/0994afcf57549c2c6ace871886a8c3aa.png)](https://file.modx.pro/files/0/9/9/0994afcf57549c2c6ace871886a8c3aa.png)

### Использование

1. Создайте новый шаблон в MODX (Элементы → Шаблоны)
2. Скопируйте содержимое `cart.tpl` или укажите путь к файлу
3. Назначьте шаблон странице корзины

::: tip Наследование
Демо-шаблон использует наследование Fenom (`{extends 'file:templates/base.tpl'}`). Убедитесь, что базовый шаблон существует, или замените на свою структуру.
:::

### Настройка

Шаблон использует системные настройки:

- `ms3_order_page_id` — ID страницы оформления заказа (для кнопки «Оформить заказ»)

Лексиконы:

- `ms3_frontend_continue_shopping` — текст кнопки «Продолжить покупки»
- `ms3_frontend_checkout` — текст кнопки «Оформить заказ»

## Формы и действия

Для работы форм в корзине используйте класс `ms3_form` и скрытое поле `ms3_action`:

```html
{* Изменение количества *}
<form class="ms3_form">
    <input type="hidden" name="product_key" value="{$product.product_key}">
    <input type="hidden" name="ms3_action" value="cart/change">
    <input type="number" name="count" value="{$product.count}" min="1">
    <button type="submit">Обновить</button>
</form>

{* Удаление товара *}
<form class="ms3_form">
    <input type="hidden" name="product_key" value="{$product.product_key}">
    <input type="hidden" name="ms3_action" value="cart/remove">
    <button type="submit">Удалить</button>
</form>

{* Очистка корзины *}
<form class="ms3_form">
    <input type="hidden" name="ms3_action" value="cart/clean">
    <button type="submit">Очистить корзину</button>
</form>
```

## Программное управление

JavaScript API для работы с корзиной:

```javascript
// Добавить товар
await ms3.cartUI.handleAdd(productId, count, options);

// Изменить количество
await ms3.cartUI.handleChange(productKey, newCount);

// Удалить товар
await ms3.cartUI.handleRemove(productKey);

// Очистить корзину
await ms3.cartUI.handleClean();
```

Низкоуровневый API (без автообновления UI):

```javascript
// Прямые запросы к API
const result = await ms3.cartAPI.add(productId, count, options);
const result = await ms3.cartAPI.change(productKey, count);
const result = await ms3.cartAPI.remove(productKey);
const result = await ms3.cartAPI.clean();
const cart = await ms3.cartAPI.get();
```
