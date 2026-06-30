В комплекте идут чанки с примерами форм (поддерживается Fenom и стандартный синтаксис). В форме редактирования доступен плейсхолдер `rid`, который выводит ID редактируемого ресурса и его можно использовать для вывода значений полей через модификатор resource:

```{$rid | resource : 'fieldname'}```

## Префиксы полей
| Префикс | Описание | Пример |
|:--- |:--- |:--- |
| **Без префикса** | Поле ресурса (таблица `modx_site_content`)	| `pagetitle` `longtitle` `content` |
| **tv_** | TV-параметр	 | `tv_tvname` |
| **migx_** | TV-параметр типа MIGX | `migx_tvname` |
| **ms_** | Поле товара miniShop3 (таблица modx_ms3_products) | `ms_price` `ms_new` `ms_vendor` |
| **mso_** | Опции товара miniShop3 (таблица modx_ms3_product_options) | `mso_fieldname` |

Поле ресурса:

```
<input name="pagetitle" value="{$rid | resource : 'pagetitle'}" placeholder="{'up_pagetitle' | lexicon}">
```

Поле товара miniShop3:

```
<label>
    <input type="checkbox" name="ms_popular" value="1"> {'up_popular' | lexicon}
</label>
```

Селект производителей товаров miniShop3 (чанк **up_vendor_option** идёт в комплекте):

```
<select name="ms_vendor_id">
    {'pdoResources' | snippet : [
        'class' => 'MiniShop3\Model\msVendor',
        'sortby' => '{ "name":"ASC" }'
        'tpl' => 'up_vendor_option',
        'rid' => $rid
    ]}
</select>
```

Категории товара miniShop3 (чанк **up_category_tpl** идёт в комплекте):

```
{'pdoResources' | snippet : [
  'parents' => 0,
  'where' => '{ "class_key:LIKE":"%Category%" }',
  'limit' => 0,
  'sortby' => '{ "pagetitle":"ASC" }'
  'tpl' => 'up_category_tpl'
  'rid' => $rid
]}
```

TV-параметр с именем instock:

```
<input name="tv_instock" value="{$rid | resource : 'instock'}">
```

У TV с типом **image** или **file** скрипт проверит источник файлов, создаст там директорию с ID нового ресурса и загрузит файлы в неё.

### MIGX-параметры
Табличный виджет при загрузке проверяет что прописано у данного TV в названии и параметрах ввода (конфигурация MIGX или вкладки формы) и формирует соответствующую таблицу, в которой можно добавлять и удалять строки, перемещать их местами и т.д.

![](https://demo.rpa-design.ru/media/userpages/migx.jpg)  

Пример вывода виджета для поля с именем **chars** (обратите внимание на `id="migx_chars_widget"` у контейнера и атрибуты `name` и `id`, а также плейсхолдер `{$migx_chars}` скрытого `textarea`):

```
<div id="migx_chars_widget" class="tablewidget"></div>
<textarea name="migx_chars" id="migx_chars" class="up-hidden">{$migx_chars}</textarea>
```

### Поле с текстовым редактором

![](https://demo.rpa-design.ru/media/userpages/richtext.jpg)

У контейнера должен быть атрибут `data-field` со значением, соответствующим name скрытого `textarea`:

```
<div class="up-richeditor" data-field="content"></div>
<textarea name="content" class="up-hidden">{$rid | resource : 'content'}</textarea>
```

### Поля Dropzone
Виджет поддерживает мультизагрузку и изменение порядка файлов.

![](https://demo.rpa-design.ru/media/userpages/dropzone.jpg)  

Для настройки виджета используются data-атрибуты у контейнера:

| Атрибут | Описание | По умолчанию |
|:---|:---|:---|
| data-field | Имя поля	 |
| data-files | Максимальное кол-во файлов	| 5 |
| data-types | Типы файлов. Можно указывать как непосредственно расширения, так и [типы](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept). | image/* |
| data-size | Размер одного файла в МБ | 5 |
	
Например, есть TV-параметр **file** для файлов типа **PDF**,**XLSX**,**DOCX** и нужно ограничить количество файлов тремя, чтобы каждый весил не более **10МБ**:

```
<div class="up-dropzone dropzone" data-field="tv_files" data-files="3" data-types=".pdf,.xlsx,.docx" data-size="10"></div>
<textarea name="tv_files" class="up-hidden">{$rid | resource : 'files'}</textarea>
```

Если для TV-поля указан источник файлов, отличный от **Filesystem**, то в форме редактирования для вывода существующего значения используйте сниппет `upCheck` без параметра `value` (он выведет чистые данные из базы):

```
<textarea name="tv_files" class="up-hidden">
    {'!upCheck' | snippet : ['rid' => $rid, 'field' => 'tv_files']}
</textarea>
```

Галерея товара miniShop3 с Dropzone и настройками по умолчанию (чанк **up_gallery_tpl** идёт в комплекте):

```
<div class="up-dropzone dropzone" data-field="ms_gallery"></div>
<textarea name="ms_gallery" class="up-hidden">{'!msGallery' | snippet : ['product' => $rid, 'tpl' => 'up_gallery_tpl']}</textarea>
```
