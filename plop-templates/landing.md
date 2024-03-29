---
title: {{ name }} # Название компонента
description: Отличный компонент который решает сложные задачи # Описание компонента
logo: https://placehold.co/400 # Ссылка на логотип компонента
author: modx-pro # Логин автора компонента на github.com (Список авторов находится по пути `docs/authors.json`. При необходимости добавьте или измените данные)
modstore: https://modstore.pro/... # Ссылка на страницу компонента на modstore.pro
modx: https://modx.com/extras/... # Ссылка на страницу компонента на modx.com
repository: https://github.com/modx-pro/miniShop2 # Ссылка на репозиторий компонента

dependencies: miniShop2 # Строка или массив строк с зависимостями компонента от других компонентов (Пример: miniShop2 или ['miniShop2', 'FormIt'])
categories: payment # Строка или массив строк категорий компонента (Пример: payment или ['utilities', 'discounts'])
outline: deep # Настройка генерации оглавления, по умолчанию: deep (Подробнее: https://vitepress.dev/reference/frontmatter-config#outline)
---

# {{ name }}

Конечный компонент является основой для любого сайта, и абстрактный компонент может быть реализован в любом контексте, в котором необходимо использовать его функциональность. Абстрактный компонент – это модуль, который предоставляет некоторые общие функции, которые могут быть использованы другими компонентами, но не являются привязанными к конкретному контексту.

Например, компонент может предоставлять функциональность для обработки формы, отправки сообщений или создания графиков. Он может быть настроен и изменен в соответствии с требованиями проекта, и может быть легко использован в других проектах без необходимости переписывания кода. Ключевые особенности абстрактного компонента включают его гибкость, переносимость и повторное использование.

## Сниппеты

Абстрактные компоненты MODX Revolution - это наборы кода, которые можно использовать для создания различных компонентов, таких как сниппеты, плагины и т.д. Вот несколько примеров сниппетов абстрактного компонента MODX Revolution:

### getItems

**getItems** - это абстрактный сниппет в MODX Revolution, который позволяет легко получать и отображать список элементов из базы данных. Этот сниппет может быть использован для вывода контента, такого как новости, продукты или другие типы записей.

Он также позволяет настраивать параметры запроса, такие как количество выводимых элементов, порядок сортировки и условия фильтрации. Это делает getItems очень гибким и универсальным инструментом для управления контентом на сайте, вне зависимости от его типа или сложности.

#### Список параметров

Вот список параметров абстрактного сниппета getItems MODX Revolution:

##### parents

- По умолчанию: Текущий ресурс

Определяет ID родительского ресурса, дочерние элементы которого будут отображаться в результате.

##### depth

- По умолчанию: `0`

Определяет глубину вложенности дочерних элементов, которые будут отображаться в результате.

##### limit

- По умолчанию: `1`

Определяет максимальное количество элементов, которые будут отображаться в результате.

##### tpl

- По умолчанию: `tpl.Item`

Определяет шаблон, который будет использоваться для отображения каждого элемента в результате.

##### sortby

- По умолчанию: `title`

Определяет поле, по которому будут сортироваться элементы в результате.

##### sortdir

- По умолчанию: `DESC`

Определяет направление сортировки элементов в результате (возрастание или убывание).

##### tvFilters

Определяет фильтры для пользовательских полей (TV-полей), которые будут отображаться в результате.

##### includeTVs

- По умолчанию: `1`

Определяет, будут ли пользовательские поля (TV-поля) включены в результат.

##### showHidden

- По умолчанию: `0`

Определяет, будут ли скрытые элементы (включая скрытые ресурсы) включены в результат.

##### where

Определяет дополнительные условия для фильтрации элементов в результате.

#### Пример вызова

::: code-group

```modx
[[getItems?
  &parents=`[[*id]]`
  &showHidden=`1`
  &where=`{
    "title": "Awesome title"
  }`
]]
```

```fenom
{'getItems' | snippet : [
  'parents' => $_modx->resource.id,
  'showHidden' => 1,
  'where' => {
    'title' => 'Awesome title',
  },
]}
```

:::

Надеюсь, это поможет вам лучше понять, как работает сниппет getItems в MODX Revolution.

### getCategories

**getCategories** - это абстрактный сниппет в MODX Revolution, который позволяет легко получать и отображать список элементов из базы данных. Этот сниппет может быть использован для вывода контента, такого как новости, продукты или другие типы записей.

Он также позволяет настраивать параметры запроса, такие как количество выводимых элементов, порядок сортировки и условия фильтрации. Это делает getItems очень гибким и универсальным инструментом для управления контентом на сайте, вне зависимости от его типа или сложности.

#### Список параметров

Вот список параметров абстрактного сниппета getItems MODX Revolution:

| Название       | Значение по умолчанию | Описание                                                                                           |
|----------------|-----------------------|----------------------------------------------------------------------------------------------------|
| **parents**    | Текущий ресурс        | Определяет ID родительского ресурса, дочерние элементы которого будут отображаться в результате.   |
| **depth**      | `0`                   | Определяет глубину вложенности дочерних элементов, которые будут отображаться в результате.        |
| **limit**      | `1`                   | Определяет максимальное количество элементов, которые будут отображаться в результате.             |
| **tpl**        | `tpl.Item`            | Определяет шаблон, который будет использоваться для отображения каждого элемента в результате.     |
| **sortby**     | `title`               | Определяет поле, по которому будут сортироваться элементы в результате.                            |
| **sortdir**    | `DESC`                | Определяет направление сортировки элементов в результате (возрастание или убывание).               |
| **tvFilters**  |                       | Определяет фильтры для пользовательских полей (TV-полей), которые будут отображаться в результате. |
| **includeTVs** | `1`                   | Определяет, будут ли пользовательские поля (TV-поля) включены в результат.                         |
| **showHidden** | `0`                   | Определяет, будут ли скрытые элементы (включая скрытые ресурсы) включены в результат.              |
| **where**      |                       | Определяет дополнительные условия для фильтрации элементов в результате.                           |

#### Пример вызова

::: code-group

```modx
[[getCategories?
  &parents=`[[*id]]`
  &showHidden=`1`
  &where=`{
    "title": "Awesome title"
  }`
]]
```

```fenom
{'getCategories' | snippet : [
  'parents' => $_modx->resource.id,
  'showHidden' => 1,
  'where' => {
    'title' => 'Awesome title',
  },
]}
```

:::

Надеюсь, это поможет вам лучше понять, как работает сниппет getItems в MODX Revolution.

Эти сниппеты являются универсальными и могут быть использованы в различных проектах без необходимости переписывать код. Они также могут быть легко настраиваемыми и расширяемыми, что делает их очень гибкими.

## События

Вот список событий и их описанием в абстрактном компоненте MODX Revolution:

### onStart

- Аргументы: `$modx`

Событие вызывается в начале работы компонента. Здесь можно выполнить необходимые инициализации.

```php
<?php
$eventName = $modx->event->name;
switch($eventName) {
  case 'onStart':
    $modx->log(modX::LOG_LEVEL_ERROR, 'What should I do?');
    break;
}
```

### onBeforeSave

- Аргументы: `$modx`

Вызывается перед сохранением объекта в базу данных. Позволяет валидировать данные и модифицировать их перед сохранением.

### onAfterSave

- Аргументы: `$modx`

Событие вызывается после сохранения объекта в базу данных. Здесь можно выполнить дополнительные действия, например, отправку уведомлений.

### onBeforeDelete

- Аргументы: `$modx`

Вызывается перед удалением объекта из базы данных. Позволяет проверить, что объект может быть удален, например, если на него ссылается другой объект.

### onAfterDelete

- Аргументы: `$modx`

Событие вызывается после удаления объекта из базы данных. Здесь можно выполнить дополнительные действия, например, удалить связанные объекты.

Абстрактный компонент позволяет использовать эти события в других проектах без необходимости переписывать код. Это значительно экономит время и силы разработчиков.
