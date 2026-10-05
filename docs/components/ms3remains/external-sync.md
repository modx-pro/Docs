---
title: Обмен с внешними системами
description: CSV-импорт и экспорт, сервисный PHP API, CommerceBridge1C
---

# Обмен с внешними системами

## CSV-обмен

Раздел «Остатки» поддерживает экспорт и импорт CSV. Выгрузка из учётной системы конвертируется в CSV и загружается через manager.

### Экспорт

Кнопка **Экспорт CSV** отдаёт файл `ms3remains-remains.csv` с колонками:

| Колонка | Описание |
| --- | --- |
| `remain_id` | id строки остатка, ключ импорта |
| `product_id` | id товара |
| `product_name` | название товара |
| `variant_id` | id варианта ms3Variants или пусто |
| `variant_sku` | артикул варианта или пусто |
| `options` | JSON комбинации опций |
| `quantity` | текущее количество |

### Импорт

![Диалог импорта CSV](/components/ms3remains/screenshots/csv-import.jpg)

Кнопка **Импорт CSV** открывает диалог из трёх шагов:

1. Вставьте текст CSV и при необходимости комментарий (например «Сверка поставки №123»).
2. Нажмите **Проверить файл**. Таблица покажет текущее количество, новое и дельту. Ошибки формата выводятся списком по номерам строк.
3. **Применить импорт** активна только если проверка прошла без ошибок (`canCommit`). Ключ строки: `remain_id` из экспорта. Количество принимается дробным. Пустое `quantity`: ошибка строки. `0` обнуляет количество, строка остаётся.

Импорт меняет количество через `setQuantity`, поэтому срабатывают события и проекция, как при ручной правке.

## Сервисный API

Для интеграции из PHP (плагины, cron-скрипты, свои импортёры) возьмите сервис `ms3remains`:

```php
/** @var \Ms3Remains\Ms3Remains $ms3remains */
$ms3remains = $modx->services->get('ms3remains');
```

Пример: поставить остаток по товару и опциям.

```php
use Ms3Remains\Identity\OptionsCanonicalizer;
use Ms3Remains\Identity\StockIdentityResolver;

$resolver = new StockIdentityResolver(
    new OptionsCanonicalizer(),
    $modx->services->get('ms3remains.ms3variants'),
);

$identity = $resolver->resolve($productId, ['color' => 'красный', 'size' => 'M'], null);
$ms3remains->remains()->setQuantity($identity, 15.0, 'import 1c', $modx->user->get('id'));
```

`setQuantity` ставит абсолютное значение, `changeBy` сдвигает на дельту. Оба пишут проекцию и вызывают события.

Маршруты экрана manager (`/api/mgr/ms3remains/*`) требуют `ms3remains_manage`. Таблица: [Права доступа](permissions).

## CommerceBridge1C

Компонент считает CommerceBridge1C установленным, если в системных настройках есть ключ `cb1c_enabled`. Как именно тот пакет пишет `msProductData.stock`, в коде ms3Remains не видно.

Раздел «Настройки» показывает предупреждение при этом ключе. Чтобы проекция не спорила с внешней записью `stock`, загружайте остатки через CSV или сервисный API выше.
