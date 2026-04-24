---
title: mxDadata
description: Подсказки DaData и валидация адреса для MiniShop3 в MODX 3
author: ibochkarev
dependencies: minishop3
categories: minishop3

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

**mxDadata** — дополнение для интеграции **[DaData](https://dadata.ru/)** с **[MiniShop3](/components/minishop3/)** на **[MODX Revolution 3](https://modx.com/)**: подсказки адреса и организаций на чекауте, нормализация и проверка данных через **Clean** и **Party** API, кэш и журнал запросов в панели управления.

## Минимальный путь к подсказкам на витрине

1. Установить пакет и убедиться, что стоит **MiniShop3**.
2. В [профиле DaData](https://dadata.ru/profile/#info) взять **Token** (и **Secret** для валидации заказа).
3. **Extras → mxDadata → API** — вставить ключи, **Сохранить**, при необходимости **Тест соединения**.
4. В чанк формы заказа (например `tpl.msOrder`) **некэшированно** вывести `[[!mxDadataAddressSuggest]]` с верным **`input`** под поле адреса.
5. **Настройки → Очистить кэш** и открыть страницу оформления с товаром в корзине.

Детали: [Быстрый старт](quick-start), поля формы: [Подключение на сайте](frontend).

## Безопасность ключей

- **Token** DaData используется для Suggest и запросов с витрины через **`connector-web.php`** (запросы ограничены по действиям и rate limit). В HTML/шаблон не подставляйте **Secret** вручную.
- **Secret** храните только в системных настройках MODX: он нужен для **Clean** и **Party** на **сервере** (плагин заказа, менеджер).
- Сетевой доступ к DaData с сервера — по HTTPS. Ключи в БД MODX защищайте [политиками доступа](https://docs.modx.com/3.x/en/building-sites/client-proofing) к настройкам.

## Тарифы, баланс и лимиты DaData

- Условия и стоимость — в [кабинете DaData](https://dadata.ru/pricing/). **Баланс** и **статистика** запросов удобно смотреть в **Extras → mxDadata → Dashboard** (как и **Логи**).
- Сайт расходует квоту на каждую подсказку и валидацию. **RateLimiter** в компоненте (`mxdadata_throttle_rpm`) снижает риск всплесков и 429. При **исчерпанном балансе** ответы API дают отказ — см. [FAQ → 429](faq#429-лимиты-и-баланс-dadata) и [Логи](admin-ui).

## Возможности

- **Suggest на витрине** — сниппеты `mxDadataAddressSuggest`, `mxDadataPartySuggest`, универсальная форма `mxDadataForm` (JSON-конфиг полей) через публичный коннектор `assets/components/mxdadata/connector-web.php`
- **Плагин MiniShop3** — на `msOnBeforeCreateOrder` и `msOnSubmitOrder`: валидация телефона и email (Clean), нормализация адреса, обязательный FIAS/индекс, блокировка заказа при ошибках. Дополнительно **`OnWebPageInit`** подставляет плейсхолдеры веб-контекста в шаблоны
- **Админ-панель (Vue)** — **Extras → mxDadata**: дашборд (статус API, баланс), настройки API, вкладка MiniShop3, кэш, логи, тест Party по ИНН (нужен [VueTools](https://docs.modx.pro/components/vuetools/))
- **Кэш** — таблица `mxdadata_cache`, настраиваемый TTL, очистка из админки
- **Логи** — таблица `mxdadata_log`, фильтры, просмотр request/response, ротация по расписанию (опционально пакет **Scheduler**)

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.x |
| PHP | 8.2+ |
| MiniShop3 | 3.x |
| MySQL / MariaDB | как в требованиях MODX 3 |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — адрес заказа, события оформления
- **[VueTools](https://docs.modx.pro/components/vuetools/)** — раздел **Extras → mxDadata** в менеджере. Для подсказок на странице заказа VueTools **не обязателен**: достаточно токена DaData в системных настройках и сниппетов в чанке

### Опционально

- **Scheduler** — фоновая ротация логов по расписанию (см. установку пакета)

## Установка

1. Установите пакет через **Extras → Installer** (транспорт с ModStore или локальная сборка `php _build/build.php` из исходников)
2. Убедитесь, что установлены **MiniShop3** и при необходимости **VueTools**
3. Зарегистрируйтесь на [dadata.ru](https://dadata.ru/), в [профиле](https://dadata.ru/profile/#info) скопируйте **API Token** и **Secret**
4. **Extras → mxDadata** (вкладка **API**) — вставьте ключи, **Тест соединения**, **Сохранить**
5. **Настройки → Очистить кэш**

С чего начать: [Быстрый старт](quick-start).

## Термины

| Термин | Описание |
|--------|----------|
| **Token / Secret** | Ключи DaData: **Token** — в основном Suggest, **Secret** — Clean и Party |
| **connector-web.php** | Публичный коннектор для AJAX-подсказок с витрины (ограничение частоты, кэш) |
| **connector.php** | Коннектор для менеджерских процессоров (MODX) |
| **Party** | API организаций по ИНН (реквизиты, адрес) |

## Документация по разделам

- [Быстрый старт](quick-start) — ключи, плагин, сниппеты в чанке заказа
- [Админка в MODX](admin-ui) — вкладки, дашборд, логи, Party
- [Системные настройки](settings) — API, кэш, throttling, MiniShop3
- [Сниппеты](snippets/index) — адрес, ИНН, универсальная форма
- [Подключение на сайте](frontend) — порядок вывода с [msRussianPost](/components/msrussianpost/), событие `mxdadata:order-address-updated`
- [Интеграция и сценарии](integration) — события плагина, валидация, кэш, схемы потоков
- [Для разработчиков](developer) — плейсхолдеры, API DaData
- [FAQ](faq) — частые проблемы, 429

Расширенные JSON-примеры для **mxDadataForm** — [Интеграция](integration#универсальная-форма-mxdadataform) и [сниппет](snippets/mxDadataForm). Руководство по админке — [Админка в MODX](admin-ui).
