---
title: Настройки и права
description: Системные настройки и права ms3YandexMarket
---
<!-- TODO: translate from docs/components/ms3yandexmarket/settings.md -->

# Настройки и права

## Системные настройки

Системные настройки лежат в области `ms3yandexmarket`.

| Ключ | По умолчанию | Эффект |
| --- | --- | --- |
| `ms3yandexmarket_enabled` | `1` | `0` останавливает cron, файл задачи, кнопку **Сгенерировать** и плагин. Предпросмотр не останавливается |
| `ms3yandexmarket_chunk_size` | `500` | Сколько товаров читается за одну порцию |
| `ms3yandexmarket_log_entry_cap` | `200` | Сколько сообщений журнала хранится на один запуск |
| `ms3yandexmarket_scheduler_enabled` | `1` | `0` не создаёт и не обновляет задачу Scheduler |
| `ms3yandexmarket_default_currency` | `RUB` | Код валюты, если у прайса свой не задан |
| `ms3yandexmarket_files_path` | `assets/components/ms3yandexmarket/files/` | Каталог файлов от корня сайта |
| `ms3yandexmarket_after_save_sync` | `0` | `1` пишет файл прайсов режима `after_save` прямо при сохранении товара |

При `0` у `ms3yandexmarket_enabled`:

- cron и файл задачи печатают `ms3YandexMarket: component disabled by ms3yandexmarket_enabled` и завершаются без ошибки
- кнопка **Сгенерировать** и запуск ожидающих отвечают 422, код `domain_error`, с тем же текстом
- строки журнала нет
- плагин молча выходит: отметки нет и файл `after_save` не пишется
- предпросмотр этот выключатель не смотрит

## Права в поставке

Установщик создаёт шаблон `ms3yandexmarketPolicyTemplate` и политику `ms3yandexmarketPolicy` с пятью правами. Группа Administrator получает политику в `mgr`. При обновлении ключ `ms3yandexmarket_settings` из шаблона и из политики убирается.

| Ключ | Что делает код |
| --- | --- |
| `ms3yandexmarket_view` | Пункт меню, список и карточка прайса, диагностика, журнал, предпросмотр, чтение и скачивание файла |
| `ms3yandexmarket_manage` | Запись прайса, чтение и запись тегов, атрибутов и условий |
| `ms3yandexmarket_generate` | Запускает запись файла |
| `ms3yandexmarket_edit_raw_xml` | Тип тега `19` (`RAW_XML`) |
| `ms3yandexmarket_edit_fenom` | Непустой `handler` или значение тега и атрибута с префиксом `fenom:` |

- Страницу компонента открывают `ms3yandexmarket_view`, `ms3yandexmarket_manage` или право MODX `settings`.
- Пункт меню требует только `ms3yandexmarket_view`.
- С одним правом `settings` процессоры отвечают 403.
- Право `settings` ядра открывает системные настройки MODX.

## Свой XML и Fenom

Фрагмент своего XML перед записью проверяется как XML. Пустой фрагмент допустим. PHP в Fenom не выполняется. Нужен pdoTools.

- Без права `ms3yandexmarket_edit_raw_xml` сохранение типа `19` отвечает 403.
- Без права `ms3yandexmarket_edit_fenom` непустой `handler` или значение с префиксом `fenom:` отвечает 403.

В карточке тега поля обработчика нет.

## Настройки вне поставки

Создайте запись вручную, если ключ из таблицы нужен.

| Ключ | Если записи нет | Эффект |
| --- | --- | --- |
| `ms3yandexmarket_vendor_fallback` | пустая строка | Имя производителя, когда у товара нет `msVendor` и в настройках прайса нет ключа `vendor_fallback` |
| `ms3yandexmarket_image_source` | источник `1` | Медиаисточник для `pipeline:image`, если в прайсе нет `image_source_id` |
| `ms3yandexmarket_price_min` | не задана | Нижняя граница `pipeline:price`, если в прайсе нет `price_min` |
| `ms3yandexmarket_price_max` | не задана | Верхняя граница `pipeline:price`, если в прайсе нет `price_max` |
| `ms3yandexmarket_price_multiplier` | `1` | Множитель `pipeline:price`, если в прайсе нет `price_multiplier` |
| `ms3yandexmarket_core_path` | абсолютный каталог ядра MODX и `components/ms3yandexmarket/` | Каталог классов, если они ещё не загружены |

## Каталог файлов без настройки

Без настройки запись и диагностика смотрят `assets/components/ms3yandexmarket/files/`. Если `ms3yandexmarket_files_path` есть в базе, оба берут этот каталог.

## Назначение файла и площадка

Пустой код площадки компонент сохраняет как `yandex.market`. Неизвестное назначение сохраняет как `catalog`.

| Назначение | Площадка | Файл |
| --- | --- | --- |
| `catalog` | `yandex.market` | YML каталога: магазин, категории, предложения |
| `items` | `yandex.market` | Тот же набор тегов, что у `catalog`. Вкладка категорий есть, в файл блок категорий не пишется |
| `placement` | `yandex.market` | YML размещения без блока категорий. Пустой `managed_fields` сохранить нельзя. Непустой список оставляет в `offer` имена из списка. Атрибут `id` пишется всегда |
| любое | `google.rss20` | RSS 2.0. Назначение состав не меняет. Это файл для загрузки, не Merchant API |

Состав тегов: [состав файла](/components/ms3yandexmarket/feeds).

Тип оффера `simple` или `vendor.model` задайте в карточке прайса. См. [параметры прайса](/components/ms3yandexmarket/pricelist).
