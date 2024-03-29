# Отправка форм через FormIt

Заполните две системные настройки

- **amocrm_form_pipeline_id** - Номер воронки в которую планируете отправлять заявки из форм. Можно взять из адресной строки URL
- **amocrm_form_status_new** - ID статуса указанной выше воронки.  Можно посмотреть в инспекторе кода, выделив колонку статуса.
- Для отправки данных из формы необходимо добавить хук _amoCRMAddContact_ в вызов _AjaxForm_ или _FormIt_
    Чтобы указать соответствие полей формы полям amoCRM добавляется параметр _amoCRMmodxAmoFieldsEq_.
    Варианты формата:
  - Стандартный `formField1==amoField1||formField2==amoField2`
  - Упрощенный, когда наименование поля в форме и в **amoCRM** совпадает `field1||field2||field3`

      Упрощенный и стандартный форматы можно комбинировать, например: `phone||email||mobilephoneForm==mobilephoneAMO||addressForm==addressAMO`
- JSON:

    ```json
    {
      "formfield1": "amoField1",
      "formfield2": "amoField2",
      "formfield3": "amoField3"
    }
    ```

Пример вызова FormIt:

```modx
[[!FormIt?
  &hooks=`amoCRMAddContact`
  &amoCRMmodxAmoFieldsEq=`phone||email||mobilephoneForm||mobilephoneAMO||addressForm==addressAMO`
  &validationErrorMessage=`Пожалуйста, заполните необходимые поля`
  &validate=`phone:required,name:required,email:email:required`
  &successMessage=`Спасибо большое, данные отправлены в amoCRM`
  &form=`tpl.form`
]]
```
