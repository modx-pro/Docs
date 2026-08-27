<!-- TODO: translate from docs/components/pagebuilder/screenshots/README.md -->

# Скриншоты PageBuilder

Положите PNG в эту папку (или в `sections/` для блоков), затем раскомментируйте строку в markdown:

```md
<!-- ![Подпись](/components/pagebuilder/screenshots/имя-файла.png) -->
```

→

```md
![Подпись](/components/pagebuilder/screenshots/имя-файла.png)
```

Активная ссылка без файла ломает `pnpm build` (`Rollup failed to resolve import`). Заглушки держите в HTML-комментарии.

## Менеджер

| Файл | Что снять | Страница |
| --- | --- | --- |
| `mgr-system-settings.png` | **System Settings** → namespace `pagebuilder` | [settings.md](../settings.md) |
| `mgr-sections-tab.png` | Форма ресурса: вкладка **Секции** | [quick-start.md](../quick-start.md) |
| `mgr-section-catalog.png` | Диалог **+ Создать**: каталог секций, поиск, категории | [quick-start.md](../quick-start.md) |
| `mgr-section-inspector.png` | Инспектор секции: поля, repeater | [quick-start.md](../quick-start.md), [integration.md](../integration.md) |
| `mgr-section-preview.png` | Превью черновика (iframe / кнопка Preview) | [quick-start.md](../quick-start.md), [frontend.md](../frontend.md) |
| `mgr-cmp-index.png` | **Компоненты → PageBuilder**: список ресурсов | [integration.md](../integration.md) |
| `mgr-cmp-section-types.png` | CMP: **Типы секций** (Pro) | [integration.md](../integration.md) |
| `mgr-resource-tables.png` | Вкладка **Таблицы** на ресурсе | [integration.md](../integration.md) |

## Фронт

| Файл | Что снять | Страница |
| --- | --- | --- |
| `fe-page-sections.png` | Страница на сайте с секциями PageBuilder | [frontend.md](../frontend.md), [quick-start.md](../quick-start.md) |

## Секции (`sections/`)

Имя файла = ключ секции. Пример: `sections/hero.png` → [sections/hero.md](../sections/hero.md).

| Файл | Страница |
| --- | --- |
| `sections/hero.png` | [hero.md](../sections/hero.md) |
| `sections/testimonials.png` | [testimonials.md](../sections/testimonials.md) |
| `sections/products_grid.png` | [products_grid.md](../sections/products_grid.md) |

Остальные блоки: `sections/{key}.png` по [каталогу](../sections/index.md).

## Типы полей (`fields/`)

Имя файла = `type` из JSON поля. Пример: `fields/checkbox.png` → [fields/checkbox.md](../fields/checkbox.md).

| Файл | Что снять | Страница |
| --- | --- | --- |
| `fields/text.png` | Инспектор: поле `text` | [text.md](../fields/text.md) |
| `fields/repeater.png` | Инспектор: repeater с вложенными полями | [repeater.md](../fields/repeater.md) |
| `fields/richtext.png` | Инспектор: визуальный редактор | [richtext.md](../fields/richtext.md) |
| `fields/embeddedTable.png` | Инспектор: встроенная таблица | [embeddedTable.md](../fields/embeddedTable.md) |

Остальные типы: `fields/{type}.png` по [справочнику](../fields/types.md).

| Файл | Что снять | Страница |
| --- | --- | --- |
| `mgr-section-inspector.png` | Инспектор секции: несколько типов полей | [overview.md](../fields/overview.md), [types.md](../fields/types.md) |
