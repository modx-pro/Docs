Система голосования и опросов для MODX Revolution

![](https://file.modx.pro/files/b/a/7/ba7e5f21b01fb0787c8f9e983acb4c99.png)

[Github][1]  
[Поcледние версии][2]

## Возможности

- конструктор форм для голосования в modx manager
- вывод результaтов голосования с сортировкой и поиском в modx manager
- вывод форм и результатов для голосования на сайте, обновление на лету через ajax
- возможность привязать результаты голосования к ресурсу или любому другому объекту создав новый thread

## Системные настройки

| Название                   | По умолчанию                      | Описание                                                                                                                                                                |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **voteforms_assets_url**   | {assets_url}components/voteforms/ | Url к файлам фронтенда                                                                                                                                                  |
| **voteforms_core_path**    | {core_path}components/voteforms/  | Путь к компоненту                                                                                                                                                       |
| **voteforms_frontend_css** | [+cssUrl]]web/voteforms.css       | Путь к файлу со стилями. Если вы хотите использовать собственные стили - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта.     |
| **voteforms_frontend_js**  | [[+jsUrl]]web/voteforms.js        | Путь к файлу со скриптами. Если вы хотите использовать собственные скрипты - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта. |

## Параметры вызова сниппета VoteForm

| Название     | По умолчанию        | Описание                                                           |
| ------------ | ------------------- | ------------------------------------------------------------------ |
| **id**       |                     | Id формы, обязательный параметр                                    |
| **thread**   | resource-[[*id]]    | Имя ветки для записи результатов. По умолчанию, "resource-[[*id]]" |
| **tplRow**   | tpl.VoteForms.row   | Чанк оформления для каждого поля                                   |
| **tplOuter** | tpl.VoteForms.outer | Чанк оформления всего содержимого                                  |
| **sortby**   | index               | Поле для сортировки.                                               |
| **sortdir**  | ASC                 | Направление сортировки                                             |
| **submit**   | false               | Использовать кнопку отправить в форме                              |

## Параметры вызова сниппета getVoteFormRating

| Название     | По умолчанию         | Описание                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------ |
| **form**     |                      | Id формы, обязательный параметр                                    |
| **resource** |                      | Id ресурса. По умолчанию текущий ресурс                            |
| **field**    |                      | Id поля - вывести результаты голосования только по этому полю      |
| **thread**   | resource-[[*id]]     | Имя ветки для записи результатов. По умолчанию, "resource-[[*id]]" |
| **tpl**      | tpl.VoteForms.rating | Чанк оформления                                                    |
| **stars**    | true                 | Выводить виджет с результатами голосования или нет                 |

## Способы вызова

```php
[[VoteForm?&id=`1`]]
```

```php
[[getVoteFormRating?form=1]]
```

```php
[[getVoteFormRating?form=1&field=2]]
```

Испрользование вместе с pdoResources : сортировка ресурсов по рейтингу из формы c id 1

```php
[[pdoResources?
    &class=`modResource`
    &parents=`0`
    &tpl=`@INLINE <li>[[+pagetitle]] - <span class="badge">[[+rating]]</span> </li>`
    &leftJoin=`{
        "VoteFormThread": {
        "class": "VoteFormThread",
        "on": "modResource.id = VoteFormThread.resource AND VoteFormThread.form = 1"
        }
    }`
    &select=`{
    "modResource": "*",
    "VoteFormThread": "rating"
    }`
    &sortby=`VoteFormThread.rating`
    &sortdir=`DESC`
]]
```

## Плейсхолдеры доступные в чанках компонента

### VoteForm - tpl.VoteForms.outer

output, rating_max, параметры вызова сниппета  

### VoteForm - tpl.VoteForms.row

- поля объекта VoteFormField: id, index, form, name, description, type
- результат голосования пользователя: record, rating_max

### getVoteFormRating - tpl.VoteForms.rating

- поля объекта VoteFormThread: id, resource, form, name, rating, users_count
- поля объекта VoteFormForm: form.id, form.name, form.description, form.active, form.rating_max
- при указанном параметре field:
  - поля объекта VoteFormField: field.id, field.index, field.form, field.name, field.description, field.type
  - rating и users_count рассчитываются для конкретного поля
- виджет для голосования: stars  

## Разработка дополнения

О предложениях и ошибках в работе VoteForms сообщайте на [Github][3].

[1]: https://github.com/me6iaton/VoteForms
[2]: https://github.com/me6iaton/VoteForms/releases
[3]: https://github.com/me6iaton/VoteForms/issues
