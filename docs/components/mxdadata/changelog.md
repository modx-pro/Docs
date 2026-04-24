---
title: История изменений
description: Публичные релизы mxDadata для MODX
---

# История изменений

Краткое изложение релизов. Полный файл в поставке: `core/components/mxdadata/docs/changelog.txt`.

## 1.0.0-pl — 2026-04-24

Первый публичный релиз компонента mxDadata для MODX 3 и MiniShop3.

**Добавлено**

- Интеграция с DaData: Suggest, Clean, Party/FindById, `DadataClient`, кэш, rate limit, логи в БД
- Плагин MiniShop3: `OrderValidator`, `AddressMapper`, события `msOnBeforeCreateOrder`, `msOnSubmitOrder`, плейсхолдеры `OnWebPageInit`
- `connector-web.php`, `connector.php`, сниппеты и JS витрины, универсальная форма `mxDadataForm`
- Админка на Vue: дашборд, API, кэш, логи, Party, настройки MiniShop3
- Таблицы `mxdadata_cache`, `mxdadata_log`, лексиконы ru, en, ua

**Исправлено**

- Совместимость с PHP 8.2+, устойчивость коннекторов при JSON POST, инициализация подсказок на чекауте MS3

**Зависимости**

- MODX 3.x, MiniShop3 3.x, VueTools для раздела в менеджере. Опционально Scheduler для ротации логов
