# Quiz

Сниппет предназначен для вывода квиза.
Принимает все параметры сниппета FormIt

## Параметры

### Параметры стилей

  - **frontend_css** - Ссылка подключения css файла. По умолчанию: `[[+assetsUrl]]css/web/default.min.css`
 - **frontend_js** - Ссылка подключения js файла.  По умолчанию: `[[+assetsUrl]]js/web/default.min.js`
  - **ajaxform_frontend_css** - Ссылка подключения css файла сниппета AjaxForm. По умолчанию: `[[+assetsUrl]]css/web/default.min.css`
 - **frontend_js** - Ссылка подключения js файла сниппета AjaxForm.  По умолчанию: `[[+assetsUrl]]js/web/default.min.js`

### Параметры шаблонов

 - **tplCover** - чанк оформления обложки. По умолчанию: `tpl.Quiz.cover`
 - **tplCounter** - чанк оформления счетчика. По умолчанию: `tpl.Quiz.cover`
 - **tplProgess** - чанк оформления прогрес-бара. По умолчанию: `tpl.Quiz.progress` 
 - **tplStep** - чанк оформления раздела. По умолчанию: `tpl.Quiz.step` 
 - **tplStepNav** - чанк оформления кнопок навигации. По умолчанию: `tpl.Quiz.stepNav`  
 - **tplSubmit** - чанк оформления кнопки отправки формы. По умолчанию: `tpl.Quiz.submit` 
 - **tplResult** - чанк оформления результата. По умолчанию: `tpl.Quiz.result`
 - **tplFieldWrapper** - чанк оформления обертки поля. По умолчанию: `tpl.Quiz.fieldWrapper`
 - **tplField** - чанк оформления поля. По умолчанию: `tpl.Quiz.field`
 - **tplFile** - чанк оформления поля(type=file). По умолчанию: `tpl.Quiz.field_file`
 - **tplRadio** - чанк оформления поля(type=radio). По умолчанию: `tpl.Quiz.field_radio`
 - **tplCheckbox** - чанк оформления поля(type=checkbox). По умолчанию: `tpl.Quiz.field_radio`
 - **tplHidden** - чанк оформления поля(type=hidden). По умолчанию: `tpl.Quiz.field_hidden`
 - **tplTextarea** - чанк оформления поля(textarea). По умолчанию: `tpl.Quiz.field_textarea`
 - **tplSelect** - чанк оформления поля(select). По умолчанию: `tpl.Quiz.field_select`


#### Параметры CSS классов

- **classSection** - класс для обертки квиза. По умолчанию: `#quiz-{id}`. {id} - id квиза 
- **classHide** - класс для скрытого елемента. По умолчанию: `d-none` 
- **classActive** - класс для активного елемента. По умолчанию: `active` 
- **classError** - класс невалидного поля. По умолчанию: `is-invalid` 
- **classCover** - класс обложки. По умолчанию: `quiz-cover`
- **classSteps** - класс разделов. По умолчанию: `steps` 
- **classCounter** - класс счетчика. По умолчанию: `quiz-counter` 
- **classCounterCurrent** - класс для вывода текущей позиции квиза. По умолчанию: `quiz-counter-current` 
- **classCounterAll** - класс для вывода кол-во разделов квиза. По умолчанию: `quiz-counter-all` 
- **classProgress** - класс для обертки прогресс-бара. По умолчанию: `quiz-progress` 
- **classProgressBar** - класс для прогресс-бара. По умолчанию: `progress-bar` 
- **classProgressProcent** - класс для вывода % заполнения квиза в прогресс-баре. По умолчанию: `progress-procent` 
- **classButtons** - класс для навигации квиза. По умолчанию: `quiz-nav` 
- **classBtnStart** - класс кнопки для старта квиза. По умолчанию: `btn-start` 
- **classBtnPrev** - класс кнопки для перехода на предыдущий раздел. По умолчанию: `btn-prev` 
- **classBtnPrev** - класс кнопки для перехода на следующий раздел. По умолчанию: `btn-next` 
- **classBtnSubmit** - класс кнопки для отправки формы. По умолчанию: `btn-submit` 
- **classSubmit** - классы кнопки для отправки формы(дополнительные). По умолчанию: `btn-lg btn-primary`
- **classBtnReset** - класс кнопки для сброса квиза. По умолчанию: `quiz-reset`
- **classResult** - класс обертки результата. По умолчанию: `quiz-result`

### Примеры:

	{'!Quiz' | [
		'id' => 1,              // id квиза
		'form' => 'myForm',     // устанавливаем свою форму
		'emailTo' => 'my@ya.ru' // куда отправляем результат(перезаписываем параметр)
	]}