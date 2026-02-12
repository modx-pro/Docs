# Sending forms via FormIt

Fill two system settings:

- **amocrm_form_pipeline_id** — Pipeline ID for form submissions. Copy from the browser URL
- **amocrm_form_status_new** — Status ID in that pipeline. Check in dev tools by selecting the status column
- Add the _amoCRMAddContact_ hook to your _AjaxForm_ or _FormIt_ call
- To map form fields to amoCRM, add _amoCRMmodxAmoFieldsEq_. Formats:
  - Standard: `formField1==amoField1||formField2==amoField2`
  - Short (when form and **amoCRM** field names match): `field1||field2||field3`

  You can mix: `phone||email||mobilephoneForm==mobilephoneAMO||addressForm==addressAMO`
- JSON:

    ```json
    {
      "formfield1": "amoField1",
      "formfield2": "amoField2",
      "formfield3": "amoField3"
    }
    ```

FormIt example:

```modx
[[!FormIt?
  &hooks=`amoCRMAddContact`
  &amoCRMmodxAmoFieldsEq=`phone||email||mobilephoneForm||mobilephoneAMO||addressForm==addressAMO`
  &validationErrorMessage=`Please fill in the required fields`
  &validate=`phone:required,name:required,email:email:required`
  &successMessage=`Thank you, data has been sent to amoCRM`
  &form=`tpl.form`
]]
```
