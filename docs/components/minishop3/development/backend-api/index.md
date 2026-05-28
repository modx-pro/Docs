---
title: Backend API
description: Программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода
---

# Backend API

Раздел описывает программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода: плагины, сниппеты, консольные скрипты, сторонние компоненты.

## Процессоры (MODX Manager)

Процессоры лежат в `core/components/minishop3/src/Processors/` и имеют namespace `MiniShop3\Processors\`. Вызывайте их **полным именем класса** — в PHP через `$modx->runProcessor()`, в connector и vueManager — в параметре `action`:

```php
$modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', ['id' => $productId, 'file' => $path]);
```

Короткий путь `Gallery\Upload` с опцией `processors_path` не используется — передавайте полное имя класса.

## Содержание

- [API товара](product) — создание, обновление, опции, изображения, категории, связи, производители
- [API заказа](order) — оформление, статусы, стоимость, адреса, позиции, журнал
- [API опций](options) — создание опций, назначение категориям, чтение и запись значений
- [API покупателя](customer) — аутентификация, регистрация, верификация, адреса, токены
