# Quiz snippet

Outputs quiz. Accepts all FormIt snippet parameters.

## Parameters

### Style parameters

- **frontend_css** - CSS file URL. Default: `[[+assetsUrl]]css/web/default.min.css`
- **frontend_js** - JS file URL. Default: `[[+assetsUrl]]js/web/default.min.js`
- **ajaxform_frontend_css** - AjaxForm snippet CSS URL. Default: `[[+assetsUrl]]css/web/default.min.css`
- **ajaxform_frontend_js** - AjaxForm snippet JS URL. Default: `[[+assetsUrl]]js/web/default.min.js`

### Template parameters

- **tplCover** - Cover chunk. Default: `tpl.Quiz.cover`
- **tplCounter** - Counter chunk. Default: `tpl.Quiz.cover`
- **tplProgess** - Progress bar chunk. Default: `tpl.Quiz.progress`
- **tplStep** - Section chunk. Default: `tpl.Quiz.step`
- **tplStepNav** - Navigation buttons chunk. Default: `tpl.Quiz.stepNav`
- **tplSubmit** - Form submit button chunk. Default: `tpl.Quiz.submit`
- **tplResult** - Result chunk. Default: `tpl.Quiz.result`
- **tplFieldWrapper** - Field wrapper chunk. Default: `tpl.Quiz.fieldWrapper`
- **tplField** - Field chunk. Default: `tpl.Quiz.field`
- **tplFile** - File field chunk (type=file). Default: `tpl.Quiz.field_file`
- **tplRadio** - Radio field chunk (type=radio). Default: `tpl.Quiz.field_radio`
- **tplCheckbox** - Checkbox field chunk (type=checkbox). Default: `tpl.Quiz.field_radio`
- **tplHidden** - Hidden field chunk (type=hidden). Default: `tpl.Quiz.field_hidden`
- **tplTextarea** - Textarea chunk. Default: `tpl.Quiz.field_textarea`
- **tplSelect** - Select chunk. Default: `tpl.Quiz.field_select`

#### CSS class parameters

- **classSection** - Quiz wrapper class. Default: `#quiz-{id}`. {id} - quiz id
- **classHide** - Hidden element class. Default: `d-none`
- **classActive** - Active element class. Default: `active`
- **classError** - Invalid field class. Default: `is-invalid`
- **classCover** - Cover class. Default: `quiz-cover`
- **classSteps** - Sections class. Default: `steps`
- **classCounter** - Counter class. Default: `quiz-counter`
- **classCounterCurrent** - Current position output. Default: `quiz-counter-current`
- **classCounterAll** - Total sections count. Default: `quiz-counter-all`
- **classProgress** - Progress bar wrapper. Default: `quiz-progress`
- **classProgressBar** - Progress bar. Default: `progress-bar`
- **classProgressProcent** - Progress % in bar. Default: `progress-procent`
- **classButtons** - Quiz navigation. Default: `quiz-nav`
- **classBtnStart** - Start button. Default: `btn-start`
- **classBtnPrev** - Previous section button. Default: `btn-prev`
- **classBtnNext** - Next section button. Default: `btn-next`
- **classBtnSubmit** - Form submit button. Default: `btn-submit`
- **classSubmit** - Additional submit button classes. Default: `btn-lg btn-primary`
- **classBtnReset** - Quiz reset button. Default: `quiz-reset`
- **classResult** - Result wrapper. Default: `quiz-result`

### Examples

```fenom
{'!Quiz' | snippet: [
  'id' => 1,               // quiz id
  'form' => 'myForm',      // custom form
  'emailTo' => 'my@ya.ru', // where to send result (overrides param)
]}
```
