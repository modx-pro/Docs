---
title: UserLocation
description: Геолокация и выбор города пользователя
logo: https://modstore.pro/assets/extras/userlocation/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/maps/userlocation

items: [
  {
    text: 'Разработка',
    items: [
      { text: 'События', link: 'development/events' },
    ],
  },
]
---
# UserLocation

Компонент реализует выбор города пользователя.

Попробовать пакет перед покупкой можно на [modhost.pro][4].

## Особенности

- Определение локации пользователя по ip.
- Готовая база городов и регионов России, возможность импорта/экспорта своих локаций.

## Установка

- [Подключите наш репозиторий](https://modstore.pro/info/connection).
- Установите **UserLocation**.
- Импортируйте файл локаций.

Попробовать пакет перед покупкой можно на [modhost.pro][4], на нём эти дополнения можно выбрать прямо при создании сайта.

## Описание

Компонент UserLocation позволяет определить локацию пользователя и вывести список доступных локаций.

![Описание](https://file.modx.pro/files/6/c/6/6c69d7b5e6fc7865180c41e4afe44ed9.jpg)

## Сниппет `UserLocation.initialize`

Подключает необходимые скрипты и стили. Вызвать в любом удобном месте.

### Параметры

| Параметр      | По умолчанию               | Описание                                        |
| ------------- | -------------------------- | ----------------------------------------------- |
| **frontCss**  |                            | Файл с css стилями для подключения на фронтенде |
| **frontJs**   |                            | Файл с javascript для подключения на фронтенде  |
| **actionUrl** | `[[+assetsUrl]]action.php` | Коннектор для обработки ajax запросов           |

## Сниппет `UserLocation.location`

Получает список локаций.

### Параметры UserLocation.location

| Параметр          | По умолчанию             | Описание                                                                         |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **tpl**           | `UserLocation.locations` | Имя чанка для оформления                                                         |
| **sortby**        | `name`                   | Поле для сортировки                                                              |
| **sortdir**       | `ASC`                    | Направление сортировки                                                           |
| **limit**         | `300`                    | Лимит выборки                                                                    |
| **toPlaceholder** |                          | Не выводить результат работы сниппета, а поместить в плейсхолдер *toPlaceholder* |
| **type**          | `city`                   | Тип объекта                                                                      |

## Модификаторы феном

### `getUserLocation`

Получает текущую локацию пользователя.

### `detectUserLocation`

Получает текущую локацию пользователя по его ip.

## Пример вызова

Текущая локация пользователя:

```fenom
{set $location = '' | getUserLocation}
{$location | print}

(
  [id] => 3300000400000
  [name] => Ковров
  [type] => city
  [postal] => 601900
  [gninmb] => 3332
  [okato] => 17425000000
  [oktmo] => 17725000
  [fias] => 0b4978e2-e64c-4db1-b84d-93cf34bdb04b
  [active] => 1
  [parent] => 3300000000000
  [resource] => 0
  [description] =>
  [properties] =>
  [confirmed] => 0
)
```

Поповер с выбором локации:

```fenom
{set $location = '' | getUserLocation}

<div class="userlocation userlocation-location-confirm {$location.confirmed?'':'unconfirmed'}">
  <a href="javascript:" data-fancybox="" data-src="#userlocation-location-popup">{$location.name}</a>
  <div class="userlocation-location-confirm-popover">
    <div>Это Ваш город?</div>
    <div>
      <a href="" class="userlocation-location-item" data-userlocation-id="{$location.id}">Да</a>
      <a href="javascript:" data-fancybox="" data-src="#userlocation-location-popup">Выбор города</a>
    </div>
    <button class="userlocation-location-confirm-close"></button>
  </div>
</div>
<div id="userlocation-location-popup" style="display: none">
  <h4>Выберите свой населённый пункт</h4><br>
  {'UserLocation.location'|snippet:[
    'typeSearch' => 'local',
    'tpl' => 'UserLocation.locations'
  ]}
</div>
```

Инпут с выбором локации:

```html
<input
  type="text" class="userlocation-location-search-input"
  data-userlocation-mode="remote"
  data-userlocation-template="<div class='userlocation-suggestion userlocation-location-item' data-userlocation-row='@row@' data-userlocation-id='@id@'>@name@</div>"
  data-userlocation-value-field="name"
  data-data-type="city"
  placeholder="Поиск..."
/>
```

Вывод соседних локаций:

```fenom
{set $location = '' | detectUserLocation}
{if $location}
  {set $tmp = '!UserLocation.location' | snippet : [
    'limit' => 1,
    'where' => [
      'parent:IN' => [$location.parent, $location.id],
      'OR:id:IN' => [$location.parent, $location.id],
    ],
  ]}
{/if}
```

## Управление локациями в админке

Таблица управления локациями представлена в виде виджета.

![Управление локациями в админке](https://file.modx.pro/files/0/4/3/043bf415e97bd6ffd6a1a8f6c36420d6.jpg)

## Импорт / Экспорт локаций

Доступен импорт/ экспорт локаций в формате csv

![Импорт / Экспорт локаций](https://file.modx.pro/files/0/0/1/00101496f17fb0dc09aa86209a198d6c.jpg)

## Геолокация пользователя

Из коробки доступны следующие классы определения локации пользователя по ip:

- ulDetectLocationByIpGeoBase <Badge type="info" text="включен по умолчанию" />
- ulDetectLocationBySypexGeo
- ulDetectLocationByDaData

Используемый класс геолокации можно указать в настройке `ulMethodDetectLocation`.

Наиболее точный класс `ulDetectLocationByDaData`, однако он требует указания токена сервиса [ДаДата][5].

::: info Примечание
После установки пакета необходимо импортировать файл локаций.
Локации городов и регионов Росии находится в папке `core/components/userlocation/elements/locations/locations.csv`
:::

По умолчанию активны крупные города России, вы можете активировать/ деактивировать нужные вам города

[4]: https://modhost.pro
[5]: https://dadata.ru/profile
