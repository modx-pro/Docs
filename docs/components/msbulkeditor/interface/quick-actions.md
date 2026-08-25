---
title: Быстрые действия
description: Готовые массовые операции с панели инструментов вкладки Товары
---

# Быстрые действия

Меню с иконкой молнии на панели вкладки **Товары**. Каждый пункт сразу открывает нужный тип операции. Вам не нужно искать его в общем списке.

![Меню «Быстрые действия»](/components/msbulkeditor/screenshots/combo-menu.png)

---

## Как пользоваться

1. Отметьте товары **или** включите [экспертный режим](products-grid#экспертный-режим).
2. Нажмите молнию (**Быстрые действия**).
3. Выберите пункт. Откроется диалог с уже выбранным типом операции.
4. Заполните параметры → **Предпросмотр** → **Применить**.

Меню неактивно, пока нет выборки и выключен экспертный режим.

Перед мягким удалением, очисткой кэша и регенерацией URI панель попросит подтверждение.

![Подтверждение: мягкое удаление](/components/msbulkeditor/screenshots/confirm-soft-delete.png)

![Подтверждение: очистка кэша](/components/msbulkeditor/screenshots/confirm-clear-cache.png)

![Подтверждение: регенерация URI](/components/msbulkeditor/screenshots/confirm-regenerate-uri.png)

---

## Пункты меню

Сверху — самые частые действия:

| Пункт | Что делает |
| --- | --- |
| Изменить шаблон | Новый шаблон ресурса |
| Изменить родителя | Другая категория-родитель |
| Изменить производителя | Vendor MiniShop3 |
| Установить текст | Название или другое текстовое поле (в форме можно сменить) |
| Регенерация превью галереи | Пересобрать превью фото |
| Очистить кэш ресурса | Сбросить кэш страниц товаров |
| Перегенерировать URI | Пересчитать alias и URI |
| Мягкое удаление | Пометить товар удалённым (`deleted`) |
| Изменить источник файлов | Media source |
| Изменить тип контента | Content type MODX |
| Назначить группу ресурсов | Resource group |
| Изменить даты | Дата публикации и др. |
| Изменить пользователя | createdby / editedby / publishedby |

### Скриншоты пунктов

![Изменить родителя](/components/msbulkeditor/screenshots/combo-change-parent.png)

![Изменить производителя](/components/msbulkeditor/screenshots/combo-vendor.png)

![Установить текст](/components/msbulkeditor/screenshots/combo-set-text.png)

![Регенерация превью галереи](/components/msbulkeditor/screenshots/combo-gallery-regenerate.png)

![Очистить кэш ресурса](/components/msbulkeditor/screenshots/combo-clear-cache.png)

![Перегенерировать URI](/components/msbulkeditor/screenshots/combo-regenerate-uri.png)

![Мягкое удаление](/components/msbulkeditor/screenshots/combo-soft-delete.png)

![Изменить источник файлов](/components/msbulkeditor/screenshots/combo-source.png)

![Изменить тип контента](/components/msbulkeditor/screenshots/combo-content-type.png)

![Назначить группу ресурсов](/components/msbulkeditor/screenshots/combo-resource-group.png)

![Изменить даты](/components/msbulkeditor/screenshots/combo-dates.png)

![Изменить пользователя](/components/msbulkeditor/screenshots/combo-user.png)

---

## Чем отличается от «Запустить операцию»

| Сравнение | Быстрые действия | Запустить операцию |
| --- | --- | --- |
| Тип | Уже выбран пунктом меню | Выбираете сами из полного списка |
| Удобно для | Шаблон, родитель, кэш, URI | Цена, остаток, TV, опции, SEO |

Цену, остаток, TV и опции запускайте через **Запустить операцию** или [пресет](presets).

---

## Пример: сменить шаблон у категории

1. Отфильтруйте товары одной категории.
2. Включите экспертный режим и проверьте счётчик **По фильтру**.
3. **Быстрые действия** → **Изменить шаблон**.
4. Укажите новый шаблон.
5. **Предпросмотр** → **Применить**.

![Диалог смены шаблона](/components/msbulkeditor/screenshots/combo-template-dialog.png)

---

## См. также

- [Товар и цены](product-and-prices)
- [Пресеты](presets)
- [Сценарий B](flows#flow-b--быстрые-действия)
