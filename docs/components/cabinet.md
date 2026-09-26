---
title: Cabinet
description: Личный кабинет пользователя
logo: https://modstore.pro/assets/extras/cabinet/logo.png
author: prihod
modstore: https://modstore.pro/packages/users/cabinet
---

# Cabinet

Cabinet - Комплексное решение для быстрого внедрения личного кабинета пользователя в MODX Revolution. Идеально подходит как для
опытных разработчиков, так и для новичков.

## ✨ Основные возможности

- Автоматическая настройка прав доступа
- Автоматическое создание страниц и разделов
- Поддержка модального режима работы
- Интеграция с социальными сетями для регистрации/авторизации
- Верификация телефона через SMS/Voice OTP
- Интеграция с дополнениями:
  - [miniShop2](https://modstore.pro/packages/ecommerce/minishop2)
  - [Polylang](https://modstore.pro/packages/other/polylang)
  - [MyFavorites](https://modstore.pro/packages/other/myfavorites)
  - [msInShopNotify](https://modstore.pro/packages/alerts-mailing/msinshopnotify)
  - [msMultiCurrency](https://modstore.pro/packages/integration/msmulticurrency)
- Расширенные возможности для интернет-магазина:
  - Автоматическая авторизация при первом заказе
  - История и управление заказами
  - Повторный заказ товаров
  - Шаринг заказов
- Гибкое управление профилем пользователя
- Защита от CSRF-атак
- Интеграция с reCAPTCHA 3
- Bootstrap 5
- Нативный JavaScript

## 🎬 Демонстрационное видео

[![Демонстрационное видео](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/video-cover.jpg)](https://youtu.be/I5pu-droYPM)

[RuTube](https://rutube.ru/video/734a3c496022641c991a15b658b7ecc3/)

## 🚀 Быстрый старт

### Установка

При установке дополнения в окне "Опции установки" доступны следующие настройки:

- Группа пользователей для доступа к приватным страницам (создаётся автоматически при отсутствии)
- Режим регистрации:
  - E-mail - с подтверждением через электронную почту
  - Телефон - с подтверждением через SMS или звонок
- Режим работы:
  - Модальное окно с AJAX запросами
  - Стандартные страницы
- Настройка создаваемых страниц:
  - Название
  - Псевдоним (alias)
  - Родительский ресурс
  - Тип доступа (приватная/публичная)
  - Статус показа в меню
  - Шаблон
  - Содержимое

[![Настройка установки](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/install.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/install.png)

[![Основные опции](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/base.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/base.png)

### Регистрация и авторизация

Для вывода ссылок регистрации/авторизации и меню кабинета используйте сниппет:

```modx
[[!cabinetLogin]]
```

При использовании модального режима добавьте в футер каждой страницы:

```modx
[[!cabinetAuth]]
```

#### Форма регистрации

В зависимости от выбранного режима регистрации в чанке `cabinet.auth` у формы регистрации можно оставить минимальный набор полей:

- Для режима `E-mail`: только поле электронной почты
- Для режима `Телефон`: только поле телефона

По умолчанию требуется подтверждение данных при регистрации. Для отключения этой функции установите системную настройку
`Активация пользователя` (ключ cabinet_auth_activation) в значение `Нет`. При отключенной активации форма регистрации
должна обязательно содержать поле пароля.

## ⚙️ Системные настройки

### Авторизация

[![Опции авторизации](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/auth.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/auth.png)

### SMS/Voice OTP

#### Настройка провайдера

В системных настройках в разделе "OTP":

1. Укажите класс провайдера в опции `Класс провайдера SMS и Voice OTP` (cabinet_phone_handler_class)
2. По умолчанию установлен `CabinetPhoneLog` - тестовый провайдер, записывающий информацию в лог MODX
3. Настройте параметры выбранного провайдера в соответствующей опции конфигурации

#### Настройка режима работы

- Выберите режим OTP в опции `Режим OTP для телефона` (cabinet_otp_phone_mode):
  - `sms` - подтверждение через SMS
  - `call` - подтверждение через звонок

#### Настройки безопасности

- Установите лимит повторных запросов кода в опции `Лимит повторных запросов кода` (cabinet_otp_phone_sending_limit)
- Настройте время блокировки в опции `Время блокировки повторных запросов кода` (cabinet_otp_phone_sending_lock_time)
  - Значение указывается в минутах
  - По умолчанию: 360 минут (6 часов)

#### Поддерживаемые провайдеры

| Провайдер                                   | Страна | SMS | Voice | Опция конфигурации         |
|---------------------------------------------|--------|-----|-------|----------------------------|
| [CabinetGreenSms](https://greensms.ru/)     | RU     | ✓   | ✓     | cabinet_greensms_config    |
| [CabinetTeraSms](https://terasms.ru/)       | RU     | ✓   | ✓     | cabinet_terasms_config     |
| [CabinetAlphaSms](https://alphasms.ua/)     | UA     | ✓   | ✓     | cabinet_alphasms_config    |
| [CabinetSmsClubMobi](https://smsclub.mobi/) | UA     | ✓   | ✗     | cabinet_smsclubmobi_config |
| CabinetPhoneLog                             | Demo   | ✓   | ✓     | -                          |

Возможно бесплатное добавление новых провайдеров при наличии PHP API библиотеки.

[![Опции OTP](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/otp.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/otp.png)

### Социальные сети

#### Основные настройки

В системных настройках пакета, в разделе "Соцсети", доступны следующие опции:

1. **`Использовать социальные сети` (ключ cabinet_social_providers):**
   Укажите через запятую названия социальных сетей, которые будут доступны клиенту для регистрации и авторизации.

2. **`Авторизация пользователей через социальные сети` (ключ cabinet_social_login):**
   Позволяет разрешить или запретить пользователям авторизоваться через социальные сети.

3. **`Регистрировать новых пользователей через социальные сети` (ключ cabinet_social_signup):**

- Разрешает или запрещает регистрацию новых пользователей через социальные сети.
- Если регистрация отключена, но опция "Авторизация пользователей через социальные сети" включена, пользователи смогут добавлять социальные сети для авторизации в настройках своего профиля.

4. **`Включить социальные сети` (ключ cabinet_enable_socials):**
   Позволяет глобально включать или отключать использование социальных сетей.

#### Поддерживаемые социальные сети

| Сеть          | Опция конфигурации           |
|---------------|------------------------------|
| Google        | cabinet_social_Google        |
| Yandex        | cabinet_social_Yandex        |
| Mailru        | cabinet_social_Mailru        |
| Vkontakte     | cabinet_social_Vkontakte     |
| Odnoklassniki | cabinet_social_Odnoklassniki |
| Facebook      | cabinet_social_Facebook      |
| Instagram     | cabinet_social_Instagram     |
| Twitter       | cabinet_social_Twitter       |
| LinkedIn      | cabinet_social_LinkedIn      |
| GitHub        | cabinet_social_GitHub        |

Инструкции по получению API ключей для большинства провайдеров можно посмотреть [тут](https://docs.modx.pro/components/hybridauth/providers/).

[![Опции социальных сетей](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/socials.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/socials.png)

### Безопасность

[![Опции безопасности](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/security.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/security.png)

### reCAPTCHA 3

Интеграция с Google reCAPTCHA 3 для защиты от автоматизированных атак.

[![Опции reCAPTCHA 3](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/recaptcha.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/recaptcha.png)

## 🧩 Сниппеты

### cabinetLogin

Сниппет для вывода ссылок регистрации/авторизации или меню авторизованного пользователя.

#### Параметры

| Параметр      | По умолчанию                 | Описание                                                                                                        |
|---------------|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| cabinetPageId | 0                            | ID страницы кабинета. При 0 значении используется значение из системной опции `cabinet_home_page_id`            |
| loginPageId   | 0                            | ID страницы после авторизации.  При 0 значении используется значение из системной опции `cabinet_login_page_id` |
| logoutPageId  | 0                            | ID страницы после выхода.  При 0 значении используется значение из системной опции `cabinet_logout_page_id`     |
| tpl           | cabinet.login                | Чанк оформления                                                                                                 |
| tplWrapper    | -                            | Чанк-обертка                                                                                                    |
| gravatarUrl   | <https://gravatar.com/avatar/> | URL сервиса Gravatar                                                                                            |
| css           | -                            | Путь к CSS файлу                                                                                                |
| js            | -                            | Путь к JavaScript файлу                                                                                         |

### cabinetAuth

Сниппет для вывода форм авторизации, регистрации и восстановления пароля.

#### Параметры

| Название          | Значение по умолчанию                           | Описание                                                                                                                                           |
|-------------------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| groups            | -                                               | Список групп для регистрации пользователя, через запятую. При пустом значении используется значение из системной опции `cabinet_auth_user_group`   |
| addContexts       | -                                               | Дополнительные контексты, через запятую. Например, &addContexts=`web,ru,en`                                                                        |
| widget            | login                                           | Активный widget формы. Допустимые значения: login; register; recovery                                                                              |
| loginPageId       | 0                                               | ID страницы, на который отправлять юзера после авторизации. При 0 значении используется значение из системной опции `cabinet_login_page_id`        |
| logoutPageId      | 0                                               | ID страницы, на который отправлять юзера после завершения сессии. При 0 значении используется значение из системной опции `cabinet_logout_page_id` |
| tpl               | cabinet.login                                   | Имя чанка для оформления результата работы сниппета                                                                                                |
| tplWrapper        | cabinet.auth.wrapper                            | Имя чанка-обертки на результатом работы сниппета                                                                                                   |
| tplMessageWrapper | cabinet.message.wrapper                         | Имя чанка-обертки для сообщений формы                                                                                                              |
| css               | {assets_url}components/cabinet/css/web/auth.css | Ссылка на подключаемый css файл стилей                                                                                                             |
| js                | {assets_url}components/cabinet/js/web/auth.js   | Ссылка на подключаемый js скрипт                                                                                                                   |

### cabinetProfile

Сниппет для вывода формы профиля пользователя.

#### Параметры

| Название          | Значение по умолчанию                                                                                                                                              | Описание                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| allowedFields     | username:50, email:50, fullname:50, phone:12, mobilephone:12, dob:10, gender, address, country, city, state, zip, fax, comment, specifiedpassword, confirmpassword | Список разрешенных для редактирования полей юзера, через запятую. Также можно указать максимальную. длину значений, через двоеточие. |
| avatar            | `{"w":200,"h":200,"zc":0,"bg":"ffffff","f":"jpg"}`                                                                                                                 | JSON строка с параметрами конвертации аватара при помощи phpThumb                                                                   |
| avatarPath        | images/avatar/                                                                                                                                                     | Директория для сохранения аватаров пользователей внутри MODX_ASSETS_PATH                                                            |
| gravatarUrl       | <https://gravatar.com/avatar/>                                                                                                                                       | Gravatar Url                                                                                                                        |
| requiredFields    | username,email                                                                                                                                                     | Список обязательных полей при редактировании. Эти поля должны быть заполнены для успешного обновления профиля.                      |
| tpl               | cabinet.profile                                                                                                                                                    | Имя чанка для оформления результата работы сниппета                                                                                 |
| tplWrapper        | cabinet.profile.wrapper                                                                                                                                            | Имя чанка-обертки на результатом работы сниппета                                                                                    |
| tplMessageWrapper | cabinet.message.wrapper                                                                                                                                            | Имя чанка-обертки для сообщений формы                                                                                               |
| css               | {assets_url}components/cabinet/css/web/profile.css                                                                                                                 | Ссылка на подключаемый css файл стилей                                                                                              |
| js                | {assets_url}components/cabinet/js/web/profile.js                                                                                                                   | Ссылка на подключаемый js скрипт                                                                                                    |

### cabinetOrders

Сниппет для вывода списка заказов пользователя.

[![Вывода списка заказов](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/orders.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/orders.png)

#### Параметры

| Название             | Значение по умолчанию                                                                                | Описание                                                                                                                                                                                        |
|----------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| statusAlias          | -                                                                                                    | JSON строка с альтернативным ID статуса заказа. Пример: {6:1,8:11} где 6 текущий статус заказа, а 1 статус который увидит клиент                                                                |
| allowCancelStatuses  | 1                                                                                                    | Список ID статусов заказа, через запятую, для которых разрешена отмена заказа клиентом                                                                                                          |
| cancelledStatus      | 4                                                                                                    | ID статуса для заказа отмененного клиентом                                                                                                                                                      |
| excludeStatuses      | 5                                                                                                    | Список ID статусов заказа, которые следует исключить из вывода в фильтре                                                                                                                        |
| criteriaAvailability | `{"published":1,"deleted":0}`. Пример расширения значения по умолчанию: `{"price:>":0,"count:!=":0}` | JSON строка с дополнительными критериями проверки товара на его доступность для заказа                                                                                                          |
| sharePageId          | 0                                                                                                    | ID страницы для вывода расшаренного заказа. При 0 значении используется значение из системной опции `cabinet_shared_order_page_id`                                                              |
| detailsPageId        | 0                                                                                                    | ID страницы для вывода детальной информации о заказе. При 0 значении используется значение из системной опции  `cabinet_order_details_page_id`                                                  |
| thumbs               |                                                                                                      | Список размеров превьюшек для выборки, через запятую. Например: "120x90,360x240" дадут плейсхолдеры `[[+120x90]]` и `[[+360x240]]`. Картинки должны быть заранее сгенерированы в галерее товара |
| currencySymbol       | symbol_right                                                                                         | Колонка с символом валюты в модуле msMultiCurrency. Допустимые значения: symbol_left; symbol_right                                                                                              |
| limit                | 12                                                                                                   | Лимит выборки результатов                                                                                                                                                                       |
| offset               | 0                                                                                                    | Пропуск результатов с начала выборки                                                                                                                                                            |
| sortby               | createdon                                                                                            | Поле для сортировки выборки                                                                                                                                                                     |
| sortdir              | DESC                                                                                                 | Направление сортировки                                                                                                                                                                          |
| where                |                                                                                                      | Дополнительные параметры выборки, закодированные в JSON                                                                                                                                         |
| return               | tpl                                                                                                  | Способ вывода результатов. Допустимые значения: tpl и data                                                                                                                                      |
| tpl                  | cabinet.orders                                                                                       | Имя чанка для оформления результата работы сниппета                                                                                                                                             |
| tplWrapper           | -                                                                                                    | Имя чанка-обертки на результатом работы сниппета                                                                                                                                                |
| tplMessageWrapper    | cabinet.message.wrapper                                                                              | Имя чанка-обертки для сообщений формы                                                                                                                                                           |
| css                  | -                                                                                                    | Ссылка на подключаемый css файл стилей                                                                                                                                                          |
| js                   | {assets_url}components/cabinet/js/web/orders.js                                                      | Ссылка на подключаемый js скрипт                                                                                                                                                                |

### cabinetOrderDetails

Сниппет для вывода детальной информации о заказе.

[![Вывод деталей заказа](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/order_details.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/order_details.png)

#### Параметры

| Название | Значение по умолчанию | Описание                                            |
|----------|-----------------------|-----------------------------------------------------|
| tpl      | cabinet.order.details | Имя чанка для оформления результата работы сниппета |

Данный сниппет является оберткой над `cabinetOrders` и включает в себя все его параметры.

### cabinetOrdersStats

Сниппет для вывода общей статистки по заказам.

#### Параметры

| Название          | Значение по умолчанию | Описание                                                                                           |
|-------------------|-----------------------|----------------------------------------------------------------------------------------------------|
| activeStatuses    | 1                     | Список ID статусов активных заказов, через запятую                                                 |
| cancelledStatuses | 4                     | Список ID статусов отмененных заказов, через запятую                                               |
| completedStatuses | 2,3                   | Список ID статусов завершенных заказов, через запятую                                              |
| currencySymbol    | symbol_right          | Колонка с символом валюты в модуле msMultiCurrency. Допустимые значения: symbol_left; symbol_right |
| return            | tpl                   | Способ вывода результатов. Допустимые значения: tpl и data                                         |
| tpl               | cabinet.orders.stats  | Имя чанка для оформления результата работы сниппета                                                |
| tplWrapper        | -                     | Имя чанка-обертки на результатом работы сниппета                                                   |
| css               | -                     | Ссылка на подключаемый css файл стилей                                                             |
| js                | -                     | Ссылка на подключаемый js скрипт                                                                   |

### cabinetSharedOrder

Сниппет для вывода расшаренного заказа.

#### Параметры

| Название          | Значение по умолчанию   | Описание                                                                                                                                                                                    |
|-------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| thumbs            |                         | Список размеров превьюшек для выборки, через запятую. Например: "120x90,360x240" дадут плейсхолдеры [[+120x90]] и [[+360x240]]. Картинки должны быть заранее сгенерированы в галерее товара |
| currencySymbol    | symbol_right            | Колонка с символом валюты в модуле msMultiCurrency. Допустимые значения: symbol_left; symbol_right                                                                                          |
| tpl               | cabinet.shared.order    | Имя чанка для оформления результата работы сниппета                                                                                                                                         |
| tplWrapper        | -                       | Имя чанка-обертки на результатом работы сниппета                                                                                                                                            |
| tplMessageWrapper | cabinet.message.wrapper | Имя чанка-обертки для сообщений формы                                                                                                                                                       |
| css               | -                       | Ссылка на подключаемый css файл стилей                                                                                                                                                      |
| js                | -                       | Ссылка на подключаемый js скрипт                                                                                                                                                            |

## 📫 Системные события

### cabinetBeforeMakeUrl

Событие перед созданием URL.

#### Параметры

| Параметр | Описание                                                          |
|----------|-------------------------------------------------------------------|
| id       | ID ресурса                                                        |
| url      | Итоговый URL (если не пусто, событие cabinetMakeUrl не сработает) |
| context  | Контекст для ограничения создания URL                             |
| args     | Строка запроса                                                    |
| scheme   | Формат создания URL                                               |
| options  | Массив параметров                                                 |
| tools    | Экземпляр CabinetTools                                            |

### cabinetMakeUrl

Событие создания URL

#### Параметры

| Название | Описание                                                  |
|----------|-----------------------------------------------------------|
| id       | ID ресурса, к которому создаётся URL-адрес                |
| url      | Конечное значение URL-адреса                              |
| context  | Задаёт контекст для ограничения создания URL-адреса       |
| args     | Строка запроса, добавляемая к сгенерированному URL-адресу |
| scheme   | Схема показывает, в каком формате создаётся URL-адрес    |
| options  | Массив параметров для создания URL-адреса ресурса         |
| tools    | Ссылка на инстанс класса  CabinetTools                    |

### cabinetIsAvailableProduct

Событие получения статуса доступности товара для заказа

#### Параметры

| Название  | Описание                                      |
|-----------|-----------------------------------------------|
| id        | ID товара                                     |
| data      | Данные товара в виде массива                  |
| available | Статус доступности. Допустимые значения 0 и 1 |
| tools     | Ссылка на инстанс класса  CabinetTools        |

### cabinetBeforePrepareOrderProduct

Событие подготовки данных товара из заказа

#### Параметры

| Название   | Описание                               |
|------------|----------------------------------------|
| order_id   | ID заказа                              |
| product_id | ID товара                              |
| data       | Данные товара в виде массива           |
| order      | Ссылка на инстанс класса msOrder       |
| tools      | Ссылка на инстанс класса  CabinetTools |

### cabinetBeforeUploadAvatar

Событие перед загрузкой аватарки

#### Параметры

| Название | Описание                               |
|----------|----------------------------------------|
| userId   | ID пользователя                        |
| user     | Ссылка на инстанс класса  modUser      |
| file     | Файл аватарки                          |
| tools    | Ссылка на инстанс класса  CabinetTools |

### cabinetUploadAvatar

Событие загрузки аватарки

#### Параметры

| Название | Описание                               |
|----------|----------------------------------------|
| userId   | ID пользователя                        |
| user     | Ссылка на инстанс класса  modUser      |
| file     | Файл аватарки                          |
| url      | Url на загруженную аватарку            |
| tools    | Ссылка на инстанс класса  CabinetTools |

### cabinetBeforeRemoveAvatar

Событие перед удалением аватарки

#### Параметры

| Название | Описание                               |
|----------|----------------------------------------|
| userId   | ID пользователя                        |
| user     | Ссылка на инстанс класса  modUser      |
| file     | Файл аватарки                          |
| tools    | Ссылка на инстанс класса  CabinetTools |

### cabinetRemoveAvatar

Событие удаление аватарки

#### Параметры

| Название | Описание                               |
|----------|----------------------------------------|
| userId   | ID пользователя                        |
| user     | Ссылка на инстанс класса  modUser      |
| tools    | Ссылка на инстанс класса  CabinetTools |

## 💻 Разработка

### Лексиконы

Все сообщения и уведомления находятся в лексиконах:

- Тема `auth`: сообщения авторизации
- Тема `profile`: сообщения профиля

[![](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_auth.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_auth.png)

[![](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_profile.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_profile.png)

### Консольные скрипты

**core/components/cabinet/scripts/generate_orders_share_key.php**
Скрипт для генерации ключей шаринга заказов, созданных до установки Cabinet.
