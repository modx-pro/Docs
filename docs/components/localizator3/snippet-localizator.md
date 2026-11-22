---
title: Сниппет getLocalizedResources
description: Параметры и примеры getLocalizedResources, getLocalizedField и Fenom-модификаторов
---

# Сниппет getLocalizedResources

Выборка ресурсов с учётом текущей локализации. Запускает другой сниппет (pdoResources, pdoMenu, msProducts, ms3Products и др.) и подключает таблицу локализаций.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **snippet** | `pdoResources` | Имя сниппета для запуска. Допустима форма `имя@набор` свойств |
| **class** | `modResource` | Класс объекта. Для `msProducts` и `ms3Products` подставляется класс товара MiniShop3 |
| **localizator3_key** | текущий | Ключ языка |
| **onlyWithLocalization** | Нет | Только ресурсы с записью локализации (INNER JOIN) |

Остальные параметры передаются во внутренний сниппет.

## Примеры

### Вывод через pdoMenu

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

### Вывод ресурсов через pdoPage

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'getLocalizedResources',
  'snippet' => 'pdoResources',
  'parents' => 0,
  'limit' => 10,
  'tpl' => '@INLINE <li><a href="{$uri}">{$pagetitle}</a></li>',
]}
```

```modx
[[!pdoPage?
  &element=`getLocalizedResources`
  &snippet=`pdoResources`
  &parents=`0`
  &limit=`10`
  &tpl=`@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a></li>`
]]
```

:::

### Товары MiniShop3

Имена `msProducts` и `ms3Products` поддерживаются одинаково. Товар наследует ресурс: локализация лежит в `localizator3_content` по `resource_id`. Вкладка **Локализация** открывается и у `msProduct`.

::: code-group

```fenom
{'!getLocalizedResources' | snippet : [
  'snippet' => 'ms3Products',
  'parents' => 5,
  'tpl' => '@INLINE <div><a href="{$uri}">{$pagetitle}</a></div>',
  'onlyWithLocalization' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`ms3Products`
  &parents=`5`
  &tpl=`@INLINE <div><a href="[[+uri]]">[[+pagetitle]]</a></div>`
  &onlyWithLocalization=`1`
]]
```

:::

## Опции MiniShop3

| Модель | Назначение |
| --- | --- |
| `locOption` | caption и description опции по `option_id` и языку |
| `locProductOption` | value опции товара по `product_option_id` и языку |

```fenom
{$option_id | locoptioncaption}
{$option_id | locoptioncaption : 'По умолчанию'}
{$product_option_id | locproductoptionvalue}
{$product_option_id | locproductoptionvalue : '—'}
```

`description` опции через PHP `localizator::getLocalizedOptionDescription($option_id, $default)`. Отдельного Fenom-модификатора нет.

При `localizator3_default_from_resource` и ключе языка по умолчанию `locoptioncaption` и `locproductoptionvalue` возвращают второй аргумент или пустую строку и не читают `locOption` / `locProductOption`.

## Поиск mSearch

Плагин на событиях mSearch добавляет в индекс поля вида `{ключ}-{поле}`: `en-pagetitle`, `en-content`. После правки локализации переиндексируйте каталог в mSearch.

Для языка, отличного от `localizator3_default_language`, в вызове mSearch обычно нужен параметр `fields` с префиксами ключа. Контракт сниппета mSearch сверяйте по его документации.

## Поле другого ресурса

Сниппет **getLocalizedField**:

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **id** | текущий ресурс | ID ресурса. Пустые `null` и `''` берут текущий ресурс. Явный `&id` нужен для чужого ресурса |
| **field** | `pagetitle` | Поле или TV |
| **language** | текущий | Ключ языка |
| **default** | пусто | Запасное значение. При обычном ключе: если нет активной локализации и пусто поле ресурса. При `localizator3_default_from_resource` и ключе по умолчанию локализация не читается: пустое поле ресурса отдаёт `default` даже при заполненной записи |

::: code-group

```fenom
{'!getLocalizedField' | snippet : [
  'id' => 12,
  'field' => 'pagetitle',
  'language' => 'en',
]}
```

```modx
[[!getLocalizedField?
  &id=`12`
  &field=`pagetitle`
  &language=`en`
]]
```

:::

При `localizator3_default_from_resource = true` и ключе `localizator3_default_language` значение берётся из полей ресурса: строка `localizator3_content` не читается, даже с `active` = 1. Для другого ключа в запрос входит `active` = 1; пустая или неактивная строка заменяется полем ресурса, затем `default`. Для TV нужен флаг `localizator3_enabled`, иначе берётся TV ресурса.

## Модификатор locfield

Нечисловой первый аргумент: имя поля текущего ресурса.

```fenom
{'pagetitle' | locfield}
{$id | locfield : 'pagetitle'}
{$id | locfield : 'introtext'}
```

## TV в локализациях

На форме TV включите «TV доступно в локализациях». Тогда поле появится на вкладке **Локализация**. Автоперевод обходит вложенные поля MIGX, только если имя TV есть в `localizator3_translate_fields`. В списке по умолчанию имён TV нет.
