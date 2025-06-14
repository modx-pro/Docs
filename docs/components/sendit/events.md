# События

## Системные события

### События SendIt

---

#### OnGetFormParams - генерируется на этапе формирования списка параметров, позволяет полностью переписать параметры отправки формы, должен возвращать массив

Доступные параметры:

* **$formName** - ключ формы из атрибута **data-si-form**.
* **$presetName** - ключ параметров пресета из атрибута **data-si-preset**.
* **$SendIt** - экземпляр класса-обработчика.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnGetFormParams':
    if ($presetName === 'test'){
      $SendIt->pluginParams['myparam'] = 123;
    }
    break;
}
```

:::

#### OnBeforeFileValidate - генерируется перед началом валидации группы файлов

Доступные параметры:

* **$formName** - ключ формы из атрибута **data-si-form**.
* **$presetName** - ключ параметров пресета из атрибута **data-si-preset**.
* **$SendIt** - экземпляр класса-обработчика.
* **$filesData** - массив информации о файлах.
* **$totalCount** - количество уже загруженных пользователем файлов.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeFileValidate':
    $SendIt->params['maxCount'] = 5;
    break;
}
```

:::

#### OnCheckPossibilityWork - генерируется после проведения штатной проверки, перед проверкой результатов, позволяет изменить результаты проверки

Доступные параметры:

* **$formName** - имя формы или пресета.
* **$result** - результат проверки.

::: details Пример плагина

```php:line-numbers
// добавляем ограничение на частоту отправок с одного IP
switch($modx->event->name){
  case 'OnCheckPossibilityWork':
    if (!$session = $modx->getObject('siSession', [
      'session_id' => $_SERVER['REMOTE_ADDR'],
      'class_name' => $formName
    ])) {
      SendIt::setSession($modx, ['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
      $modx->event->returnedValues['result']['success'] = 1;
    } else{
      $createdon = strtotime($session->get('createdon')) + 360;
      if ($createdon > time()) {
        $modx->event->returnedValues['result'] = [
          'success' => 0,
          'message' => 'Вы пока не можете отправить эту форму.',
          'data' => []
        ];
      } else{
        $modx->event->returnedValues['result']['success'] = 1;
        SendIt::setSession($modx, ['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
      }
    }
    break;
}
```

:::

#### OnBeforePageRender - генерируется перед тем как будет проверен хэш и вызван сниппет-рендер

Доступные параметры:

* **$formName** - ключ формы из атрибута **data-si-form**.
* **$presetName** - ключ параметров пресета из атрибута **data-si-preset**.
* **$SendIt** - экземпляр класса-обработчика.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforePageRender':
    if ($_REQUEST['query']){
      $SendIt->params['where']['pagetitle:LIKE'] = '%' . $_REQUEST['query'] . '%';
      $SendIt->params['query'] = $_REQUEST['query'];
    }
    break;
}
```

:::

#### OnBeforeReturnResponse - генерируется перед отдачей ответа на фронт, вне зависимости от того какой сниппет вы используете

Доступные параметры:

* **$formName** - ключ формы из атрибута **data-si-form**.
* **$presetName** - ключ параметров пресета из атрибута **data-si-preset**.
* **$SendIt** - экземпляр класса-обработчика.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeReturnResponse':
    if ($_POST['email'] && in_array($presetName, ['auth', 'register'])){
      $user = $modx->getObject('modUser', ['username' => $_POST['email']]);
      if ($user && !$user->isMember('Designers')) {
        $SendIt->params['redirectUrl'] = $modx->makeUrl(54750, '', '', 'full');
      }
    }
    break;
}
```

:::

#### senditOnGetWebConfig - генерируется при формировании конфигурации для фронта

Доступные параметры:

* **$webConfig** - массив параметров конфигурации.
* **$object** - экземпляр класса SendIt.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnGetWebConfig':
    $object->webConfig['myparam'] = 'test;
    break;
}
```

:::

### События Identification

---

#### siOnUserUpdate - генерируется после обновления данных пользователя с фронта

Доступные параметры:

* **$user** - объект modUser.
* **$profile** - объект modUserProfile.
* **$data** - массив значений переданных с фронта.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'siOnUserUpdate':

    break;
}
```

:::

#### OnWebLogin - генерируется при авторизации пользователя с фронта

Доступные параметры:

* **$user** - объект modUser.
* **$attributes** - параметр **rememberme**.
* **$lifetime** - время хранения сессии.
* **$loginContext** - контекст в который авторизуется пользователь.
* **$addContexts** - список дополнительных контекстов для авторизации.
* **$session_id** - ID сессии.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnWebLogin':

    break;
}
```

:::

#### OnUserActivate - генерируется при активации пользователя с фронта

Доступные параметры:

* **$user** - объект modUser.
* **$profile** - объект modUserProfile.
* **$data** - массив значений переданных с фронта.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'OnWebLogin':

    break;
}
```

:::

## События JavaScript

### События SendIt

---

#### si:init - инициализация компонента

Событие возникает после загрузки всех модулей, указанных в JS конфигурации. Не имеет параметров. Не может быть отменено. Чтобы без проблем использовать все модули,
подписывайте на это событие,
так как после его срабатывания объект **Sendit** и его дочерние элементы точно доступны.
::: details Пример использования

```js:line-numbers
document.addEventListener('si:init', (e) => {
  console.log(SendIt);
});
```

:::

### События Отправки (Sending)

---

#### si:send:before - перед отправкой

Событие возникает перед отправкой данных на сервер. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **action** - название действия, служит для удобства дифференцирования логики, т.е. если вам нужно чтобы какая-то функция срабатывала только при отправке формы,
  но не при загрузке файла; менять этот параметр не нужно; возможные значения:
  * *send* - отправка данных;
  * *validate_files* - валидация файлов;
  * *removeFile* - удаление файла;
* **fetchOptions** - параметры запроса (url, method, body), можно изменить, удалить (с осторожностью), добавить свои данные.
* **headers** - заголовки запроса, можно изменить, удалить (с осторожностью), добавить свои данные.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:before', (e) => {
  const {action, target, fetchOptions, headers, Sending} = e.detail;

  // не будем отправлять код подтверждения пока длина номера телефона меньше 11 символов
  if (target.name === 'phone' && target.value.length < 11){
    e.preventDefault();
  }
})
```

:::

#### si:send:after - после получения ответа

Событие возникает сразу после получения ответа от сервера и его преобразование в JSON. Может быть отменено, что прервёт дальнейшее выполнение скрипта, т.е. выполнение методов
**success()** и **error()**.

::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **action** - название действия, служит для удобства дифференцирования логики, т.е. если вам нужно чтобы какая-то функция срабатывала только при отправке формы,
  но не при загрузке файла; менять этот параметр не нужно; возможные значения:
  * *send* - отправка данных;
  * *validate_files* - валидация файлов;
  * *removeFile* - удаление файла;
* **result** - ответ сервера в формате JSON.
* **headers** - заголовки запроса, можно изменить, удалить (с осторожностью), добавить свои данные.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:after', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    // покажем информационное сообщение
    SendIt.Notify.info('Получен ответ сервера. Ура!');
})
```

:::

#### si:send:success - обработка успешного ответа

Событие возникает при получении успешного ответа от сервера и ДО срабатывания обработчика **success()**. Может быть отменено, что прервёт дальнейшее выполнение скрипта.
::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **action** - название действия, служит для удобства дифференцирования логики, т.е. если вам нужно чтобы какая-то функция срабатывала только при отправке формы,
  но не при загрузке файла; менять этот параметр не нужно; возможные значения:
  * *send* - отправка данных;
  * *validate_files* - валидация файлов;
  * *removeFile* - удаление файла;
* **result** - ответ сервера в формате JSON.
* **headers** - заголовки запроса, можно изменить, удалить (с осторожностью), добавить свои данные.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:success', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    // установим свой обработчик успешной отправки
    Sending.success = (result, target) => {
        SendIt.Notify.success('Данные отправлены. Спасибо!');
    }
})
```

:::

#### si:send:error - обработка ошибок

Событие возникает при получении ответа от сервера с ошибками и ДО срабатывания обработчика **error()**. Может быть отменено, что прервёт дальнейшее выполнение скрипта.
::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **action** - название действия, служит для удобства дифференцирования логики, т.е. если вам нужно чтобы какая-то функция срабатывала только при отправке формы,
  но не при загрузке файла; менять этот параметр не нужно; возможные значения:
  * *send* - отправка данных;
  * *validate_files* - валидация файлов;
  * *removeFile* - удаление файла;
* **result** - ответ сервера в формате JSON.
* **headers** - заголовки запроса, можно изменить, удалить (с осторожностью), добавить свои данные.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:error', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    // установим свой обработчик ошибок
    Sending.error = (result, target) => {
        SendIt.Notify.error('Данные не отправлены. Исправьте ошибки!');
    }
})
```

:::

#### si:send:finish - завершение отправки

Событие возникает при получении ответа от сервера и ПОСЛЕ срабатывания обработчиков  **success()** и **error()**. Не может быть отменено.
::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **action** - название действия, служит для удобства дифференцирования логики, т.е. если вам нужно чтобы какая-то функция срабатывала только при отправке формы,
  но не при загрузке файла; менять этот параметр не нужно; возможные значения:
  * *send* - отправка данных;
  * *validate_files* - валидация файлов;
  * *removeFile* - удаление файла;
* **result** - ответ сервера в формате JSON.
* **headers** - заголовки запроса, можно изменить, удалить (с осторожностью), добавить свои данные.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:finish', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    // выведем все параметры пресета
    console.log(result.data);
})
```

:::

#### si:send:reset - сброс формы

Событие возникает в конце работы метода **success()**, если в пресете указан параметр **clearFieldsOnSuccess**, или при нажатии кнопки **type="reset"**. Может быть отменено,
что прервёт
дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **target** - может быть формой, полем, кнопкой или всем документом.
* **Sending** - объект класса *Sending* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:send:reset', (e) => {
    const {target, Sending} = e.detail;

    // отменим сброс формы
    e.preventDefault();
})
```

:::

### События Квиза (Quiz)

---

#### si:quiz:change - изменение шага в опроснике

Событие возникает ДО смены шага. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **isTrusted** - передаёт признак автоматического или ручного переключения.
* **btnReset** - элемент кнопки сброса формы.
* **btnSend** - элемент кнопки отправки формы.
* **btnNext** - элемент кнопки переключения *Вперёд*.
* **btnPrev** - элемент кнопки переключения *Назад*.
* **root** - элемент формы.
* **nextIndex** - идентификатор шага, который должен стать видимым (значение атрибута **data-qf-item**).
* **items** - массив элементов-шагов.
* **current** - текущий видимый элемент-шаг.
* **currentQuestion** - элемент отображения текущий порядковый номер шага.
* **totalQuestions** - элемент отображения общее количество шагов.
* **prevIndex** - идентификатор текущего видимого элемента-шага, который станет предыдущим после переключения (значение атрибута **data-qf-item**).
* **nextItem** - элемент-шаг, который станет видимым после переключения (значение атрибута **data-qf-item**).
* **dir** - направление переключения (*prev* - назад, *next* - вперёд).
* **Quiz** - объект класса *Quiz* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:quiz:change', (e) => {
    const {root, nextIndex, items, current, currentQuestion, totalQuestions, prevIndex, nextItem, dir, Quiz} = e.detail;

    // проверим соответствует ли телефон паттерну
    const phoneField = current.querySelector('[name="phone"]');
    if(phoneField && phoneField.value){
        const pattern = new RegExp(/^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/g);
        if(!pattern.test(phoneField.value)){
            SendIt.Notify.error('Введите телефон в формате +7(999)999-99-99');
            e.preventDefault();
        }
    }
})
```

:::

#### si:quiz:progress - изменение процента в опроснике

Событие возникает ПОСЛЕ установки процентов прогресса. Не может быть отменено.

::: details Передаваемые параметры

* **items** - массив элементов-шагов.
* **progressValue** -  DOM-элемент прогресс-бара.
* **progress** - DOM-элемент обёртка прогресс-бара.
* **itemsComplete** - массив элементов-шагов завершённых.
* **total** - общее число шагов.
* **root** - элемент формы.
* **complete** - количество завершённых вопросов.
* **percent** - процент завершённых вопросов.
* **Quiz** - объект класса *Quiz* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:quiz:progress', (e) => {
    const {root, progressValue, items, progress, itemsComplete, total, percent, Quiz} = e.detail;
})
```

:::

#### si:quiz:reset - сброс опросника на начало

Событие возникает при сбросе опросника. Событие не может преврать сброс.

::: details Передаваемые параметры

* **items** - массив элементов-шагов.
* **btns** - список элементов кнопок.
* **progress** - элемент индикатора прогресса.
* **currentQuestion** - элемент текущего вопрса.
* **totalQuestions** - элемент с общим количеством вопросов.
* **root** - корневой элемент.
* **finishItem** - элемент последнего этапа.
* **pages** - элемент-обертка для отображения количества шагов.
* **Quiz** - объект класса *Quiz* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('si:quiz:reset', (e) => {
    const {items, btns, progress, currentQuestion, totalQuestions, root, finishItem, pages, Quiz} = e.detail;

    // сбрасываем дополнительную индикацию прогресса
    const steps = root.querySelectorAll('[data-qf-step]');
    steps.length && steps.forEach(el => {
        el.classList.remove('complete');
        el.classList[el.dataset.qfStep !== '1' ? 'remove' : 'add']('active');
    })
})
```

:::

### События Загрузки файлов (Fileuploader)

---

#### fu:uploading:start - перед началом загрузки файлов

Событие возникает перед началом загрузки файлов.

::: details Передаваемые параметры

* **form** - элемент формы.
* **field** - элемент поля загрузки.
* **root** - элемент-обёртка для поля загрузки файлов.
* **files** - список файлов для загрузки файлов (объект типа FileList).
* **FileUploader** - объект класса *FileUploader* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('fu:uploading:start', (e) => {
    const {root, form, field, files, FileUploader} = e.detail;

    // можно провести дополнительную проверку файлом перед загрузкой и превать загрузку в случае чего.
})
```

:::

#### fu:uploading:end - после окончания загрузки файлов

Событие возникает после окончания загрузки всех файлов.

::: details Передаваемые параметры

* **form** - элемент формы.
* **field** - элемент поля загрузки.
* **root** - элемент-обёртка для поля загрузки файлов.
* **files** - список файлов для загрузки файлов (объект типа FileList).
* **FileUploader** - объект класса *FileUploader* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('fu:uploading:end', (e) => {
    const {root, form, field, files, FileUploader} = e.detail;

    // можно произвести какие-то манипуляции с документом.
})
```

:::

#### fu:uploading:remove - после удаления превью файла

Событие возникает после удаления превью файла.

::: details Передаваемые параметры

* **path** - путь к удаленному файлу.
* **root** - элемент-обёртка для поля загрузки файлов.
* **preview** - элемент превью.
* **FileUploader** - объект класса *FileUploader* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('fu:preview:remove', (e) => {
    const {root, path, preview, FileUploader} = e.detail;

    // можно произвести какие-то манипуляции с документом.
})
```

:::

### События Сохранения данных (Saveformdata)

---

#### sf:save - перед сохранением данных

Событие возникает ДО сохранения значения поля в localStorage. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **root** - элемент формы.
* **field** - поле, значение которого сохраняем.
* **savedData** - массив сохраняемых данных.
* **SaveFormData** - объект класса *SaveFormData* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('sf:save', (e) => {
    const {root, field, savedData, SaveFormData} = e.detail;

    // отформатируем телефон
    if(field.name === 'phone' && field.value){
        const formatted = field.value.replace(/^\d(\d{3})(\d{3})(\d{2})(\d{2})$/, '8 ($1)$2-$3-$4');
        savedData.phone = field.value = formatted;
    }
})
```

:::

#### sf:set:before - перед установкой сохранённых данных

Событие возникает ПЕРЕД установкой сохранённых данных в соответствующие поля. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **root** - элемент формы.
* **formFields** - коллекция элементов-полей.
* **savedData** - массив сохраняемых данных.
* **SaveFormData** - объект класса *SaveFormData* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('sf:set:before', (e) => {
    const {root, formFields, savedData, SaveFormData} = e.detail;

    // запретим автозаполнение поля с выбором возраста
    for(let k in savedData){
        if(k === 'age'){
            savedData[k] = ''
        }
    }
})
```

:::

#### sf:change - после установки сохранённых данных в конкретное поле

Событие возникает ПОСЛЕ установки сохранённых данных в соответствующее поле. Не может быть отменено.

::: details Передаваемые параметры

* **SaveFormData** - объект класса *SaveFormData* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('sf:change', (e) => {
    const SaveFormData = e.detail.SaveFormData;
    const field = e.target;

    // можно изменить установленное значение, оно не будет сохранено в localStorage
})
```

:::

#### sf:set:after - после установки всех сохранённых данных

Событие возникает ПОСЛЕ установки сохранённых данных в соответствующие поля. Не может быть отменено.

::: details Передаваемые параметры

* **root** - элемент формы.
* **formFields** - коллекция элементов-полей.
* **savedData** - массив сохраняемых данных.
* **SaveFormData** - объект класса *SaveFormData* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('sf:set:after', (e) => {
    const {root, formFields, savedData, SaveFormData} = e.detail;

    // можно производить манипуляции с DOM
})
```

:::

#### sf:remove - перед очисткой сохранённых данных

Событие возникает ПЕРЕД очисткой данных для конкретной формы. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **root** - элемент-обёртка для поля загрузки файлов.
* **formName** - ключ формы (значение атрибута **data-si-form**).
* **SaveFormData** - объект класса *SaveFormData* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('sf:remove', (e) => {
    const {root, formName, SaveFormData} = e.detail;

    // отменим удаление сохраненных данных
    e.preventDefault();
})
```

:::

### События Пагинации (Pagination)

---

#### pn:handle:before - перед обработкой ответа сервера

Событие возникает ПЕРЕД выводом результатов пагинации. Может быть отменено, что прервёт дальнейшее выполнение скрипта.

::: details Передаваемые параметры

* **result** - объект ответа сервера.
* **PaginationHandler** - объект класса *PaginationHandler* для быстрого доступа к методам и свойства этого класса.
  :::

::: details Пример использования

```js:line-numbers
document.addEventListener('pn:handle:before', (e) => {
    const {result, PaginationHandler} = e.detail;

    // отменим удаление сохраненных данных
    e.preventDefault();
})
```

:::

#### pn:handle:after - после обработки ответа сервера

Событие возникает ПОСЛЕ вывода результатов пагинации. Не может быть отменено.

::: details Передаваемые параметры

* **result** - объект ответа сервера.
* **PaginationHandler** - объект класса *PaginationHandler* для быстрого доступа к методам и свойства этого класса.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('pn:handle:after', (e) => {
    const {result, PaginationHandler} = e.detail;
})
```

:::
