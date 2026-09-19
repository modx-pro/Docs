---
title: Свой тип секции
description: "JSON, chunk и регистрация через pbOnRegisterSectionDefinitions или UI-тип в CMP"
---

# Свой тип секции

Результат: тип появляется в каталоге **Блоки**. Схема JSON и пути chunk описаны в [определении секции](../developer#opredelenie-sekcii).

## Плагин

1. Положите JSON рядом с вашим компонентом. Не правьте `core/components/pagebuilder/sections/`: upgrade пакета затрёт файл.
2. Создайте chunk с именем из поля `chunk`.
3. Подпишите плагин на `pbOnRegisterSectionDefinitions` и вызовите `registerFromFile`.

```php
<?php
switch ($modx->event->name) {
    case 'pbOnRegisterSectionDefinitions':
        /** @var \PageBuilder\Section\SectionRegistry $registry */
        $registry = $modx->event->params['registry'];
        $registry->registerFromFile($modx->getOption('core_path') . 'components/mypackage/sections/custom.json');
        break;
}
```

Ключ с `_` или `category: dev` в production-каталог не попадает. `requires` проверяет `SectionRequirementChecker`.

## UI-тип (Pro)

В панели управления создайте тип через `mgr/sectiontype/*`. Запись лежит в `pb_section_types`. Upgrade PageBuilder эти строки не перезаписывает.

Проверка: ключ виден в каталоге на вкладке **Секции**. Откат: скройте тип в панели или уберите `registerFromFile`.

## Пример: тип «Кейс»

Нужно право `pagebuilder_manage_types`. CMP **Blocks**, новый тип, ключ `case`, подпись «Кейс», категория `content`.

| name | type | label |
| --- | --- | --- |
| `title` | text | Заголовок |
| `client` | text | Клиент |
| `image` | image | Фото |
| `description` | textarea | Что сделали |
| `result` | text | Результат |

Чанк с именем из поля `chunk`:

```html
<section class="pb-section pb-section--case">
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $client}<p class="pb-lead">{$client|escape}</p>{/if}
    {if $description}<p>{$description|escape}</p>{/if}
    {if $result}<p>{$result|escape}</p>{/if}
  </div>
</section>
```

Картинку выводите partial `pagebuilder_partial_image`, как у секции [image](../sections/image).

## См. также

- [Разработчик](../developer)
- [Каталог секций](../sections/)
