---
title: msCustomer
---
# msCustomer

Сниппет для вывода личного кабинета покупателя. Отображает профиль, историю заказов и позволяет редактировать данные.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно**.
:::

## Параметры

Сниппет использует параметры из системных настроек MiniShop3 и не требует дополнительной конфигурации.

## Примеры

### Базовый вывод

```fenom
{'!msCustomer' | snippet}
```

## Функциональность

Сниппет предоставляет:

1. **Профиль пользователя** — просмотр и редактирование данных
2. **История заказов** — список всех заказов покупателя
3. **Детали заказа** — подробная информация о конкретном заказе
4. **Авторизация** — форма входа для неавторизованных пользователей

## Режимы работы

Сниппет автоматически определяет режим по GET-параметрам:

| URL | Режим |
|-----|-------|
| `/cabinet/` | Список заказов |
| `/cabinet/?action=profile` | Профиль пользователя |
| `/cabinet/?order=15` | Детали заказа #15 |

## Структура чанков

Сниппет использует несколько чанков:

- `tpl.msCustomer.profile` — Профиль пользователя
- `tpl.msCustomer.orders` — Список заказов
- `tpl.msCustomer.order.row` — Строка заказа в списке
- `tpl.msCustomer.login` — Форма авторизации (для гостей)

## Пример реализации

### Страница личного кабинета

```fenom
{if $_modx->user.id > 0}
    <div class="customer-cabinet">
        <nav class="cabinet-nav">
            <a href="{'ms3_customer_page' | option}"
               class="{if !$_GET.action && !$_GET.order}active{/if}">
                Мои заказы
            </a>
            <a href="{'ms_customer_page' | option}?action=profile"
               class="{if $_GET.action == 'profile'}active{/if}">
                Профиль
            </a>
            <a href="{$_modx->runSnippet('!Logout', ['loginResourceId' => $_modx->resource.id])}">
                Выйти
            </a>
        </nav>

        {'!msCustomer' | snippet}
    </div>
{else}
    <div class="customer-login">
        <h2>Вход в личный кабинет</h2>
        {'!Login' | snippet : [
            'loginTpl' => 'tpl.Login.form',
            'logoutTpl' => 'tpl.Login.logout'
        ]}
    </div>
{/if}
```

### Чанк профиля

```fenom
{* tpl.msCustomer.profile *}
<form class="profile-form" method="post">
    <input type="hidden" name="action" value="profile/update">

    <div class="form-group">
        <label>ФИО</label>
        <input type="text"
               name="fullname"
               value="{$user.fullname}">
    </div>

    <div class="form-group">
        <label>Email</label>
        <input type="email"
               name="email"
               value="{$user.email}"
               required>
    </div>

    <div class="form-group">
        <label>Телефон</label>
        <input type="tel"
               name="phone"
               value="{$user.phone}">
    </div>

    <div class="form-group">
        <label>Адрес по умолчанию</label>
        <input type="text"
               name="address"
               value="{$user.address}">
    </div>

    <button type="submit" class="btn btn-primary">
        Сохранить
    </button>
</form>
```

### Чанк списка заказов

```fenom
{* tpl.msCustomer.orders *}
{if $orders?}
    <table class="orders-table">
        <thead>
            <tr>
                <th>№ заказа</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {foreach $orders as $order}
                <tr>
                    <td>{$order.num}</td>
                    <td>{$order.createdon | date : 'd.m.Y'}</td>
                    <td>{$order.cost} руб.</td>
                    <td style="color: {$order.status_color}">
                        {$order.status_name}
                    </td>
                    <td>
                        <a href="?order={$order.id}">Подробнее</a>
                    </td>
                </tr>
            {/foreach}
        </tbody>
    </table>
{else}
    <p>У вас пока нет заказов.</p>
    <a href="/" class="btn">Перейти в каталог</a>
{/if}
```

## REST API

Для SPA-приложений доступен REST API личного кабинета:

```javascript
// Получить профиль
const profile = await ms3.customer.getProfile();

// Обновить профиль
await ms3.customer.updateProfile({
    fullname: 'Иван Иванов',
    phone: '+7 999 123-45-67'
});

// Получить заказы
const orders = await ms3.customer.getOrders();

// Получить детали заказа
const order = await ms3.customer.getOrder(15);
```

## Интеграция с Login

Для полноценной работы личного кабинета рекомендуется использовать компонент Login:

```fenom
{* Форма входа *}
{'!Login' | snippet : [
    'loginTpl' => 'tpl.Login.form',
    'loginResourceId' => $_modx->resource.id
]}

{* Форма регистрации *}
{'!Register' | snippet : [
    'submittedResourceId' => $_modx->resource.id,
    'successMsg' => 'Регистрация успешна!'
]}
```
