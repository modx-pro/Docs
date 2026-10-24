---
title: Руководство по админке
---
# Руководство по админке

Страница **Подборки товаров** хранит **шаблоны** (тип + набор ID) и массово копирует их в связи `ms3_product_sets` для всех товаров категории. Точечные правки делайте через TV на карточке товара.

Экран и поля API: [Подборки товаров (интерфейс)](interface/templates). Пошаговые сценарии: [Сценарии (flows)](interface/flows).

## Как открыть

- **Компоненты → Подборки товаров**
- URL: `?a=index&namespace=ms3productsets`
- Нужны **VueTools** и право MODX **`view`**

![Обзор страницы](/components/ms3productsets/screenshots/page-overview.png)

## Две вкладки

Справочник типов стоит в боковой колонке первой вкладки.

### Вкладка «Список подборок»

1. **Панель сверху:** описание, счётчик шаблонов, кнопка **Новая подборка**.
2. **Таблица:** ID, название, тип (цветная метка), ID товаров, **Изменить** / **Удалить**. Пустой список показывает заглушку с кнопкой создания.
3. **Типы подборок:** свёрнутая панель справа. Метка типа и описание из лексикона.

![Типы подборок](/components/ms3productsets/screenshots/types-section.png)

![Таблица шаблонов](/components/ms3productsets/screenshots/template-list.png)

### Вкладка «Применение»

Выбор шаблона (Select), категории (TreeSelect, дерево без товаров), чекбокс **Заменить существующие подборки этого шаблона**, кнопки **Применить** и **Отвязать**.

![Применение](/components/ms3productsets/screenshots/apply-category.png)

## Создание шаблона

1. **Новая подборка**.
2. Заполните поля:

| Поле | Назначение |
|------|------------|
| **Название** | Имя для менеджеров. Попадает в `template_name` связей. |
| **Тип подборки** | Один из пяти типов шаблонов. |
| **ID товаров** | MultiSelect или строка через запятую. Минимум один ID. |
| **Описание** | Внутренний комментарий. |
| **Порядок** | Сортировка в списке админки. |

1. **Сохранить** → connector `save_template`.

![Форма создания](/components/ms3productsets/screenshots/template-dialog-new.png)

![Пикер товаров](/components/ms3productsets/screenshots/product-picker.png)

## Редактирование и удаление

- **Изменить:** те же поля, connector `save_template` с `id`. Смена `name` или `type` пишет новые `template_name` и `type` в уже применённые строки. Список `related_product_id` у этих строк сам не переписывается. Нужен повторный **Применить** (с replace, если надо заменить состав).
- **Удалить:** диалог подтверждения, connector `delete_template`. Удаляются шаблон и все связи с его `template_name` и `type`.

![Редактирование](/components/ms3productsets/screenshots/template-dialog-edit.png)

![Подтверждение удаления](/components/ms3productsets/screenshots/delete-confirm.png)

## Применение и отвязка

**Применить** (`apply_template`):

- Собирает все `msProduct` в выбранной категории и подкатегориях (рекурсия, глубина до 10).
- Для каждого товара создаёт строки в `ms3_product_sets` с `template_name` = имя шаблона.
- С **`replace=true`** сначала удаляет связи с тем же **`template_name`** и **type** у товаров категории. TV-связи и записи других шаблонов не затрагиваются.
- Ответ `applied` считает реально вставленные строки (`INSERT IGNORE`, без дублей).

**Отвязать** (`unbind_template`):

- Удаляет связи с совпадающими **type** + **template_name** в выбранной ветке.
- TV и другие шаблоны не трогает.

## TV на карточке товара

| TV | Тип |
|----|-----|
| `ms3productsets_buy_together` | buy_together |
| `ms3productsets_similar` | similar |
| `ms3productsets_popcorn` | popcorn |
| `ms3productsets_cart_suggestion` | cart_suggestion |
| `ms3productsets_vip` | vip |

При сохранении товара плагин **ms3ProductSets SyncTV** (`OnDocFormSave`):

- срабатывает только для ресурсов класса `msProduct`;
- при пустом TV удаляет записи с пустым `template_name` (созданные из TV);
- при заполненном TV перезаписывает связи типа без `template_name`;
- связи из шаблонов (`template_name` задан) не трогает.

## Типовой процесс

1. Массово: шаблон → **Применить** к категории.
2. Точечно: TV на одном товаре.
3. Проверка: `ms3ProductSets` с тем же `type` на витрине.

## См. также

- [Сценарии (flows)](interface/flows)
- [Системные настройки](settings)
- [Права доступа](permissions)
