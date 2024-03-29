---
title: WebDAV
description: WebDAVMediaSource — сетевой медиаисточник для MODX Revolution
logo: https://modstore.pro/assets/extras/webdav/logo-lg.jpg
author: 13hakta
modstore: https://modstore.pro/packages/photos-and-files/webdav
modx: https://extras.modx.com/package/webdav
repository: https://github.com/13hakta/modx-WebDAV
---
# WebDAV

WebDAVMediaSource сетевой медиа источник для MODX Revolution.

Поддерживаемые операции:

- Перечислить содержимое каталога
- Загрузить файлы
- Создать файл
- Редактировать файл
- Удалить каталог/файл
- Переносить элементы в дереве перетягиванием
- Кэшировать содержимое каталога и мета-информацию о файле
- Получать ресурс опосредованно через сайт

Поддерживает схемы БД MySQL и SQLSrv. Работает с протоколом WebDAV v1. На текущий момент блокировка не поддерживается.

Проверено с SabreDAV, CloudMe.com, Yandex Disk.

## Параметры

| Имя                  | Значение по умолчанию                        | Описание                                                                                                                                                    |
| -------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **allowedFileTypes** |                                              | Если указано, будут отображены файлы только с перечисленными расширениями. Укажите список, через запятую, без знака «.»                                     |
| **authMethod**       |                                              | Схема авторизации: basic или digest. Выберите схему, поддерживаемую на сервере                                                                              |
| **basePath**         |                                              | Путь к файлам источника.                                                                                                                                    |
| **baseUrl**          |                                              | URL, по которому будет доступен этот источник файлов. Не учитывается если включено проксирование.                                                           |
| **cached**           | `false`                                      | Кэшировать содержимое каталогов                                                                                                                             |
| **cacheTime**        | `10`                                         | Время хранения кэша в минутах                                                                                                                               |
| **imageExtensions**  | `jpg,jpeg,png,gif`                           | Список расширений файлов, через запятую, являющихся изображениями. MODX попытается создать превью для файлов с этими расширениями.                          |
| **login**            |                                              | Имя пользователя                                                                                                                                            |
| **password**         |                                              | Пароль                                                                                                                                                      |
| **preview**          | `false`                                      | Создавать миниатюры для изображений. Может сильно нагрузить сетевой канал, поскольку требуется полностью скачать удаленный файл. Включайте с осторожностью. |
| **proxy**            | `false`                                      | Получать ресурс опосредованно через сайт если публично сервер недоступен                                                                                    |
| **server**           |                                              | Адрес сервера в формате proto://host. Порт можно указать после двоеточия                                                                                    |
| **skipFiles**        | `.svn,.git,_notes,nbproject,.idea,.DS_Store` | Список, через запятую. MODX будет пропускать и скрывать файлы и папки, совпадающие с любой из масок.                                                        |
| **thumbnailQuality** | `90`                                         | Качество генерируемых превью, по шкале от 0 до 100.                                                                                                         |
| **thumbnailType**    | `png`                                        | Тип изображения, используемый для создаваемых превью.                                                                                                       |
| **verifySSL**        | `true`                                       | Проверять SSL сертификаты                                                                                                                                   |

## Политика безопасности

| Название | Описание                      |
| -------- | ----------------------------- |
| **load** | Возможность скачивать объекты |

## Скачивание через посредника

Если сервер WebDAV не дает прямого доступа к скачиванию файлов вы можете захотеть воспользоваться процессором-посредником.
URL создается из: `http://yoursite.ru/assets/components/webdav/index.php?ctx=web&action=proxy&source=SOURCEID&src=path/file.ext`
Как видите в параметрах указываются sourceID и путь к файлу, но оно замкнуто для работы только с WebDAV источниками.
