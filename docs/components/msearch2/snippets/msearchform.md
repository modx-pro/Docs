# mSearchForm

Сниппет для вывода формы поиска с автодополнениями.

Из-за специфики работы через Ajax должен вызываться некэшированным.

## Параметры

| Название          | По умолчанию        | Описание                                                                                                                                                                                                                                                       |
|-------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&pageId**       |                     | Id страницы, на которую будет отправлен поисковый запрос. По умолчанию - текущая страница.                                                                                                                                                                     |
| **&tplForm**      | `tpl.mSearch2.form` | Чанк с HTML формой для вывода, обязательно должен содержать «class="msearch2"» в теге «\<form\>».                                                                                                                                                              |
| **&tpl**          | `tpl.mSearch2.ac`   | Чанк оформления для каждого результата                                                                                                                                                                                                                         |
| **&element**      | `mSearch2`          | Сниппет, который будет вызываться для вывода результатов работы. По умолчанию - [mSearch2][1].                                                                                                                                                                 |
| **&limit**        | `5`                 | Лимит выборки результатов                                                                                                                                                                                                                                      |
| **&autocomplete** | `results`           | Настройка автодополнения. Возможные варианты: «results» - поиск по сайту (для вывода результатов будет вызван сниппет, указанный в **&element**), «queries» - поиск по таблице запросов, «0» - выключить автодополнение.                                       |
| **&queryVar**     | `query`             | Имя переменной для получения поискового запроса из «$_REQUEST». По умолчанию - «query».                                                                                                                                                                        |
| **&minQuery**     | `3`                 | Минимальная длина поискового запроса.                                                                                                                                                                                                                          |
| **&fields**       |                     | Список проиндексированных полей ресурса, через запятую, в которых нужно искать. Вы можете также указать вес для каждого поля, через запятую: **&fields=`pagetitle:5,content:3,comment:1`**. По умолчанию используется системная настройка `mse2_index_fields`. |
| **&onlyIndex**    | `false`             | Включить режим поиска только по индексу слов, и отключить дополнительные результаты, найденные простым поиском через LIKE.                                                                                                                                     |

## Автодополнение

Основная функция сниппета - реализация автодополнений к набираемым запросам. Есть 2 режима:

### results

Поиск производится стандартным алгоритмом: по словарному индексу с уточнениями.
Затем id найденных страниц передаются в сниппет, указанный в параметре **&element** и уже он выводит результаты.

Вы можете указать любые параметры этому сниппету, чтобы он выводил только подходящие вам результаты. Например, документы из определенного контейнера, категории товаров и т.д.

То есть, поиск выдаёт все подходящие страницы и вы указываете, что именно выводить сниппетом. Получается, что этот режим не «дополняет» ваш запрос, а уже выводит готовые результаты.
Поэтому при выборе пункта из списка вы сразу на него перейдёте.

[![](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99cs.jpg)](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99c.png)

### queries

А вот этот режим уже настоящее дополнение запросов. Он проводит простенький поиск по [истории запросов][4], которая отображается у вас системе управления.

То есть, он выводит подходящие запросы, которые уже искали другие пользователи, и нашли. Запросы с нулевым количеством результатов не будут показаны - от них никакого толку.

При выборе запроса из списка, он будет вставлен в форму и она сразу отправится.

[![](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789ds.jpg)](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789d.png)

## Скрипты и стили

В работе сниппет использует скрипты и стили указанные с системных настройках:

- **mse2_frontend_js** - стандартный javascript, по умолчанию `/assets/components/msearch2/js/web/default.js`
- **mse2_frontend_css** - стандартные css стили оформления, по умолчанию `/assets/components/msearch2/css/web/default.css`

Для нормальной работы скриптам нужно знать, какие параметры были указаны при вызове сниппета, поэтому дополнительно на страницу регистрируются важные настройки, типа **&minQuery**, **&queryVar** и **&autocomplete**.

Если вы хотите внести какие-то изменения в стандартные файлы, нужно их переименовать и указать новые значения в системных настройках, иначе все ваши изменения будут перезаписаны при очередном обновлении.

Для реализации функционала автодополнений используется [jQueryUI.autocomplete][3]. Если он еще не подключен у вас на сайте, mSearchForm загрузит его самостоятельно.
Autocomplete автоматически применяется ко всем формам на странице, у которых указан «class="msearch2"».

## Примеры

Обычный вызов сниппета:

```modx
[[!mSearchForm]]
```

mSearchForm передаёт все полученные параметры в сниппет, указанный в **&element**, а значит, вы можете указывать такие значения:

```modx
[[!mSearchForm?
  &element=`pdoResources`
  &includeTVs=`image,file`
]]

[[!mSearchForm?
  &element=`msProducts`
  &includeThumbs=`120x90`
  &where=`{"Data.price:>":0}`
]]

```

[1]: /components/msearch2/snippets/msearch2
[3]: http://jqueryui.com/autocomplete/
[4]: /components/msearch2/interface/queries
