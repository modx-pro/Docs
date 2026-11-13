---
title: Системные настройки
description: Ключи localizator3_*, переводчики, CLI и пути site.ru/en/
---

# Системные настройки

Префикс ключей: `localizator3_`. Пространство имён: `localizator3`.

**Где изменить:** **Система → Системные настройки**, фильтр по `localizator3`.

## Выборка через pdoTools

Списки выводите сниппетом **getLocalizedResources**. Резолвер при установке и обновлении создаёт или перезаписывает `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator` (наследник `Fetch`). Класс подключает bootstrap пространства имён Localizator3 через Composer PSR-4.

## Вывод контента на странице

Плагин подставляет на ресурс поля из `localizator3_translate_fields`. Поле `content` пишется в `localizator3_content` и не заменяет `content` ресурса. Непустые TV из `getTVKeys()` попадают на ресурс.

```fenom
{$_modx->resource.localizator3_content}
```

На вкладке **Локализация** видны только TV с флагом `localizator3_enabled` на форме TV.

## Основные настройки

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `localizator3_default_language` | пусто | Язык по умолчанию. Пустое значение заменяется первым активным языком по рангу: страница, выборка, mSearch, автоперевод, CLI, запрет локализации базового языка. Базовый язык на вкладке скрыт только при заполненной настройке. Без настройки и без активного языка автоперевод и CLI останавливаются с ошибкой |
| `localizator3_default_from_resource` | Нет | Базовый язык из полей и TV ресурса. На вкладке остаются только переводы |
| `localizator3_check_permissions` | Нет | Права по политике LocalizatorManagerPolicy |
| `localizator3_disabled_templates` | пусто | ID шаблонов без вкладки «Локализация», через запятую |
| `localizator3_404_if_no_localization` | Нет | 404 без локализации. Не срабатывает без ключа языка и для базового языка при `localizator3_default_from_resource`. Перед ответом — `OnHasLocalizatorError404`: `false` отменяет 404 |
| `localizator3_auto_detect_language` | Нет | Нет сегмента языка в URL: параметр запроса, иначе cookie `localizator3_key`, иначе Accept-Language. Затем редирект 302 на `http_host` языка и текущий путь запроса |
| `localizator3_request_language_param` | `language` | Имя параметра в `$_REQUEST`. Значение — активный ключ по маске `^[a-z]{2}(-[a-z0-9]{2,8})?$`. Пустое имя отключает проверку |
| `localizator3_debug_log` | Нет | Дополнительный `$modx->log` с префиксами вроде `[localizator3 getformconfig]`. При включённой настройке часть строк — INFO, часть — DEBUG. Ошибка отрисовки TV — ERROR всегда. То же даёт константа `LOCALIZATOR3_DEBUG_LOG`. Лог MODX (обычно `core/cache/logs/error.log`). Для DEBUG нужен `log_level` не строже DEBUG |

## Переводчик

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `localizator3_default_translator` | Yandex | `Yandex`, `Google`, `DeepL`, `LibreTranslate`, `MyMemory`, `SimpleCopy` |
| `localizator3_key_yandex` | пусто | API-ключ Yandex Translate |
| `localizator3_key_google` | пусто | API-ключ Google Cloud Translation |
| `localizator3_key_deepl` | пусто | API-ключ DeepL |
| `localizator3_libretranslate_url` | `http://localhost:5000` | URL LibreTranslate |
| `localizator3_key_libretranslate` | пусто | API-ключ LibreTranslate |
| `localizator3_mymemory_email` | пусто | Email для MyMemory |
| `localizator3_translate_fields` | pagetitle, longtitle, menutitle, seotitle, keywords, introtext, description, content | Поля автоперевода |
| `localizator3_translate_translated` | Нет | Переводить пустые поля у существующих локализаций ресурса |
| `localizator3_translate_translated_fields` | Нет | Ресурс: непустые поля из `translate_fields` перезаписываются только при `localizator3_translate_translated` = Да. Лексикон: достаточно этого флага |

`SimpleCopy` копирует текст без API.

## CLI: массовый перевод

Без `localizator3_default_language` и без активного языка скрипт пишет ошибку в stderr и выходит с кодом 1.

```bash
cd core/components/localizator3/scripts
php translate_resources.php --parents=1 --depth=5
php translate_resources.php --ids=1,2,3 --dry-run
```

В одном запуске учитывается первый из `--ids` и `--parents` в аргументах. Второй не читается.

| Параметр | Описание |
| --- | --- |
| `--ids=1,2,3` | ID ресурсов |
| `--parents=1` | Родитель |
| `--depth=5` | Глубина при `--parents` (по умолчанию 10) |
| `--dry-run` | План без записи |

Переменные окружения: `MODX_BASE_PATH`, `LOCALIZATOR_CONTEXT` (по умолчанию `web`).

## Настройка локализаций типа site.ru/en/

Для `site.ru/en/...` настройте веб-сервер. Примеры не из пакета. В PHP маршрутизация смотрит `http_host` и первый сегмент URL.

### Apache (.htaccess)

```apache
RewriteRule ^(ru|en)/assets(.*)$ assets$2 [L,QSA]
```

### Nginx

```nginx
location ~ ^/(ru|en) {
  rewrite ^/(ru|en)/(favicon.ico|assets.*)$ /$2 redirect;
  try_files $uri $uri/ @rewrite;
}
```
