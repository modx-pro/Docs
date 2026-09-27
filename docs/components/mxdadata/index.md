---
title: mxDadata
description: Подсказки DaData и валидация адреса для MiniShop3 в MODX 3
author: Ibochkarev
logo: https://modstore.pro/assets/extras/mxdadata/logo.png
modstore: https://modstore.pro/packages/utilities/mxdadata
dependencies: minishop3
categories: utilities

compatibility:
  - modx3
  - php82
  - minishop3
items:
  - text: Быстрый старт
    link: quick-start
  - text: Админка в MODX
    link: admin-ui
  - text: Системные настройки
    link: settings
  - text: Сниппеты
    link: snippets/index
    items:
      - text: mxDadataAddressSuggest
        link: snippets/mxDadataAddressSuggest
      - text: mxDadataPartySuggest
        link: snippets/mxDadataPartySuggest
      - text: mxDadataForm
        link: snippets/mxDadataForm
  - text: Подключение на сайте
    link: frontend
  - text: Интеграция и сценарии
    link: integration
  - text: Для разработчиков
    link: developer
  - text: FAQ
    link: faq
---

# mxDadata

**mxDadata** подключает **[DaData](https://dadata.ru/)** к **[MiniShop3](/components/minishop3/)** на **[MODX Revolution 3](https://modx.com/)**. На чекауте работают подсказки адреса и организаций. При оформлении заказа компонент нормализует и проверяет данные через **Clean** API, кэширует ответы и пишет журнал запросов в панели управления.

Список изменений: `core/components/mxdadata/docs/changelog.txt` в составе компонента.

## Минимальный путь к подсказкам на витрине

1. Установите пакет. Нужен **MiniShop3**.
2. В [профиле DaData](https://dadata.ru/profile/#info) возьмите **Token** (и **Secret** для валидации заказа).
3. Задайте **Token** и **Secret**: **Настройки → Системные настройки** (фильтр `mxdadata`) или **Extras → mxDadata → Настройки**. На **Dashboard** в карточке **Подключение** нажмите **Тест соединения**.
4. В чанк формы заказа (например `tpl.msOrder`) **некэшированно** выведите `[[!mxDadataAddressSuggest]]`. Параметр **`input`** должен указывать на поле адреса.
5. **Настройки → Очистить кэш**. Откройте оформление заказа с товаром в корзине.

Детали: [Быстрый старт](quick-start). Поля формы: [Подключение на сайте](frontend).

## Безопасность ключей

- **Token** DaData нужен для Suggest и запросов с витрины через **`connector-web.php`**. Запросы ограничены по действиям и частоте. Не подставляйте **Secret** в HTML или шаблон.
- **Secret** храните только в системных настройках MODX. Он нужен для **Clean** и **Party** на **сервере** (плагин заказа, менеджер).
- Доступ к DaData с сервера идёт по HTTPS. Ключи в БД MODX защищайте [политиками доступа](https://docs.modx.com/3.x/en/building-sites/client-proofing) к настройкам.

## Тарифы, баланс и лимиты DaData

- Условия и стоимость: [кабинет DaData](https://dadata.ru/pricing/). **Баланс** и **статистика** запросов: **Extras → mxDadata → Dashboard** (там же **Логи**).
- Каждая подсказка и валидация расходует квоту. **`RateLimiter`** (`mxdadata_throttle_rpm`) снижает риск всплесков и ответа 429. При **исчерпанном балансе** API отказывает: [FAQ → 429](faq#429-лимиты-и-баланс-dadata), [Логи](admin-ui).

## Возможности

- **Suggest на витрине:** сниппеты `mxDadataAddressSuggest`, `mxDadataPartySuggest`, форма `mxDadataForm` (JSON-конфиг полей) через `assets/components/mxdadata/connector-web.php`
- **Плагин MiniShop3:** на `msOnBeforeCreateOrder` и `msOnSubmitOrder` валидирует телефон и email (Clean), нормализует адрес, требует FIAS/индекс, блокирует заказ при ошибках. **`OnWebPageInit`** подставляет плейсхолдеры веб-контекста в шаблоны
- **Админ-панель (Vue):** **Extras → mxDadata**, вкладки **Dashboard**, **Юрлица**, **Логи** (KPI, тест API, очистка кэша, Party по ИНН). Ключи MS3, API и лимит запросов: [системные настройки](settings). Для интерфейса нужен [VueTools](https://docs.modx.pro/components/vuetools/). Сниппеты на витрине работают без него
- **Кэш:** `modX::cacheManager`, префикс `mxdadata_`, TTL **`mxdadata_cache_ttl`**, очистка с Dashboard. Таблица `mxdadata_cache` создаётся при установке, в рантайме не используется ([issue #3](https://github.com/Ibochkarev/mxDadata/issues/3))
- **Логи:** таблица `mxdadata_log`, фильтры, просмотр request/response. Ротация вручную или задача Scheduler **`mxdadata_rotate_logs`** (процессор `Logs/Rotate`)

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| MiniShop3 | пакет `minishop3` ≥ 1.0.0 |
| MySQL / MariaDB | как в требованиях MODX 3 |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — адрес заказа, события оформления
- **[VueTools](https://docs.modx.pro/components/vuetools/)** — в `requires` транспорта для админки Vue. Resolver без него пишет предупреждение. Сниппеты и плагин заказа от VueTools не зависят.

### Опционально

- **Scheduler** — задача **`mxdadata_rotate_logs`** (`Logs/Rotate`). Расписание задайте в Scheduler после установки пакета.

## Установка

1. Установите пакет через **Extras → Installer** (транспорт с ModStore или локальная сборка `php _build/build.php` из исходников).
2. Нужен установленный **MiniShop3**.
3. Зарегистрируйтесь на [dadata.ru](https://dadata.ru/). В [профиле](https://dadata.ru/profile/#info) скопируйте **API Token** и **Secret**.
4. Задайте **`mxdadata_api_token`** и **`mxdadata_api_secret`** в системных настройках `mxdadata`. **Тест соединения:** **Dashboard → Подключение**.
5. **Настройки → Очистить кэш**.

Пошагово: [Быстрый старт](quick-start).

## Термины

| Термин | Описание |
|--------|----------|
| **Token / Secret** | Ключи DaData: **Token** в основном для Suggest, **Secret** для Clean и Party |
| **connector-web.php** | Публичный коннектор для AJAX-подсказок с витрины (ограничение частоты, кэш) |
| **connector.php** | Коннектор для менеджерских процессоров (MODX) |
| **Party** | API организаций по ИНН (реквизиты, адрес) |

## Документация по разделам

- [Быстрый старт](quick-start) — ключи, плагин, сниппеты в чанке заказа
- [Админка в MODX](admin-ui) — вкладки, дашборд, логи, Party
- [Системные настройки](settings) — API, кэш, лимит запросов, MiniShop3
- [Сниппеты](snippets/index) — адрес, ИНН, универсальная форма
- [Подключение на сайте](frontend) — порядок вывода с [msRussianPost](/components/msrussianpost/), событие `mxdadata:order-address-updated`
- [Интеграция и сценарии](integration) — события плагина, валидация, кэш, схемы потоков
- [Для разработчиков](developer) — плейсхолдеры, API DaData
- [FAQ](faq) — частые проблемы, 429
