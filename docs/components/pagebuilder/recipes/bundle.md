---
title: Bundle
description: "Export, dry-run и import UI-типов секций одной транзакцией. Слой Pro"
---

# Constructor Bundle

Результат: UI-типы секций с одного сайта появляются на другом. Вкладки CMP: [Bundle](../cmp#bundle).

1. На исходном сайте откройте **Bundle** и выгрузите JSON.
2. На целевом сайте вставьте JSON и запустите dry-run.
3. План показывает `create`, `update` или `conflict`. `conflict` ставится, когда тип уже есть и `version` не совпадает. Такие строки import не берёт.
4. Import применяет `create` и `update` одной транзакцией через `UiSectionTypeService`.

В бандл v1 не входят secrets, токены, содержимое страниц, строки таблиц, формы и datasources. Определение с ключом `token`, `secret` или `rows` в план `section-types` не попадает.

Откат: не подтверждайте import. Процессоры: `mgr/bundle/*`.

## См. также

- [Панель управления](../cmp#bundle)
- [Свой тип секции](custom-section)
