---
title: Системные настройки
---
# Системные настройки

Настройки компонента имеют префикс `localizator_`.

**Где изменить:** **Управление → Системные настройки** — отфильтруйте по названию или найдите ключи с префиксом `localizator_`.

## Обязательная настройка для pdoTools

Для выборки переведённых ресурсов сниппетами pdoTools (pdoResources, pdoMenu и т.д.) замените значение системной настройки **pdoFetch.class** (пространство pdotools) на `pdotools.pdofetchlocalizator`.

## Вывод контента на странице

Все поля ресурса подменяются локализованными значениями, **кроме** поля `content`. Контент выводится через `$_modx->resource.localizator_content` (в Fenom: `{$_modx->resource.localizator_content}`).

## mFilter2

Для корректной работы с mFilter2 укажите в системной настройке **mse2_filters_handler_class** значение `mse2LocalizatorFilter`.

## Таблица настроек Localizator

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `localizator_default_language` | Нет | Ключ локализации по умолчанию (основная языковая версия) |
| `localizator_check_permissions` | Нет | Проверять права на редактирование локализаций ресурса |
| `localizator_disabled_templates` | — | ID шаблонов через запятую; для ресурсов с этими шаблонами вкладка «Локализатор» не показывается |
| `localizator_default_translator` | Yandex | Переводчик для автоперевода: Yandex, Google, DeepL или пусто (копирование без перевода) |
| `localizator_key_yandex` | Нет | API ключ [Яндекс.Переводчика](https://translate.yandex.ru/developers/keys) |
| `localizator_key_google` | Нет | API ключ Google Translate |
| `localizator_key_deepl` | Нет | API ключ DeepL |
| `localizator_translate_fields` | pagetitle, longtitle, … | Список полей для перевода при автопереводе (в т.ч. доп. поля) |
| `localizator_translate_translated` | Нет | При автопереводе переводить **пустые** поля у уже существующих локализаций |
| `localizator_translate_translated_fields` | Нет | При автопереводе перезаписывать все поля локализации |
| `localizator_tv_fields` | Нет | Список доп. полей (TV) для редактирования в локализации. Пусто — все TV с включённой опцией «Доступен в локализациях» в настройках TV; можно указать поля с минусом в начале для исключения (например `-image`) |

## Настройка локализаций типа site.ru/en/

Чтобы работали адреса вида site.ru/en/..., добавьте правила в конфигурацию веб-сервера.

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
