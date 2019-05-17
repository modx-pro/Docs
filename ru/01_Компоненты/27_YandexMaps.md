Компонент позволяет создавать Яндекс Карту и размещать на ней список объектов (1 объект = 1 ресурс). Можно вывести одиночный объект на карте по id ресурса.

Для добавления карты к ресурсу нужно всего лишь создать TV с типом "YandexMaps" (появится после установки компонента).

Чтобы указать местоположение объекта нужно просто кликнуть на том месте на карте в "дополнительных полях" ресурса.

## Так выглядит TV поле в админке

[![](https://file.modx.pro/files/0/3/a/03aee8a2ca26a39fd5e4ea6462335c03.jpg)](https://file.modx.pro/files/0/3/a/03aee8a2ca26a39fd5e4ea6462335c03.jpg)

## Так выглядит карта со множеством объектов во фронтенде

[![](https://file.modx.pro/files/1/1/f/11f453ac93d154b2d2dc395188492a18.jpg)](https://file.modx.pro/files/1/1/f/11f453ac93d154b2d2dc395188492a18.jpg)

## Параметры сниппета YandexMaps

| Имя                         | По умолчанию                                                          | Описание                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **&tpl**                    | tpl.yandexMaps                                                        | Шаблон обёртка вывода ссылок фильтров для отображения/скрытия объектов на карте                                                                                          |
| **&tplFiltersItemsWrapper** | tpl.yandexMaps.filtersItemsWrapper                                    | Шаблон обёртка вывода ссылок фильтров для отображения/скрытия объектов на карте.                                                                                         |
| **&tplFiltersItems**        | tpl.yandexMaps.filtersItems                                           | Шаблон вывода ссылок фильтров для отображения/скрытия объектов на карте.                                                                                                 |
| **&idMap**                  | yandexMap                                                             | Id карты для html разметки и JS инициализации.                                                                                                                           |
| **&centerCoords**           | 55.75356,37.62001                                                     | Координаты для центра карты.                                                                                                                                             |
| **&zoom**                   | 14                                                                    | Zoom карты (приближение).                                                                                                                                                |
| **&tvCoords**               |                                                                       | Имя TV поля с типом yandexMaps (в которое будем записывать координаты объекта).                                                                                          |
| **&tvAddress**              |                                                                       | Имя TV поля с адресом объекта (если хотим, чтобы компонент сам определил координаты для каждого объекта по его адресу в ТВшке).                                          |
| **&addressPrefix**          |                                                                       | Префикс в начало адреса. Если в TV поле "tvAddress" все адреса указаны без обозначения страны и города. Например: "Россия, Москва, ".                                    |
| **&objectsTypesJSON**       |                                                                       | JSON строка с типами объектов, родительскими id, тайтлами, иконками или пресетами, а также субфильтрами по TV (и назначение каждому варианту ответа иконки или пресета). |
| **&id**                     |                                                                       | Id ресурса для вызова одиночного объекта на карте. Например: [[*id]].                                                                                                    |
| **&markerIcon**             |                                                                       | Иконка для одиночного объекта. Например: "/images/map_marker.png".                                                                                                       |
| **&markerPreset**           | islands#redDotIcon                                                    | Ключ стиля для одиночного объекта. Например: "islands#yellowStretchyIcon" или "islands#violetDotIcon".                                                                   |
| **&markerPresetText**       |                                                                       | Текст для одиночного объекта на preset. Например: "Плавательный бассейн".                                                                                                |
| **&markerPresetFieldText**  |                                                                       | Поле, откуда извлекать текст для одиночного объекта на preset. Например: "menutitle".                                                                                    |
| **&fieldForBalloonContent** |                                                                       | Какое поле ресурса использовать для описания в balloon.                                                                                                                  |
| **&fieldForHint**           |                                                                       | Какое поле ресурса использовать для подсказки при наведении на объект.                                                                                                   |
| **&showMoreLink**           | 0                                                                     | Ставить ли ссылку "подробнее" на ресурс в конец текста в balloonContent.                                                                                                 |
| **&showMoreLinkTpl**        | `@INLINE <p><a href="[[~[[+id]]]]" target="_blank">Подробнее</a></p>` | Шаблон ссылки "подробнее" на ресурс в конце текста в balloonContent.                                                                                                     |
| **&classMapBlock**          | ymBlock                                                               | Класс для блока карты.                                                                                                                                                   |
| **&styleMapBlock**          | float:left; width:90%; height:100%;                                   | Стиль для блока карты.                                                                                                                                                   |
| **&idFiltersForm**          | ymFiltersForm                                                         | Id для формы фильтров (вкл/выкл) гео-объектов.                                                                                                                           |
| **&classFiltersBlock**      | ymFiltersBlock                                                        | Класс для блока ссылок фильтров (вкл/выкл) гео-объектов.                                                                                                                 |
| **&styleFiltersBlock**      | float:left; width:10%; height:100%;                                   | Стиль для блока ссылок фильтров (вкл/выкл) гео-объектов.                                                                                                                 |
| **&classFiltersItem**       | ymFilters                                                             | Класс для ссылки фильтра (вкл/выкл) гео-объектов (нужен для отслеживания клика JSом).                                                                                    |

## Инструкция

1. Установите компонент.
2. Добавьте TV поле (например: "coords"), у которого на вкладке "**Параметры ввода**" укажите тип: "**yandexMaps**":
[![](https://file.modx.pro/files/7/4/6/74659986c95c1b24cfdd7fa7ac75bf62.jpg)](https://file.modx.pro/files/7/4/6/74659986c95c1b24cfdd7fa7ac75bf62.jpg)
3. Укажите это поле для шаблонов, которые будут присвоены ресурсам-объектам на карте.
4. Добавьте ресурс, у которого укажите шаблон, о котором говорилось выше. На вкладке "**Дополнительные поля**" кликните на том месте карты, на котором находится нужный объект. При необходимости воспользуйтесь поиском места на карте.
5. Примерное дерево, для которого указан вызов сниппета в примерах 4 и 5 (внизу):
[![](https://file.modx.pro/files/b/c/a/bca4ed5fb6f378be65c0ec66bdb52d23.jpg)](https://file.modx.pro/files/b/c/a/bca4ed5fb6f378be65c0ec66bdb52d23.jpg)

## Примеры

### Пример 1 (вывод одиночного объекта используя свою иконку)

```php
[[!yandexMaps?
    &id=`[[*id]]`
    &tvCoords=`coords`
    &markerIcon=`/images/cafe_marker_icon.png`
    &fieldForBalloonContent=`description`
    &fieldForHint=`pagetitle`
    &showMoreLink=`true`
]]
```

### Пример 2 (вывод одиночного объекта используя preset - "DotIcon")

```php
[[!yandexMaps?
    &id=`[[*id]]`
    &tvCoords=`coords`
    &markerPreset=`islands#violetDotIcon`
    &fieldForBalloonContent=`introtext`
    &fieldForHint=`menutitle`
]]
```

### Пример 3 (вывод одиночного объекта используя preset - "StretchyIcon", и текст в нём)

```php
[[!yandexMaps?
    &id=`[[*id]]`
    &tvCoords=`coords`
    &markerPreset=`islands#yellowStretchyIcon`
    &markerPresetText=`Плавательный бассейн`
    &fieldForBalloonContent=`description`
    &fieldForHint=`pagetitle`
    &showMoreLink=`true`
]]
```

### Пример 4 (вывод множества объектов используя параметр "objectsTypesJSON")

```php
[[!yandexMaps?
    &tvCoords=`coords`
    &fieldForBalloonContent=`description`
    &fieldForHint=`pagetitle`
    &objectsTypesJSON=`[
        {
            "InvestProjects": {
                "parent":"5",
                "preset":"islands#violetStretchyIcon",
                "presetText":"Реализованный",
                "title":"Инвестиционные проекты"
            },
            "InvestPlaygrounds": {
                "parent":"6",
                "icon":"/images/playgrounds_map_icon.png",
                "title":"Инвестиционные площадки"
            }
        }
    ]`
]]
```

### Пример 5 (вывод множества объектов с субфильтрами из TV, используя параметр "objectsTypesJSON")

```php
[[!yandexMaps?
    &tvCoords=`coords`
    &fieldForBalloonContent=`description`
    &fieldForHint=`pagetitle`
    &objectsTypesJSON=`[
        {
            "InvestProjects": {
                "parent":"5",
                "icon":"/images/projects_map_icon.png",
                "title":"Инвестиционные проекты",
                "subFilters": {
                    "status": {
                        "title":"Статус проекта",
                        "options": {
                            "0":{ "value":"Реализуемый==1", "icon":"/images/projects_map_icon1.png" },
                            "1":{ "value":"Реализованный==2", "preset":"islands#violetStretchyIcon", "presetText":"Реализованный" },
                            "2":{ "value":"Подписано соглашение==3", "preset":"islands#blueStretchyIcon", "presetFieldText":"pagetitle" }
                        }
                    },
                    "branch": {
                        "title":"Отрасль",
                        "options": {
                            "0":{ "value":"Фармацевтика и биотехнологии==1" },
                            "1":{ "value":"Автомобили и автокомпоненты==2" },
                            "2":{ "value":"Транспортно-логистические==3" },
                            "3":{ "value":"Другие направления==4" }
                        }
                    }
                }
            },
            "InvestPlaygrounds": {
                "parent":"6",
                "icon":"/images/playgrounds_map_icon.png",
                "title":"Инвестиционные площадки",
                "subFilters": {
                    "types": {
                        "title":"",
                        "options": {
                            "0":{ "value":"Особые экономические зоны==1", "icon":"/images/playgrounds_map_icon1.png" },
                            "1":{ "value":"Индустриальные парки==2", "icon":"/images/playgrounds_map_icon2.png" }
                        }
                    }
                }
            }
        }
    ]`
]]
```
