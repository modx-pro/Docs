---
title: Системные настройки
---
# Системные настройки

Все системные настройки MiniShop3 имеют префикс `ms3_` и находятся в пространстве имён `minishop3`.

Для просмотра настроек перейдите в **System → System Settings** и выберите namespace **minishop3**.

## Основные настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_services` | JSON | Массив с зарегистрированными классами для корзины, заказа, доставки и оплаты. Используется для расширения функциональности сторонними компонентами |
| `ms3_plugins` | `[]` | Массив с зарегистрированными плагинами расширения объектов модели магазина |
| `ms3_chunks_categories` | | ID категорий через запятую для списка чанков |
| `ms3_use_scheduler` | `false` | Использовать компонент [Scheduler](/components/scheduler/) для фоновых задач |

## Категория товаров

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_template_category_default` | | Шаблон по умолчанию для новых категорий |
| `ms3_category_grid_fields` | `id,menuindex,pagetitle,article,price,thumb,new,favorite,popular` | Видимые поля в таблице товаров категории |
| `ms3_category_show_nested_products` | `true` | Показывать вложенные товары из подкатегорий |
| `ms3_category_show_options` | `false` | Показывать опции товаров в таблице категории |
| `ms3_category_remember_tabs` | `true` | Запоминать активную вкладку панели категории |
| `ms3_category_id_as_alias` | `false` | Использовать ID категории как псевдоним URL |
| `ms3_category_content_default` | | Содержимое для новых категорий (вызов сниппета вывода товаров) |
| `mgr_tree_icon_mscategory` | `icon icon-barcode` | CSS-класс иконки категории в дереве ресурсов |

## Товар

### Основные поля

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_template_product_default` | | Шаблон по умолчанию для новых товаров |
| `ms3_product_main_fields` | `pagetitle,longtitle,description,introtext,content` | Основные поля на панели товара |
| `ms3_product_extra_fields` | `price,old_price,article,weight,color,size,vendor_id,made_in,tags,new,popular,favorite` | Дополнительные поля товара |
| `ms3_product_show_in_tree_default` | `false` | Показывать новые товары в дереве ресурсов |
| `ms3_product_id_as_alias` | `false` | Использовать ID товара как псевдоним URL |
| `ms3_product_remember_tabs` | `true` | Запоминать активную вкладку панели товара |
| `mgr_tree_icon_msproduct` | `icon icon-tag` | CSS-класс иконки товара в дереве ресурсов |

### Вкладки товара

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_product_tab_extra` | `true` | Показывать вкладку свойств товара |
| `ms3_product_tab_gallery` | `true` | Показывать вкладку галереи |
| `ms3_product_tab_links` | `true` | Показывать вкладку связей товара |
| `ms3_product_tab_options` | `true` | Показывать вкладку опций |
| `ms3_product_tab_categories` | `true` | Показывать вкладку категорий |

### Галерея

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_product_source_default` | `0` | ID источника файлов для галереи по умолчанию |
| `ms3_product_thumbnail_default` | `{assets_url}components/minishop3/img/mgr/ms3_small.png` | Путь к изображению-заглушке |
| `ms3_product_thumbnail_size` | `small` | Размер превью по умолчанию |

### Форматирование цен и веса

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_price_format` | `[2, ".", " "]` | Формат цены: [знаки после запятой, разделитель дробной части, разделитель тысяч] |
| `ms3_weight_format` | `[3, ".", " "]` | Формат веса: [знаки после запятой, разделитель дробной части, разделитель тысяч] |
| `ms3_price_format_no_zeros` | `true` | Убирать лишние нули в ценах (15.00 → 15) |
| `ms3_weight_format_no_zeros` | `true` | Убирать лишние нули в весе |
| `ms3_price_snippet` | | Имя сниппета-модификатора цены |
| `ms3_weight_snippet` | | Имя сниппета-модификатора веса |
| `ms3_currency_symbol` | `₽` | Символ валюты (₽, $, €, £, ₴, ¥, ₸) |
| `ms3_currency_position` | `after` | Позиция символа: `before` ($ 100) или `after` (100 ₽) |

## Корзина

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_cart_context` | `false` | Использовать единую корзину для всех контекстов |
| `ms3_cart_max_count` | `1000` | Максимальное количество товаров в корзине |

## Заказы

### Общие настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_order_format_num` | `ym` | Формат нумерации заказов (date() формат) |
| `ms3_order_format_num_separator` | `/` | Разделитель в номере заказа |
| `ms3_date_format` | `d.m.y H:M` | Формат дат в админке |
| `ms3_order_user_groups` | | Группы для регистрации покупателей (через запятую) |
| `ms3_order_show_drafts` | `true` | Показывать черновики в списке заказов |
| `ms3_order_redirect_thanks_id` | `1` | ID страницы "Спасибо за заказ" |
| `ms3_order_success_page_id` | `0` | ID страницы успешной оплаты |
| `ms3_order_register_user_on_submit` | `false` | Создавать modUser при оформлении заказа |
| `ms3_email_manager` | | Email-адреса менеджеров для уведомлений (через запятую) |
| `ms3_delete_drafts_after` | | Удалять старые черновики (strtotime формат: `-1 year`, `-2 weeks`) |
| `ms3_order_log_actions` | `status,products,field,address` | Логируемые действия с заказом |

### Поля в админке

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_order_grid_fields` | `id,num,customer,status,cost,weight,delivery,payment,createdon,updatedon,comment` | Поля в таблице заказов |
| `ms3_order_address_fields` | `first_name,last_name,email,phone,index,country,region,city,metro,street,building,entrance,floor,room,comment,text_address` | Поля адреса доставки |
| `ms3_order_product_fields` | `product_pagetitle,vendor_name,product_article,weight,price,count,cost` | Поля таблицы товаров в заказе |
| `ms3_order_product_options` | `size,color` | Редактируемые опции товара в заказе |

## Статусы заказов

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_status_draft` | `1` | ID статуса "Черновик" |
| `ms3_status_new` | `0` | ID статуса нового заказа (устанавливается миграцией) |
| `ms3_status_paid` | `0` | ID статуса оплаченного заказа |
| `ms3_status_canceled` | `0` | ID статуса отменённого заказа |
| `ms3_status_for_stat` | `2,3` | ID статусов для статистики выполненных заказов |

## Клиенты

### Страницы личного кабинета

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_login_page_id` | `0` | ID страницы входа |
| `ms3_customer_register_page_id` | `0` | ID страницы регистрации |
| `ms3_customer_profile_page_id` | `0` | ID страницы профиля |
| `ms3_customer_addresses_page_id` | `0` | ID страницы адресов |
| `ms3_customer_orders_page_id` | `0` | ID страницы истории заказов |
| `ms3_customer_redirect_after_login` | `0` | ID страницы для редиректа после входа (0 = остаться) |

### Авторизация и регистрация

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_auto_register_on_order` | `true` | Автоматически регистрировать клиента при заказе |
| `ms3_customer_auto_login_on_order` | `true` | Автоматически авторизовать после заказа |
| `ms3_customer_auto_login_after_register` | `true` | Автоматически авторизовать после регистрации |
| `ms3_customer_require_email_verification` | `false` | Требовать подтверждение email |
| `ms3_customer_send_welcome_email` | `true` | Отправлять приветственное письмо |
| `ms3_customer_require_privacy_consent` | `true` | Требовать согласие на обработку данных (GDPR) |

### Синхронизация с modUser

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_sync_enabled` | `false` | Включить синхронизацию msCustomer ↔ modUser |
| `ms3_customer_sync_create_moduser` | `false` | Создавать modUser при регистрации msCustomer |
| `ms3_customer_sync_delete_with_user` | `false` | Удалять msCustomer при удалении modUser |
| `ms3_customer_sync_user_group` | `0` | ID группы для новых modUser |
| `ms3_customer_duplicate_fields` | `["email", "phone"]` | JSON-массив полей для проверки дубликатов |

## Безопасность

### Токены

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_token_ttl` | `86400` | Время жизни токена клиента (секунды, 24 часа) |
| `ms3_customer_api_token_ttl` | `86400` | Время жизни API токена (секунды, 24 часа) |
| `ms3_password_reset_token_ttl` | `3600` | Время жизни токена сброса пароля (секунды, 1 час) |
| `ms3_email_verification_token_ttl` | `86400` | Время жизни токена верификации email (секунды, 24 часа) |
| `ms3_snippet_token_secret` | (автогенерация) | Секретный ключ для токенов сниппетов |
| `ms3_snippet_cache_ttl` | `3600` | Время кеширования параметров сниппетов (секунды) |
| `ms3_payment_secret` | | Секретный ключ для платёжных уведомлений |

### Защита от брутфорса

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_max_login_attempts` | `5` | Максимум неудачных попыток входа |
| `ms3_customer_block_duration` | `300` | Длительность блокировки (секунды, 5 минут) |

### Требования к паролю

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_password_min_length` | `8` | Минимальная длина пароля |
| `ms3_password_require_uppercase` | `false` | Требовать заглавные буквы |
| `ms3_password_require_number` | `false` | Требовать цифры |
| `ms3_password_require_special` | `false` | Требовать спецсимволы |

## API

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_api_debug` | `false` | Режим отладки API (расширенное логирование) |
| `ms3_cors_allowed_origins` | `*` | Разрешённые домены для CORS (через запятую или `*`) |
| `ms3_rate_limit_max_attempts` | `60` | Максимум запросов за период |
| `ms3_rate_limit_decay_seconds` | `60` | Период лимита запросов (секунды) |

## Сайт (Frontend)

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_token_name` | `ms3_token` | Имя токена для идентификации посетителя |
| `ms3_register_global_config` | `true` | Регистрировать `ms3Config` в DOM |
| `ms3_frontend_assets` | JSON-массив | Список подключаемых CSS/JS файлов |

### Плейсхолдеры для путей

В настройке `ms3_frontend_assets` доступны плейсхолдеры:

- `[[+assetsUrl]]` — `assets/components/minishop3/`
- `[[+jsUrl]]` — `assets/components/minishop3/js/`
- `[[+cssUrl]]` — `assets/components/minishop3/css/`

## Импорт

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_utility_import_fields` | `pagetitle,parent,price,article` | Поля для импорта |
| `ms3_utility_import_fields_delimiter` | `;` | Разделитель колонок CSV |
| `ms3_import_sync_limit` | `300` | Лимит синхронного импорта (строк) |
| `ms3_import_preview_rows` | `5` | Строк для предпросмотра |
| `ms3_import_upload_path` | `assets/import/` | Путь для загрузки файлов импорта |

## Уведомления

### Email

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_email_manager` | | Email-адреса менеджеров для уведомлений (через запятую) |

### Telegram

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_telegram_bot_token` | | Токен Telegram бота (получить у [@BotFather](https://t.me/BotFather)) |
| `ms3_telegram_manager_chat_id` | | Chat ID менеджера для уведомлений (получить у [@userinfobot](https://t.me/userinfobot)) |

::: tip Настройка Telegram бота
1. Создайте бота через [@BotFather](https://t.me/BotFather) и получите токен
2. Напишите боту любое сообщение, чтобы инициировать чат
3. Узнайте свой Chat ID через [@userinfobot](https://t.me/userinfobot)
4. Укажите токен и Chat ID в настройках
:::

## Примеры использования

### Получение настройки в PHP

```php
$priceFormat = $modx->getOption('ms3_price_format');
$currencySymbol = $modx->getOption('ms3_currency_symbol');
```

### Получение настройки в Fenom

```fenom
{* Символ валюты *}
{'ms3_currency_symbol' | option}

{* ID страницы профиля клиента *}
{'ms3_customer_profile_page_id' | option}
```

### Формат цены

Настройка `ms3_price_format` принимает JSON-массив:

```json
[2, ".", " "]
```

- `2` — количество знаков после запятой
- `"."` — разделитель дробной части
- `" "` — разделитель тысяч

Результат: `1 234.56`

### Модификатор цены

Создайте сниппет для динамического изменения цены:

```php
<?php
// Сниппет: myPriceModifier
// Параметры: $product (msProductData)

$price = $product->get('price');

// Применяем скидку 10% для определённой категории
if ($product->get('parent') == 5) {
    $price = $price * 0.9;
}

return $price;
```

Укажите имя сниппета в настройке `ms3_price_snippet`:

```
myPriceModifier
```
