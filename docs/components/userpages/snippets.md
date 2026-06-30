## userPages

Выводит форму добавления / редактирования ресурса, подключает все необходимые скрипты и стили.
| Параметр | Описание | По умолчанию |
|:---|:---|:---|
| class | Класс ресурса (modResource/msProduct) | `modResource` |
| parent | Родительский ресурс |  |
| template | Шаблон ресурса | `[[++default_template]]` |
| published | Публиковать ли ресурс сразу после добавления | `[[++publish_default]]` |
| required | Обязательные поля через запятую | `pagetitle,content` |
| migxFields | MIGX-поля для вывода в форме (через запятую).<br>Параметр используется для построения табличных виджетов. |  |
| tplCreateForm | Чанк-шаблон формы создания ресурса | `up_create_form` |
| tplEditForm | Чанк-шаблон формы редактирования ресурса | `up_edit_form` |
| errorText | Чанк-шаблон текста ошибки (при невозможности создания/редактирования) | `up_error_text` |
| notifications | Скрипт всплывающих уведомлений | `[[++up_notifications]]` |
| userGroups | Группы пользователей через зяпятую, которые могут работать с userPages | `Administrator` |
| emailFrom | Адрес отправителя email-уведомлений | `[[++emailsender]]` |
| emailManager | Почтовые адреса менеджеров для уведомлений | `[[++emailsender]]` |
| emailManagerSubject | Тема письма менеджерам | `[[%up_manager_subject]]` |
| emailManagerTpl | Чанк-шаблон письма менеджерам | `up_email_tpl` |

### Примеры
Минимальный вызов:

```
{'!userPages' | snippet : []}
```

Работа с товаром miniShop3 в категории с id=15, модерацией ('published' => 0), cвоими чанками форм и адресами менеджеров:

```
{'!userPages' | snippet : [
    'class' => 'msProduct',
    'parent' => 15,
    'published' => 0,
    'tplCreateForm' => 'my_create_form',
    'tplEditForm' => 'my_edit_form',
    'emailManager' => 'manager1@gmail.com,manager2@gmail.com',
]}
```

Помимо этого можно указать любое предустанавливаемое значение для ресурса с учетом префикса:

| Префикс | Описание | Пример |
|:--- |:--- |:--- |
| **Без префикса** | Поле ресурса (таблица `modx_site_content`)	| `'introtext' => 'Текст',` |
| **tv_** | TV-параметр	 | `'tv_instock' => 0,` |
| **ms_** | Поле товара miniShop3 (таблица **modx_ms3_products**) | `'ms_new' => 1,` |
| **mso_** | Опции товара miniShop3 (таблица **modx_ms3_product_options**) | `'mso_material' => 'Металл',` |
| **migx_** | TV-параметр типа MIGX.<br>Значения указывайте в JSON-формате. | <pre>'migx_chars' => '[ [ { "title":"Высота","value":"1500"},{"title":"Ширина","value":"500"} ] ]',</pre>|


Указание полей в вызове перекрывает данные из формы, то есть если в вызове указано `'parent'=> 15`, а в форме есть поле с `name="parent"`, то что-бы пользователь в нем не проставил, родителем будет ресурс с ID=15.

## upCheck
Сниппет используется в форме редактирования для вывода значений полей ресурса (выбранные селекты, отмеченные чекбоксы).

| Параметр | Описание |
|:---|:---|
| **rid** | ID ресурса |
| **field** | Поле с префиксом |
| **value** | Значение |
| **type** | Тип вывода (selected - для списков, пусто - для checkbox и radio) |

Например, в чанке **up_category_tpl** (вывод категорий товара в виде чекбоксов):

```
<label class="badge badge-secondary">
    <input type="checkbox" name="ms_category[]" value="{$id}" {'!upCheck' | snippet : [ 'rid' => $rid, 'field' => 'ms_category', 'value' => $id]}>
    {$pagetitle}
</label>
```
