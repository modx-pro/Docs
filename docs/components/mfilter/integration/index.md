# Интеграции

mFilter интегрируется с популярными компонентами MODX.

## Поддерживаемые компоненты

| Компонент | Описание |
|-----------|----------|
| [MiniShop3](minishop3) | Интернет-магазин |
| [mSearch](msearch) | Полнотекстовый поиск |

## Принцип интеграции

mFilter работает через параметр `element` — любой сниппет, возвращающий ресурсы:

```php
[[!mFilter?
    &element=`msProducts`    // MiniShop3
    &element=`mSearch`       // mSearch
    &element=`pdoResources`  // pdoTools
    &element=`getTickets`    // Tickets
]]
```

## Element/Paginator режим

mFilter передаёт отфильтрованные ID во внешний element:

```
1. element получает все ID (returnIds=1)
2. mFilter фильтрует ID
3. element рендерит отфильтрованные ID
4. paginator обеспечивает пагинацию
```

### Схема работы

```
┌─────────────┐    IDs    ┌─────────────┐
│   element   │ ────────► │   mFilter   │
│ (msProducts)│           │  (фильтры)  │
└─────────────┘           └──────┬──────┘
                                 │
                          filtered IDs
                                 │
                                 ▼
                         ┌─────────────┐
                         │  paginator  │
                         │  (pdoPage)  │
                         └──────┬──────┘
                                │
                             HTML
                                │
                                ▼
                         ┌─────────────┐
                         │   Browser   │
                         └─────────────┘
```

## Совместимость

### Требования к element

Element должен поддерживать:
- Параметр `resources` — список ID для вывода
- Параметр `returnIds` — возврат ID вместо HTML

### Требования к paginator

Paginator должен поддерживать:
- Параметр `element` — сниппет для рендеринга
- Параметр `resources` — список ID
