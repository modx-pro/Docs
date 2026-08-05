---
title: Impex / Impex3
description: Импорт и экспорт ресурсов MODX Revolution / MODX 3 и товаров miniShop2 / miniShop3
logo: https://modstore.pro/assets/extras/impex3/logo-md.png
author: Romanov Pavel
modstore: https://modstore.pro/packages/import-and-export/impex3
items: [
  { text: 'Конфигурация', link: 'configuration' },
  { text: 'Интерфейс', link: 'interface' },
  { text: 'События плагинов', link: 'plugins' },
  { text: 'Запуск по расписанию', link: 'cron' },
]
---

# Impex / Impex3

Импорт и экспорт ресурсов и товаров из XLS, XLSX и CSV. Конфигурация через PHP-файлы в `core/components/impex/config/`.

## Основные свойства

- Форматы XLS, XLSX, CSV
- PHP 7.4 и 8.x
- Поля miniShop2 / miniShop3: опции категорий, производитель, галерея
- MIGX-TV с настраиваемыми разделителями
- Контейнеры Collections
- Пакетный импорт и тестовый прогон
- Резервная копия БД перед импортом и восстановление
- Системные события для плагинов
- Запуск по cron через CronManager или Scheduler

## Установка

1. **Extras → Installer** → найдите пакет:
   - [Impex для MODX Revo](https://modstore.pro/packages/import-and-export/impex)
   - [Impex3 для MODX 3](https://modstore.pro/packages/import-and-export/impex3)
2. Установите пакет и очистите кэш MODX.

После установки в менеджере появится **Impex** / **Impex3**.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Настроить колонки и типы полей | [Конфигурация](configuration) |
| Экспорт, импорт, бэкап в UI | [Интерфейс](interface) |
| Плагины на событиях | [События плагинов](plugins) |
| CronManager / Scheduler | [Запуск по расписанию](cron) |
