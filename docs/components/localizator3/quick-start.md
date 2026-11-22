---
title: Быстрый старт
description: Установка Localizator3, языки, pdoTools и первый вывод на сайте
---

# Быстрый старт

## Требования

| Требование | Описание |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| VueTools | 1.1.2-pl+ |
| pdoTools | 2.11.3-pl или новее |
| ЧПУ | включены |

## Шаг 1: Установка

1. Подключите провайдер [modstore.pro](https://modstore.pro/info/connection).
2. Установите **VueTools**, затем **Localizator3**.
3. **Управление → Очистить кэш**.

## Шаг 2: Язык по умолчанию

В системных настройках задайте `localizator3_default_language` ключом одного из языков (например `ru`). Пустой ключ заменяется первым активным языком по рангу. Без настройки и без активного языка автоперевод в менеджере и CLI `translate_resources.php` останавливаются с ошибкой.

## Шаг 3: Языки и локализации

1. Откройте меню **Localizator3** (страница «Локализации») и создайте языки:
   - «Ключ локализации» (`ru`, `en`)
   - «Название»
   - «HTTP HOST»
   - «Ключ языка»
   - «Активно»
2. В форме TV включите «TV доступно в локализациях» у нужных полей.
3. У ресурса откройте вкладку **Локализация**, выберите язык, сохраните локализацию. Кнопка «Автоматический перевод» включается у уже сохранённой записи. После этого заполните поля или запустите автоперевод.

Адреса вида `site.ru/en/`: [Системные настройки](settings#настройка-локализаций-типа-site-ru-en).

## Шаг 4: Вывод контента на сайте

Поля ресурса подменяются локализованными значениями. Поле `content` идёт в `localizator3_content`. В Fenom это `{$_modx->resource.localizator3_content}`.

Списки ресурсов выводите через **getLocalizedResources**. Резолвер пишет `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator`. Класс подключает bootstrap пространства имён, локализованная выборка через pdoTools работает.

::: code-group

```fenom
{'!getLocalizedResources' | snippet : [
  'snippet' => 'pdoMenu',
  'parents' => 0,
  'level' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`pdoMenu`
  &parents=`0`
  &level=`1`
]]
```

:::

Переключатель: [Переключение языков](switch-languages). Параметры сниппета: [getLocalizedResources](snippet-localizator).

## Что дальше

- [Системные настройки](settings): переводчики, 404, CLI
- [Сниппет getLocalizedResources](snippet-localizator): pdoMenu, товары, mSearch, Fenom
- [Атрибут hreflang](hreflang-attribute) и [sitemap](sitemap-formation)
