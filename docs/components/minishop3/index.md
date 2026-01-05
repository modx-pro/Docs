---
title: MiniShop3
description: Современный компонент интернет-магазина для MODX 3
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
author: modx-pro
repository: https://github.com/modx-pro/MiniShop3

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Отличия от miniShop2', link: 'differences-from-ms2' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'msProducts', link: 'snippets/msproducts' },
      { text: 'msCart', link: 'snippets/mscart' },
      { text: 'msOrder', link: 'snippets/msorder' },
      { text: 'msGetOrder', link: 'snippets/msgetorder' },
      { text: 'msGallery', link: 'snippets/msgallery' },
      { text: 'msOptions', link: 'snippets/msoptions' },
      { text: 'msProductOptions', link: 'snippets/msproductoptions' },
      { text: 'msCustomer', link: 'snippets/mscustomer' },
      { text: 'msOrderTotal', link: 'snippets/msordertotal' },
    ],
  },
  {
    text: 'Интерфейс',
    items: [
      { text: 'Категория', link: 'interface/category' },
      { text: 'Товар', link: 'interface/product' },
      { text: 'Галерея', link: 'interface/gallery' },
      { text: 'Заказы', link: 'interface/orders' },
      {
        text: 'Настройки',
        link: 'interface/settings',
        items: [
          { text: 'Доставки', link: 'interface/settings/deliveries' },
          { text: 'Оплаты', link: 'interface/settings/payments' },
          { text: 'Производители', link: 'interface/settings/vendors' },
          { text: 'Связи', link: 'interface/settings/links' },
          { text: 'Опции', link: 'interface/settings/options' },
        ],
      },
      {
        text: 'Утилиты',
        link: 'interface/utilities',
        items: [
          { text: 'Галерея', link: 'interface/utilities/gallery' },
          { text: 'Импорт', link: 'interface/utilities/import' },
          { text: 'Поля товара', link: 'interface/utilities/product-fields' },
          { text: 'Дополнительные поля', link: 'interface/utilities/extra-fields' },
          { text: 'Колонки гридов', link: 'interface/utilities/grid-columns' },
          { text: 'Поля модели', link: 'interface/utilities/model-fields' },
        ],
      },
    ],
  },
  {
    text: 'Разработка',
    items: [
      { text: 'События', link: 'development/events' },
      { text: 'REST API', link: 'development/api' },
      { text: 'API Router', link: 'development/routing' },
      { text: 'Frontend JavaScript', link: 'development/frontend-js' },
      { text: 'Scheduler', link: 'development/scheduler' },
      { text: 'Модели и схема БД', link: 'development/models' },
      { text: 'Сервисный слой', link: 'development/services' },
    ],
  },
]
---
# MiniShop3

Современный компонент интернет-магазина для MODX 3, полностью переписанный с учётом новых возможностей платформы.

## Ключевые особенности

### Для MODX 3

MiniShop3 разработан специально для MODX Revolution 3.x и использует все преимущества новой версии:

- **PHP 8.1+** — современный синтаксис, типизация, атрибуты
- **Namespaces** — все классы организованы в пространстве имён `MiniShop3\`
- **PSR-4 автозагрузка** — через Composer
- **Миграции Phinx** — версионирование структуры БД

### Улучшенная архитектура

- **REST API** — полноценный API для headless-интеграций
- **Service Container** — зависимости через DI-контейнер MODX
- **Vue 3 + PrimeVue** — современный интерфейс админки через [VueTools](/components/vuetools/)
- **Современный фронтенд** — без jQuery, нативный JavaScript

### Совместимость

MiniShop3 сохраняет обратную совместимость с miniShop2 на уровне:

- Имена сниппетов (`msProducts`, `msCart`, `msOrder` и др.)
- Структура чанков и плейсхолдеров
- Параметры сниппетов

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости MODX

- **pdoTools 3.x** — для работы сниппетов и шаблонизатора Fenom
- **[VueTools](/components/vuetools/)** — Vue 3 и PrimeVue для административного интерфейса
- **[Scheduler](/components/scheduler/)** *(опционально)* — для фоновых задач (импорт, уведомления, очистка)

::: warning VueTools
MiniShop3 использует Vue 3 для современного интерфейса админки. Пакет **[VueTools](/components/vuetools/)** должен быть установлен до или вместе с MiniShop3. При отсутствии пакета будет показано сообщение с инструкцией по установке.
:::

### Composer библиотеки

MiniShop3 использует следующие PHP библиотеки (включены в пакет):

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| [nikic/fast-route](https://github.com/nikic/FastRoute) | ^1.3 | Маршрутизация REST API |
| [rakit/validation](https://github.com/rakit/validation) | ^1.4 | Валидация данных форм и API |
| [intervention/image](https://image.intervention.io/) | ^3.0 | Обработка изображений (ресайз, водяные знаки) |
| [robmorgan/phinx](https://phinx.org/) | ^0.16 | Миграции базы данных |
| [ramsey/uuid](https://uuid.ramsey.dev/) | ^4.7 | Генерация UUID для токенов |

## Установка

### Способ 1: Через менеджер пакетов (рекомендуется)

Стандартный способ установки через менеджер пакетов MODX с подключёнными репозиториями:

1. Перейдите в **Extras → Installer**
2. Нажмите **Download Extras**
3. Установите **[VueTools](/components/vuetools/)** (если ещё не установлен)
4. Найдите **MiniShop3** в списке доступных пакетов
5. Нажмите **Download** и затем **Install**

Пакет доступен в репозиториях [modx.com](https://modx.com/extras/) и [modstore.pro](https://modstore.pro/).

### Способ 2: Загрузка транспортного пакета

Если репозитории недоступны или нужна конкретная версия:

1. Скачайте транспортный пакет со страницы [релизов GitHub](https://github.com/modx-pro/MiniShop3/releases)
2. Загрузите файл `.transport.zip` в `/core/packages/` вашего сайта
3. Перейдите в **Extras → Installer**
4. Нажмите **Search locally for packages**
5. Найдите MiniShop3 в списке и нажмите **Install**

### Способ 3: Установка из исходников (для разработчиков)

Этот способ подходит для разработчиков, которым нужны самые свежие наработки:

::: tip Предварительные требования
Перед установкой MiniShop3 убедитесь, что на сайте установлен пакет **[VueTools](/components/vuetools/)**. Он предоставляет Vue 3 и PrimeVue через import maps.
:::

```bash
# Клонирование репозитория
git clone https://github.com/modx-pro/MiniShop3.git
cd MiniShop3

# Установка PHP зависимостей
composer install

# Сборка Vue виджетов (требуется Node.js 18+)
cd vueManager
npm install
npm run build
cd ..

# Сборка и установка компонента
# Откройте _build/build.php в браузере или выполните:
php _build/build.php
```

После установки перейдите в **Extras → MiniShop3** для настройки магазина.

Подробное руководство по первоначальной настройке — на странице [Быстрый старт](quick-start).

## Структура компонента

### Ядро (core/components/minishop3/)

```
core/components/minishop3/
├── bootstrap.php           # Инициализация компонента
├── config/
│   ├── routes/             # Маршруты REST API
│   ├── mgr/                # Конфигурация админки
│   ├── combos/             # Комбобоксы для админки
│   ├── filters/            # Фильтры для гридов
│   └── ms3.services.d/     # Кастомные сервисы
├── controllers/            # Контроллеры страниц админки
├── elements/
│   ├── snippets/           # Сниппеты (msProducts, msCart, msOrder...)
│   ├── chunks/             # Чанки (шаблоны Fenom)
│   ├── plugins/            # MODX плагины
│   ├── tasks/              # Задачи Scheduler
│   └── templates/          # Email-шаблоны
├── lexicon/                # Языковые файлы (en, ru)
├── migrations/             # Миграции Phinx
├── schema/                 # xPDO схема БД
├── seeds/                  # Сиды для БД
├── src/
│   ├── Controllers/        # Бизнес-логика (Cart, Order, Customer)
│   ├── Model/              # xPDO модели
│   ├── Processors/         # AJAX процессоры
│   ├── Services/           # Сервисы (Format, AuthManager...)
│   ├── Notifications/      # Система уведомлений
│   ├── Router/             # Маршрутизатор API
│   ├── Middleware/         # Middleware для API
│   ├── Utils/              # Утилиты (ImportCSV...)
│   ├── MiniShop3.php       # Главный класс компонента
│   └── ServiceRegistry.php # Реестр сервисов
└── vendor/                 # Composer зависимости
```

### Фронтенд (assets/components/minishop3/)

```
assets/components/minishop3/
├── api.php                 # Точка входа REST API
├── connector.php           # AJAX коннектор админки
├── js/
│   ├── mgr/                # JavaScript админки (ExtJS)
│   └── web/                # JavaScript сайта (нативный JS)
├── css/
│   ├── mgr/                # Стили админки
│   └── web/                # Стили сайта
├── img/                    # Изображения
├── payment/                # Обработчики платёжных систем
└── plugins/                # JavaScript плагины
```
