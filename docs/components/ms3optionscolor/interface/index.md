---
title: Обзор менеджера
description: CMP словаря и RAL, вкладка Swatches, чипы опции
---

# Обзор менеджера

Раздел **Компоненты → ms3OptionsColor** открывается из меню или по ссылке `manager/?a=index&namespace=ms3optionscolor`. Интерфейс на Vue 3 и PrimeVue через VueTools.

![CMP: словарь](/components/ms3optionscolor/screenshots/overview.png)

Пошаговые сценарии: [Сценарии](flows).

```mermaid
flowchart TB
  Props[Свойства товара: значения опции]
  Save[Сохранить товар]
  Tab[Вкладка Swatches]
  Dialog[HEX / паттерн / RAL]
  Dict[(Общий словарь)]
  Props --> Save --> Tab --> Dialog --> Dict
```

## Как работает раздел

Список словаря и вкладка **Swatches** сохраняют данные через connector miniShop3. Отдельного URL API нет: на части хостингов прямой адрес отвечает 404. Нужны установленный miniShop3 и право `msproduct_save` у менеджера.

## Экран CMP

Сверху вниз:

1. Вкладки **Словарь** и **RAL** (если включён `ms3optionscolor_ral_enabled`).
2. Таблица с поиском, фильтром статуса и действиями.

### Словарь

| Действие | Как |
| --- | --- |
| Поиск | Поле «Поиск значения или ключа» (без учёта регистра, в т.ч. кириллица) |
| Фильтр статуса | API: `all` / не задан / `active` / `inactive`. Не `disabled` |
| Править / назначить | Иконка карандаша в строке |
| Удалить | В диалоге кнопка **Удалить** с confirm |

![Поиск в словаре](/components/ms3optionscolor/screenshots/dictionary.png)

![Фильтр «Не задан»](/components/ms3optionscolor/screenshots/dictionary-filter.png)

![Диалог назначения](/components/ms3optionscolor/screenshots/dictionary-assign.png)

Словарь общий: пара `option_key` + `value` одна на весь каталог.

### RAL

Вкладка **RAL**: поиск по коду и названию, **Добавить**, правка строки.

![Справочник RAL](/components/ms3optionscolor/screenshots/ral.png)

![Диалог добавления RAL](/components/ms3optionscolor/screenshots/ral-add.png)

### Диалог цвета

В диалоге задаёте HEX (полоска + RGB/HSV), URL паттерна, RAL, title, activity. Переключатель режимов: **Цвет** / **Паттерн**.

Выбор RAL подставляет его HEX. Если вы измените HEX вручную или сохраните режим **Паттерн**, форма очистит связь с прежним RAL. Так код и цвет не расходятся.

При сохранении пакет нормализует URL паттерна и поле «Изображение»:

| Что сохранили | Что запишется |
| --- | --- |
| `/assets/…` | путь от корня сайта |
| полный URL этого же сайта | относительный путь |
| внешний HTTPS/CDN URL | как есть |

![Диалог редактирования HEX](/components/ms3optionscolor/screenshots/color-edit.png)

![Диалог с паттерном](/components/ms3optionscolor/screenshots/pattern-edit.png)

## Вкладка товара Swatches

На `product_create` / `product_update` плагин регистрирует вкладку **Swatches** среди Vue-вкладок товара.

![Вкладка Swatches](/components/ms3optionscolor/screenshots/product-tab.png)

Порядок работы:

1. На **Свойства товара** добавьте значения опции (`color` или ключи из `ms3optionscolor_default_option_key`).
2. Сохраните товар.
3. На **Swatches** назначьте HEX / pattern / RAL значениям со статусом «не задано».

Подсказки из `comboColors` miniShop3 подставляются в UI. Пакет не пишет цвет в `msOption.properties`.

На вкладке **Свойства товара** скрипт `product-option-swatch.js` рисует квадрат свотча в чипах опции. Запрос `/map` идёт тем же connector miniShop3.

![Чипы опции со swatch](/components/ms3optionscolor/screenshots/product-options-chips.png)

## Ограничения

- Без VueTools раздел менеджера и вкладка товара не откроются.
- Без права `msproduct_save` словарь не сохранится.
- Тип фильтра `ms3oc` появится только если установлен mFilter.
