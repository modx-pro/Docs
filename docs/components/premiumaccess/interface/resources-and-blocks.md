---
title: Ресурсы и premium blocks
description: Привязка тарифа к страницам MODX и premium blocks с маркером pa-block
---

# Ресурсы и premium blocks

Две вкладки SPA закрывают контент **на уровне страницы** и **внутри content**.

## Ресурсы (`/resources`) {#ресурсы}

![Привязка тарифа к ресурсу MODX](/components/premiumaccess/screenshots/resources-tariffs.png)

Дерево MODX с подгрузкой узлов + панель тарифов выбранного ресурса.

### Привязка тарифа к странице

1. **Компоненты → PremiumAccess → Ресурсы**.
2. Выберите страницу в дереве MODX.
3. **Привязать тариф** — выберите нужный тариф из списка.
4. Компонент создаст правило «эта страница → этот тариф».

**Отвязать** удаляет прямое правило «страница + тариф». Элементы, входящие в группу, не затрагиваются.

API:

| action | Method | Описание |
| --- | --- | --- |
| `mgr/resources/tree` | GET | Дерево с подгрузкой |
| `mgr/resource/tariffs/list` | GET | Тарифы ресурса |
| `mgr/resource/tariffs/attach` | POST | Привязка |
| `mgr/resource/tariffs/detach` | POST | Отвязка |

Право: `premiumaccess_view_rules` / `premiumaccess_manage_rules`.

### Поведение на витрине

Плагин `premiumaccess_content_protection` на `OnWebPagePrerender`:

1. Проверка доступа для текущей страницы.
2. Отказ → content заменяется на закрытый CTA (`paLockedCta`).
3. Доступ есть → content как в БД, включая маркеры premium blocks.

Гость видит CTA с ценой из тарифа и кнопку [PremiumAccessBuy](../snippets/PremiumAccessBuy).

### Тариф на одной странице vs мастер

| | Привязка тарифа | Мастер |
| --- | --- | --- |
| Охват | Одна страница | Тариф + группа + несколько страниц |
| Скорость | Быстро | Полная настройка раздела |
| Группа | Не создаёт | Создаёт группу и элементы в ней |

## Premium blocks (`/premium-blocks`) {#premium-blocks}

![Premium-блоки PremiumAccess](/components/premiumaccess/screenshots/premium-blocks.png)

Фрагмент HTML внутри **открытой** или **закрытой** страницы. Закрывается отдельно от resource.

### Создание блока

1. **Компоненты → PremiumAccess → Premium-блоки → Создать**.
2. Укажите **страницу**, где будет маркер, **тариф** и HTML **содержимое** блока.
3. Сохраните — скопируйте **UUID** блока.

API: `mgr/premiumblocks/list-all`, `create`, `update`, `archive`.

### Маркер в content ресурса

Вставьте в HTML content (редактор MODX):

```text
[[pa-block:550e8400-e29b-41d4-a716-446655440000]]
```

UUID = поле `block_id` из менеджера.

### Рендер на витрине

Плагин `premiumaccess_content_protection`:

1. Находит маркеры `[[pa-block:uuid]]` в content.
2. Проверяет доступ к блоку (`target_type=premium_block`, `target_identifier=uuid`).
3. Доступ есть → подставляет HTML блока из `pa_premium_blocks`.
4. Нет доступа → закрытый CTA или пусто (HTML блока не попадает в ответ).

Страница может быть **открыта**, а блок **закрыт**: правило только на `premium_block`, без правила на страницу.

### Пример: частично платная статья

- Страница **без** правила — вступление видно всем.
- В content маркер premium block с платным продолжением.
- Правило на блок + тариф «Полный доступ».

### Подсказка в менеджере

Chunk `paPremiumBlockPlaceholder` — видна редакторам в SPA при вставке блока, на витрине не выводится.

## Загрузка файла в менеджере

**Правила → Загрузка** (`mgr/files/upload`) кладёт файл в `premiumaccess.protected_path`. Затем правило `target_type=file`.

Подробнее: [Защищённые файлы](../frontend/protected-files).

## См. также

- [Paywall на страницах](../frontend/paywall)
- [PremiumAccessFile](../snippets/PremiumAccessFile)
- [Продукты и правила](products-and-rules)
