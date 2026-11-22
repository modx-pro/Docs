---
title: События
description: События Localizator3 при сохранении локализаций, поиске языка и построении вкладок
---

# События

## Локализации ресурса

| Событие | Когда | Параметры |
| --- | --- | --- |
| `OnBeforeSaveLocalization` | Перед созданием и обновлением | `mode`, `id`, `data`, `localizatorContent` (объект), `object` |
| `OnSaveLocalization` | После создания и обновления | `mode` (`new` / `upd`), `id`, `localizatorContent` (объект), `object`. Ключей `data` и `objectType` нет |
| `OnBeforeRemoveLocalization` | Перед удалением | `id`, `localizatorContent`, `object` |
| `OnRemoveLocalization` | После удаления | `id`, `localizatorContent`, `object` |

## Языки

| Событие | Когда | Параметры |
| --- | --- | --- |
| `OnBeforeSaveLocalizatorLanguage` | Перед созданием и обновлением языка | `mode`, `id`, `data`, `localizatorLanguage` (объект), `object` |
| `OnSaveLocalizatorLanguage` | После создания и обновления языка | `mode` (`new` / `upd`), `id`, `localizatorLanguage` (объект), `object`. Ключей `data` и `objectType` нет |

## Определение языка и ресурса

| Событие | Когда | Параметры |
| --- | --- | --- |
| `OnBeforeFindLocalization` | Перед поиском языка по хосту и URL | `language` (ссылка), `http_host`, `request`. Непустая строка из плагина обрывает поиск. `return false` поиск не останавливает. Сообщение на страницу не выводится |
| `OnFindLocalization` | После попытки поиска, в том числе без языка | `language`, `http_host`, `request`. Не вызывается при обрыве `OnBeforeFindLocalization` и при редиректе 302 автоопределения |
| `OnToggleLocalizatorLanguage` | После установки текущего языка | `language`, `language_key`, `http_host`, `request`. С полной страницы и через коннектор (Referer) вызывается при каждом найденном языке. Пропуск при тех же ключе и `cultureKey` — только у повторной установки через параметр `language` или cookie |
| `OnFindLocalizatorResource` | При поиске ресурса | `resource` (ссылка, старт `false`), `request`. Если плагин заполнил `resource`, штатный `findResource()` не вызывается |
| `OnHasLocalizatorError404` | Перед 404 при отсутствии локализации | `resource`, `language_key`. Только при включённой `localizator3_404_if_no_localization`, непустом ключе языка и когда поля берутся не из ресурса базового языка |

::: warning
Верните `false` из обработчика `OnHasLocalizatorError404`, чтобы не отдавать страницу ошибки. Ядро при этом может записать в журнал, что плагин failed.
:::

## Форма локализации

| Событие | Когда | Параметры |
| --- | --- | --- |
| `OnBuildLocalizationTabs` | Построение вкладок формы | зависит от вызывающего процессора |

Активный путь вкладки Vue (`mgr/content/getformconfig`). `localizatorContent` всегда `null`, `tabs` (ссылка), `resource`, `user`, `customization` (ссылка с `user_id`, `resource_id`, `context_key`, `class_key`). Через `tabs` и `customization` можно добавить свои поля, если правка попала в `$modx->event->returnedValues` и вывод плагина пустой.

Устаревший процессор `mgr/fields`. `localizatorContent` по ссылке. `tabs` и `customization` без ссылки. В `customization` только `user_id` и `resource_id`. После события в форму читаются только `tabs` (через `$modx->event->returnedValues['tabs']` при пустом выводе плагина). `customization` в форму не подставляется.
