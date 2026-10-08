---
title: Настройки и права
description: Системные настройки и права ms3YandexMarket
---

# Настройки и права

Системные настройки лежат в области `ms3yandexmarket`.

| Ключ | По умолчанию | Эффект |
| --- | --- | --- |
| `ms3yandexmarket_enabled` | `1` | `0` останавливает файл задачи и cron: они пишут, что компонент выключен |
| `ms3yandexmarket_chunk_size` | `500` | Сколько товаров читается за одну порцию |
| `ms3yandexmarket_log_entry_cap` | `200` | Сколько сообщений журнала хранится на один запуск |
| `ms3yandexmarket_scheduler_enabled` | `1` | `0` не создаёт и не обновляет задачу Scheduler |
| `ms3yandexmarket_default_currency` | `RUB` | Код валюты, если у прайса свой не задан |
| `ms3yandexmarket_files_path` | `assets/components/ms3yandexmarket/files/` | Каталог файлов от корня сайта |
| `ms3yandexmarket_after_save_sync` | `0` | `1` пишет файл прайсов режима `after_save` прямо при сохранении товара |

## Права в поставке

<!-- MEDIA: screenshot-admin | must | Шаблон политики ms3yandexmarketPolicyTemplate и политика ms3yandexmarketPolicy с правами view, manage, generate, settings у группы Administrator | На тестовом стенде: «Безопасность» → «Политики доступа», найти шаблон и политику компонента после установки пакета -->

Установщик создаёт шаблон `ms3yandexmarketPolicyTemplate` и политику `ms3yandexmarketPolicy` с четырьмя правами. Группа Administrator получает политику в `mgr`.

| Ключ | Что делает код |
| --- | --- |
| `ms3yandexmarket_view` | Открывает менеджер и читает данные |
| `ms3yandexmarket_manage` | Создаёт и меняет прайсы, теги и условия |
| `ms3yandexmarket_generate` | Запускает запись файла |
| `ms3yandexmarket_settings` | Ключ есть в политике. Процессоры менеджера его не проверяют. Системные настройки MODX открывает право `settings` самого MODX |

## Свой XML и Fenom

Процессоры проверяют ещё два права. Установщик их в шаблон не кладёт. Пока вы не добавите ключи в шаблон и не включите их в политике, сохранение отвечает 403.

| Ключ | Когда проверяется |
| --- | --- |
| `ms3yandexmarket_edit_raw_xml` | Тип тега `19` (`RAW_XML`) |
| `ms3yandexmarket_edit_fenom` | Непустой обработчик Fenom у тега или атрибута |

Фрагмент своего XML перед записью проверяется как XML. Пустой фрагмент допустим. PHP в Fenom не выполняется. Нужен pdoTools.

## Настройки вне поставки

Этих ключей нет в transport. Создайте их вручную, если путь или производитель нестандартные.

| Ключ | Если записи нет | Эффект |
| --- | --- | --- |
| `ms3yandexmarket_vendor_fallback` | пустая строка | Имя производителя, когда у товара нет `msVendor` и в настройках прайса нет ключа `vendor_fallback` |
| `ms3yandexmarket_image_source` | источник `1` | Медиаисточник для `pipeline:image`, если в прайсе нет `image_source_id` |
| `ms3yandexmarket_price_min` | не задана | Нижняя граница `pipeline:price`, если в прайсе нет `price_min` |
| `ms3yandexmarket_price_max` | не задана | Верхняя граница `pipeline:price`, если в прайсе нет `price_max` |
| `ms3yandexmarket_price_multiplier` | `1` | Множитель `pipeline:price`, если в прайсе нет `price_multiplier` |
| `ms3yandexmarket_core_path` | `core/components/ms3yandexmarket/` | Каталог ядра, если классы компонента ещё не загружены |

## Каталог файлов без настройки

Пока `ms3yandexmarket_files_path` в базе, запись и диагностика используют этот каталог. Без настройки диагностика смотрит `assets/components/ms3yandexmarket/yml/`, запись файла смотрит `assets/components/ms3yandexmarket/files/`.

## Назначение файла и площадка

Пустой код площадки сохраняется как `yandex.market`. Неизвестное назначение сохраняется как `catalog`.

| Назначение | Площадка | Файл |
| --- | --- | --- |
| `catalog` | `yandex.market` | YML каталога: магазин, категории, предложения |
| `items` | `yandex.market` | Тот же набор тегов, что у `catalog` |
| `placement` | `yandex.market` | YML размещения без блока категорий. Список управляемых полей в файл не фильтрует теги |
| любое | `google.rss20` | RSS 2.0. Назначение состав не меняет. Это файл для загрузки, не Merchant API |

Состав тегов: [состав файла](/components/ms3yandexmarket/feeds).

Тип предложения `simple` или `vendor.model` выбирается в карточке прайса. Подробнее: [параметры прайса](/components/ms3yandexmarket/pricelist).
