---
title: Bundle
description: "Export, dry-run и import UI-типов секций. Вкладка CMP скрыта в текущем релизе"
---

# Constructor Bundle

В текущем релизе вкладка **Bundle** в CMP **не показывается** (`BUNDLE_ENABLED = false` в `ProFeatureProvider`). Маршруты `mgr/bundle/*` и сервисы есть, пользователь вкладку не откроет, пока флаг не включат в сборке.

Когда вкладка доступна: UI-типы секций с одного сайта переносят на другой. Описание процессоров — [Панель управления → Bundle](../cmp#bundle) и [PageBuilder Pro → Constructor Bundle](../pro#constructor-bundle).

## Что нужно заранее

PageBuilder Pro на обоих сайтах. На исходном уже есть UI-типы, которые нужно перенести. Вкладка Bundle включена в вашей сборке.

## Шаги

1. На исходном сайте откройте **Bundle** и выгрузите JSON.
2. На целевом сайте вставьте JSON и запустите dry-run.
3. План показывает `create`, `update` или `conflict`. `conflict` ставится, когда тип уже есть и `version` не совпадает. Такие строки import не берёт.
4. Import применяет `create` и `update` одной транзакцией через `UiSectionTypeService`.

В бандл v1 не входят secrets, токены, содержимое страниц, строки таблиц, формы и datasources. Определение с ключом `token`, `secret` или `rows` в план `section-types` не попадает.

## Что проверить

В плане нет неожиданных `conflict`. После import ключи есть в каталоге **Блоки** на целевом сайте.

## Откат

Не подтверждайте import. Процессоры: `mgr/bundle/*`.

## См. также

- [Панель управления](../cmp#bundle)
- [PageBuilder Pro](../pro#constructor-bundle)
- [Свой тип секции](custom-section)
