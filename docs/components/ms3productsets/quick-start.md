---
title: Быстрый старт
---
# Быстрый старт

Подключение блоков рекомендаций (подборок товаров) к сайту с MiniShop3.

**Имена сниппетов:** `ms3ProductSets`, `mspsLexiconScript`.

Примеры на **Fenom** требуют [pdoTools](/components/pdotools/) **3.x**.

## Установка

### Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MiniShop3 | установлен |
| pdoTools | 3.0.0+ |
| VueTools | установлен (страница админки «Подборки товаров») |

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3**, **pdoTools** и **VueTools**
4. Найдите **ms3ProductSets** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

Откройте **Компоненты → Подборки товаров** и создайте первый шаблон. Сценарии: [interface/flows](interface/flows).

![Админка подборок](/components/ms3productsets/screenshots/page-overview.png)

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

## Шаг 1: Лексикон, стили и скрипт

В шаблоне (или общем head/footer) подключите **сначала** лексикон, затем CSS и JS.

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js" defer></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js" defer></script>
```

:::

## Шаг 2: Блок в карточке товара

В шаблоне страницы товара (или в чанке карточки в списке) вызовите сниппет **`ms3ProductSets`**.

### Параметр `type`

**`type`** задаёт сценарий подборки: какие ручные связи читаются из `ms3_product_sets` и какая авто-логика включается, если связей нет. Общая схема: [Типы подборок](types), раздел «Общие правила (для всех типов)».

| `type` | Назначение |
|--------|------------|
| **`buy_together`** | Блок «с этим товаром покупают». Авто: co-purchase по заказам, иначе категория. |
| **`similar`** | Похожие товары из той же категории. |
| **`popcorn`** | Компактные импульсные допродажи. Свой запасной вариант, если по категории пусто. |
| **`cart_suggestion`** | Рекомендации в корзине или перед оформлением. Удобно с `category_id`. |
| **`auto_sales`** | Подборка по статистике заказов. При нехватке данных уходит в логику **`similar`**. |
| **`vip`** | Фиксированные промо-наборы из `vip_set_*`. Без `set_id` берётся `vip_set_1`. |
| **`auto`** | Универсальный блок (главная, лендинг). Часто **`category_id`** и/или **`resource_id`**. |

Ниже пример с **`buy_together`**.

Другие параметры вызова:

- **`resource_id`:** ID товара, для которого строится подборка. На странице товара это текущий ресурс.
- **`max_items`:** максимум позиций в блоке (диапазон **1…100**).
- **`tpl`:** чанк одной строки товара. В поставке по умолчанию подходит **`tplSetItem`**.

Если подборка пустая, сниппет по умолчанию возвращает пустую строку (`hideIfEmpty=true`). Обёртку с заголовком вешайте через условный вывод или placeholder. Пример с секцией и лексиконом: [Интеграция на сайт](integration). Детали по каждому **`type`:** [Типы подборок](types).

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## Шаг 3: Проверьте результат

- Откройте страницу товара.
- Если для товара есть ручные связи, блок покажет их.
- Если ручных связей нет, сработает авто-логика выбранного типа.
- Если подборка пустая, блок не выводится (по умолчанию `hideIfEmpty=true`).

## Шаг 4: VIP-набор (опционально)

1. Заполните настройку `ms3productsets.vip_set_1` (пример: `12,34,56`).
2. Выведите блок:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &tpl=`tplSetVIP`
]]
```

:::

## Что дальше

- [Типы подборок](types)
- [Сценарии в админке](interface/flows)
- [Интеграция на сайт](integration)
- [API и интерфейсы](api)
- [Руководство по админке](admin)
