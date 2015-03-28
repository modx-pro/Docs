Выводит форму для создания продукта minishop2 пользователем из фронтэнда.
[Github репозиторий](https://github.com/me6iaton/ms2form)

[![](https://file.modx.pro/files/c/3/a/c3a73249165844c116d0463006c6272cs.jpg)](https://file.modx.pro/files/c/3/a/c3a73249165844c116d0463006c6272c.png)

## Возможности

- редактор [bootstrap-markdown](http://www.codingdrama.com/bootstrap-markdown/)
- загрузка изображений в галерею перетаскиванием, запись превью на диск, настройка параметров через источник файлов
- поддержка мультикатегорий
- поддержка тегов
- поддержка дополнительных TV
- поддержка шаблонов

##Системные настройки

| Название                   | По умолчанию                   | Описание                                                                                   |
| -------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------|
| **ms2form_assets_url**     | /assets/components/ms2form/    | Url к файлам фронтенда                                                                     |
| **ms2form_core_path**      | {core_path}components/ms2form/ | Путь к компоненту                                                     |
| **ms2form_frontend_css**   | /assets/components/ms2form/css/web/ms2form.css  | Путь к файлу со стилями магазина. Если вы хотите использовать собственные стили - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта. |
| **ms2form_frontend_js**    | /assets/components/ms2form/js/web/ms2form.js  | Путь к файлу со скриптами магазина. Если вы хотите использовать собственные скрипты - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта. |
| **ms2form_mail_bcc**      | 1 | Укажите через запятую список id администраторов, которым нужно отправлять сообщения о новых тикетах и комментариях. |
| **ms2form_mail_createdby** | Да | Отправлять уведомление создателю ресурса |
| **ms2form_mail_from** |  | Адрес для отправки почтовых уведомлений. Если не заполнен - будет использована настройка "emailsender". |
| **ms2form_mail_from_name** |  | Имя, от которого будут отправлены все уведомления. Если не заполнен - будет использована настройка "site_name". |


## Параметры ызова сниппета

| Название				| По умолчанию																| Описание                                                                      |
| ----------------|---------------------------------------------|-------------------------------------------------------------------------------|
| **allowFiles** | Да | Разрешить пользователю загружать файлы на сервер. |
| **allowedFields** | parent,pagetitle,content,published,template,hidemenu,tags | Поля тикета, которые разрешено заполнять пользователю. Можно указывать имена TV параметров. |
| **parents** |  | Список id, через запятую, родителей категорий в которых будет опубликован ресурс одновременно с основной категорией. По умолчанию выводятся все доступные категории |
| **parentsIncludeTVs** |  | Список названий TV, через запятую, которые будут выводится вместе с дополнительными категориями |
| **parentsSortby** | pagetitle | Поле для сортировки дополнительных категорий, можно использовать TV |
| **parentsSortdir** | ASC | Направление сортировки дополнительных категорий |
| **permissions** | section_add_children | Проверка прав на публикацию в раздел. По умолачанию проверяется разрешение "section_add_children". |
| **requiredFields** | parent,pagetitle,content | Обязательные поля ресурса, которые пользователь должен заполнить для отправки формы. |
| **resources** |  | Список id, через запятую, категорий в которых будет опубликован ресурс одновременно с основной категориией. Альтернатива parents |
| **source** |  | Id источника медиа для загрузки файлов. По умолчанию будет использован источник, указанный в системной настройке "ms2_product_source_default". |
| **templates** | 1 | Список id шаблонов для публикации ресурсов формата "1==Базовый,2==Дополнительный", можно указать только один id шаблона, по умолчанию используется шаблон с id равным 1 |
| **tplCreate** | tpl.ms2form.create | Чанк для создания нового ресурса |
| **tplEmailBcc** | tpl.ms2form.email.bcc | Чанк для уведомления администраторов сайта о новом ресурсе. |
| **tplFile** | tpl.ms2form.file | Чанк оформления загруженного файла, который не является изображением. |
| **tplFiles** | tpl.ms2form.files | Контейнер для вывода загрузчика и списка уже загруженных файлов. |
| **tplImage** | tpl.ms2form.image | Чанк оформления загруженного изображения. |
| **tplSectionRow** | tpl.ms2form.section.row | Чанк для оформления вывода дополнительной категории  |
| **tplTagRow** | tpl.ms2form.tag.row | Чанк для оформления вывода тега |
| **tplUpdate** | tpl.ms2form.update | Чанк для обновления существующего ресурса  |


## Способы вызова
*Сниппет вызывается не кэшированным.*
```
[[!ms2form?
  &parent=`54`
  &parents=`54,58`
  &templates=`1==Базовый,2==Дополнительный`
  &allowedFields=`parent,pagetitle,content,published,template,hidemenu,tags,tv1`
  &requiredFields=`parent,pagetitle,content`
]]
```

Свойства ресурса и дополнительные поля нужно добавить в параметр allowedFields и в чанки

tpl.ms2form.create:

```
<input type="hidden" name="hidemenu" value="0"/>

<div class="form-group">
  <label>[[%ms2form_pagetitle]]</label>
  <span class="text-danger">*</span>
  <input type="text" class="form-control" placeholder="[[%ms2form_pagetitle]]" name="pagetitle" value="" maxlength="50" id="ms2formPagetitle"/>
</div>

<div class="form-group">
  <label>Пример TV </label>
  <br/>
  <input type="text" name="tv1" class="form-control">
</div>
```

tpl.ms2form.update:

```
<input type="hidden" name="hidemenu" value="0"/>

<div class="form-group">
  <label>[[%ms2form_pagetitle]]</label>
  <input type="text" class="form-control" placeholder="[[%ms2form_pagetitle]]" name="pagetitle" value="[[+pagetitle]]" maxlength="50" id="ms2form-pagetitle"/>
</div>


<div class="form-group">
  <label>Пример TV </label>
  <br/>
  <input type="text" value="[[+tv1]]" name="tv1" class="form-control">
</div>
```

Внешний вид дополнительных TV и полей ресурса кроме шаблона, тегов, мультикатегорий, редактора контента и галереи нужно определять вручную с помощью сторонних скриптов или использовать скрытое поле ```<input type="hidden" name="hidemenu" value="0"/>```  
