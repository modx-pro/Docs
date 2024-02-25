# Загрузка файлов

На хостингах существует ограничение на максимальный размер данных в post-запросе, как правило, это 20МБ. При необходимости загрузить на сервер файл большого объем, его
нужно дробить. **SendIt** сделает это за вас.
Для загрузки через стандартное поле типа *файл* используйте такую разметку:
```html:line-numbers
<form enctype="multipart/form-data" data-si-form="formWithFile" data-si-preset="form_with_file">
    <label data-fu-wrap data-si-preset="upload_simple_file" data-si-nosave>
        <div data-fu-progress=""></div>
        <input type="hidden" name="filelist" data-fu-list>
        <input type="file" name="files" data-fu-field multiple placeholder="Выберите файл">
        <template data-fu-tpl>
            <button type="button" data-fu-path="$path">$filename&nbsp;x</button>
        </template>
    </label>   
</form>
```

Чтобы появилась возможность добавлять файлы перетаскиванием, используйте такую разметку
```html:line-numbers
<form enctype="multipart/form-data" data-si-form="formWithFile" data-si-preset="form_with_file">
    <div data-fu-wrap data-si-preset="upload_drop_file" data-si-nosave>
        <div data-fu-progress=""></div>
        <input type="hidden" name="filelist" data-fu-list>
        <label data-fu-dropzone> // [!code ++]
            <input type="file" name="files" data-fu-field multiple class="v_hidden">
            <span data-fu-hide>Перетащите сюда файлы</span>
        </label>
        <template data-fu-tpl>
            <button type="button" data-fu-path="$path">$filename&nbsp;x</button>
        </template>
    </div>  
</form>
```


### Описание атрибутов

* **data-fu-wrap** - атрибут блока-обёртки.
* **data-fu-progress** - атрибут блока-обёртки прогресс-бара.
* **data-fu-dropzone** - атрибут блока-обёртки зоны для добавления файлов перетаскивание (drag'n'drop).
* **data-fu-list** - атрибут скрытого поля для записи списка загруженных файлов.
* **data-fu-field** - атрибут поля загрузки.
* **data-fu-tpl** - атрибут шаблона.
* **data-fu-path** - атрибут для указания пути к конкретному файлу.
* **data-fu-hide** - атрибут элемента, который необходимо скрыть после добавления хотя бы одного файла.

### Порядок работы
::: danger
Блок-обёртка с атрибутом **data-fu-wrap** ОБЯЗАТЕЛЬНО должен быть внутри формы с атрибутом **data-si-form**. Остальные элементы с атрибутами **data-fu-*** должны быть 
внутри блока-обёртки. 
блока
:::
Пользователь выбирает файлы, которые хочет загрузить.
::: tip
Атрибут **multiple** позволяет загружать сразу несколько файлов, зажав клавишу [[Ctrl]]. Загрузка будет последовательной.
:::
После этого список файлов отправляется на сервер, где происходит их валидация на тип, размер и общее количество. Параметры валидации берутся из пресета, однако есть 
возможность [изменить их в JavaScript](https://docs.modx.pro/components/sendit/development#izmenenie-parametrov-validacii) 
или плагином на [событие **OnBeforeFileValidate**](https://docs.modx.pro/components/sendit/events#pered-proverkoy-faylov-parametrov). Изменения параметров внесённые через 
плагин имеют бОльший приоритет.

Файлы, прошедшие валидацию, будут загружены. Ошибки валидации будут показаны во всплывающих уведомлениях. На время загрузки, кнопка отправки формы блокируется, после 
загрузки всех файлов - разблокируется. Предусмотрена возможность многопоточной загрузки. Количество потоков регулируется в пресете параметром `threadsQuantity`.
::: info
Тестирование показало, что количество потоков на шаред-хостингах на скорость загрузки не влияет. Однако, возможно дело в ограничения браузера или пропускной способности 
конкретного интернет-соединения.
:::

После успешной загрузки путь к файлу будет добавлен в список загруженных файлов - скрытый input с атрибутом **data-fu-list**, который ОБЯЗАТЕЛЬНО нужно добавить внутрь 
блока с атрибутом **data-fu-wrap**. 

Кроме того появятся превью файлов, для их создания будет использован шаблон из блока с атрибутом **data-fu-tpl**. Шаблон поддерживает плейсхолдеры *$path* и *$filename*.
Чтобы пользователь мог удалить загруженные файлы, в шаблоне должна быть кнопка с атрибутом **data-fu-path**.
::: warning
Пользователь сможет удалить только свои файлы, так как перед удалением проверяется соответствие его session_id и пути к файлу.
:::

Загруженные файлы хранятся в папке с именем равным id сессии. При закрытии или перезагрузки страницы все файлы пользователя будут удалены.

### Параметры пресета

```php:line-numbers
'upload_simple_file' => [   
    'maxSize' => 6,
    'maxCount' => 2,
    'allowExt' => 'jpg,png',
    'portion' => 0.1,
]
```

* **maxSize** - максимально допустимый размер одного файла в мегабайтах.
* **maxCount** - максимально допустимое для загрузки количество файлов.
* **allowExt** - разрешённые форматы файлов.
* **portion** - размер одной порции файла в мегабайтах.

::: warning
Размер порции не должен превышать максимально разрешённый на вашем хостинге разме post-запроса
:::

### Прикрепление файлов к письму
Чтобы прикрепить файлы к письму, добавьте тегу form атрибут **enctype="multipart/form-data"**, а так же добавьте в пресет такие параметры:
* **attachFilesToEmail** - содержит имя поля для загрузки файлов (в примере files).
* **allowFiles** - содержит имя поля со списком загруженных файлов (в примере filelist); именно из этого поля вы сможете получить список файлов для дальнейшей
  обработки, например для перемещения в другую папку или пересылки в облачное хранилище.
```php:line-numbers
'form_with_file' => [
    'extends' => 'default',
    'validate' => 'name:required',
    'attachFilesToEmail' => 'files',
    'allowFiles' => 'filelist',
    'clearFieldsOnSuccess' => 1,
],
```

### Уведомления

Тексты уведомлений берутся из словаря (см. *"Управление словарями"*) компонента по следующим ключам:

* **si_msg_loading** - показывает прогресс загрузки.
* **si_msg_loaded** - текст уведомления об успешном окончании загрузки.
* **si_msg_file_remove_session_err** - текст ошибки в случае, когда ID текущей сессии не содержится в переданном пути.
* **si_msg_file_loaded_err** - текст ошибки в случае, когда файл пытаются загрузить повторно.
* **si_msg_file_loading_err** - текст ошибки в случае, когда файл пытаются загрузить повторно, а он загружается в данный момент.
* **si_msg_files_count_err** - текст ошибки, которая появляется, если пользователь пытается дополнительно загрузить больше файлов, чем осталось до максимума.
* **si_msg_files_maxcount_err** - текст ошибки, которая появляется, если пользователь пытается загрузить больше файлов, чем разрешено.
* **si_msg_files_loaded_err** - текст ошибки, которая появляется, если пользователь пытается дополнительно загрузить файлы, после того, как максимальное количество было 
  загружено.
* **si_msg_file_size_err** - текст ошибки о превышении максимального размера файла.
* **si_msg_file_extention_err** - текст ошибки о недопустимом расширении файла.

## Конфигурация JavaScript

::: details Конфигурация по умолчанию

```js:line-numbers{3-42}
export default function returnConfigs() {
    return {
        FileUploaderFactory:{
            pathToScripts: './modules/fileuploader.js',
            formSelector: '[data-si-form]',           
            rootSelector: '[data-fu-wrap]',
            progressSelector: '[data-fu-progress]',
            presetKey: 'siPreset',
            tplSelector: '[data-fu-tpl]',
            dropzoneSelector: '[data-fu-dropzone]',
            fileListSelector: '[data-fu-list]',
            progressIdAttr: 'data-fu-id',
            progressTextAttr: 'data-fu-text',
            hideBlockSelector: '[data-fu-hide]',
            presetSelector: '[data-si-preset]',            
            sendEvent: 'si:send:after',
            pathKey: 'fuPath',
            pathAttr: 'data-fu-path',
            actionUrl: 'assets/components/sendit/action.php',
            hiddenClass: 'v_hidden',
            progressClass: 'progress__line',
            showTime: false
        }
    }
}
```

:::

|        Ключ         |                              Описание                               |                           Значение                           |
|:-------------------:|:-------------------------------------------------------------------:|:------------------------------------------------------------:|
|   `pathToScripts`   |                 **./modules&nbsp;/fileuploader.js**                 |  путь к модулю, указывается относительно файла *sendit.js*   |
|   `formSelector`    |                         **[data-si-form]**                          |                        селектор формы                        |
|   `rootSelector`    |                         **[data-fu-wrap]**                          |          селектор блока-обёртки поля загрузки фалов          |
| `progressSelector`  |                       **[data-fu-progress]**                        |     селектор блока-обёртки для прогресса загрузки файлов     |
|    `tplSelector`    |                          **[data-fu-tpl]**                          |               селектор блока с шаблоном превью               |
| `dropzoneSelector`  |                       **[data-fu-dropzone]**                        |                  селектор блока drag'n'drop                  |
| `fileListSelector`  |                         **[data-fu-list]**                          |         селектор поля со списком загруженных файлов          |
|  `progressIdAttr`   |                           **data-fu-id**                            |        атрибут-идентификатор прогресса загрузки файла        |
| `progressTextAttr`  |                          **data-fu-text**                           |     атрибут для вставки текста прогресса загрузки файла      |
| `hideBlockSelector` |                         **[data-fu-hide]**                          |          атрибут для скрываемых при загрузке блоков          |
|  `presetSelector`   |                        **[data-si-preset]**                         |                       селектор пресета                       |
|     `sendEvent`     |                          **si:send:after**                          |                 события завершения отправки                  |
|      `pathKey`      |                             **fuPath**                              |   ключ свойства *dataset* атрибута для записи пути к файлу   |
|     `pathAttr`      |                          **data-fu-path**                           |               атрибут для записи пути к файлу                |
|     `actionUrl`     | **assets&nbsp;/components&nbsp;/sendit&nbsp;/web&nbsp;/action.php** |                путь к файлу-приемнику запроса                |
|    `hiddenClass`    |                            **v_hidden**                             |      класс добавляемый тегу с атрибутом *data-fu-hide*       |
|   `progressClass`   |                         **progress__line**                          |    класс добавляемый тегу отображающему прогресс загрузки    |
|     `showTime`      |                              **false**                              | позволяет отобразить в консоли браузера время загрузки файла |
