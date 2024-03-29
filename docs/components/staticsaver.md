---
title: StaticSaver
---
# StaticSaver

StaticSaver - это плагин для MODX Revolution, который автоматически устанавливает значения имен и источников файлов у элементов (шаблонов, чанков, сниппетов, дополнительных полей или плагинов), когда вы делаете их статическими. Полезно для разработчиков, использующих локальные IDE.

## Установка и настройка

Установите пакет через Управление пакетами из [официального Репозитория](http://modx.com/extras/package/staticsaver).

После этого вам потребуется настроить **Источники Файлов** и **Настройки системы**. Найти требуемые настройки можно с помощью фильтра по пространству имен "**staticsaver**".

Подробное видео по настройке StaticSaver можно [посмотреть на YouTube](http://www.youtube.com/watch?v=l3ObHPfFKTM).

## Системные настройки StaticSaver

| Название                                       | По умолчанию | Описание                                                                                                                                                                             |
| ---------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **staticsaver.include_category**               | `false`      | Добавляет папку с именем категории в путь до элемента. Например, Сниппет MySnippet в категории MyCategory будет находиться в ***путь_до_источника_файлов/MyCategory/MySnippet.php*** |
| **staticsaver.static_default**                 | `false`      | Все элементы при открытии формы редактирования элемента устанавливаются статическими автоматически.                                                                                  |
| **staticsaver.static_file_extension**          | `php`        | Расширение файла всех элементов. Имеет высший приоритет. Установите пустое значение, чтобы настроить различные расширения для разных элементов.                                      |
| **staticsaver.static_chunk_file_extension**    | `php`        | Расширение файлов чанков. См. описание static_file_extension.                                                                                                                        |
| **staticsaver.static_plugin_file_extension**   | `php`        | Расширение файлов плагинов. См. описание static_file_extension.                                                                                                                      |
| **staticsaver.static_snippet_file_extension**  | `php`        | Расширение файлов сниппетов. См. описание static_file_extension.                                                                                                                     |
| **staticsaver.static_template_file_extension** | `php`        | Расширение файлов шаблонов. См. описание static_file_extension.                                                                                                                      |
| **staticsaver.static_tv_file_extension**       | `php`        | Расширение файлов дополнительных полей. См. описание static_file_extension.                                                                                                          |
| **staticsaver.static_chunk_media_source**      | `1`          | Источник файлов чанков.                                                                                                                                                              |
| **staticsaver.static_plugin_media_source**     | `1`          | Источник файлов плагинов.                                                                                                                                                            |
| **staticsaver.static_snippet_media_source**    | `1`          | Источник файлов сниппетов.                                                                                                                                                           |
| **staticsaver.static_template_media_source**   | `1`          | Источник файлов шаблонов.                                                                                                                                                            |
| **staticsaver.static_tv_media_source**         | `1`          | Источник файлов дополнительных полей.                                                                                                                                                |

## Разработка дополнения

О предложениях и ошибках в работе StaticSaver сообщайте на [GitHub](https://github.com/argnist/StaticSaver/issues/).

### Планы на будущее

- Автоматическое создание источников файлов при установке
- Уменьшение количества настроек за счет перевода их в формат JSON
