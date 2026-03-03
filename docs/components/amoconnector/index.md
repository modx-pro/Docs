---
title: amoConnector
description: Интеграция MODX с amoCRM нового поколения
logo: https://modstore.pro/assets/extras/amoconnector/logo-lg.png
author: biz87
modstore: https://modstore.pro/packages/import-and-export/amoconnector

items: [
  { text: 'Установка и настройка', link: 'setup' },
  { text: 'Отправка данных из форм', link: 'submitting-forms' },
  { text: 'Маппинг полей', link: 'field-mapping' },
  { text: 'Маппинг статусов', link: 'status-mapping' },
  { text: 'Webhook', link: 'webhook' },
  { text: 'Scheduler', link: 'scheduler' },
  { text: 'События', link: 'events' },
  { text: 'Распространенные ошибки', link: 'common-mistakes' },
]
---
# amoConnector

Компонент интеграции сайта на MODX Revolution с системой amoCRM. Построен на официальном SDK amoCRM и использует OAuth 2.0 авторизацию.

## Ключевые особенности

- Автоматическое создание сделок из заказов miniShop2
- Создание сделок из любых форм через FormIt-хук
- Дедупликация контактов по email и телефону
- Двусторонняя синхронизация статусов заказов через webhook
- Гибкий маппинг полей заказов и форм на поля amoCRM через CMP
- Маппинг статусов ms2 на стадии воронок amoCRM
- Отложенная отправка через [Scheduler](https://modstore.pro/packages/utilities/scheduler) (опционально)
- Система событий для модификации данных плагинами
- Подробный лог всех операций в панели управления
- Примечания к сделкам с товарами заказа или данными формы

## Быстрый старт

Для минимальной настройки заполните системные настройки:

- **amoconnector.client_id** — ID интеграции из настроек приложения amoCRM
- **amoconnector.client_secret** — Secret интеграции
- **amoconnector.redirect_uri** — URI перенаправления (должен совпадать с настройкой в amoCRM)
- **amoconnector.subdomain** — поддомен аккаунта amoCRM (например, `mycompany` для `mycompany.amocrm.ru`)

После заполнения настроек выполните авторизацию OAuth в панели управления компонентом.

## Заказы miniShop2

После авторизации заполните:

- **amoconnector.default_pipeline_id** — ID воронки для заказов
- **amoconnector.default_status_id** — ID начального статуса сделки в воронке
- **amoconnector.enabled** — включите интеграцию

Новые заказы ms2 будут автоматически отправляться как сделки с привязанными контактами.

## Данные из форм

Для отправки форм добавьте хук `amoConnectorHook` в вызов FormIt:

```modx
[[!FormIt?
  &hooks=`email,amoConnectorHook`
  &amoFormName=`callback`
]]
```

Подробнее о параметрах хука на странице «Отправка данных из форм».
