# Snippet GoogleSheetsSaveForm

Saves form data to a Google Sheet.

## Settings

* Add the **GoogleSheetsSaveForm** hook

Additional parameters:

| Name          | Description                                   | Default                                |
|---------------|-----------------------------------------------|----------------------------------------|
| **formFields**| Comma-separated list of form fields to save   | System setting **googlesheets_form_fields** |
| **gsUri**     | Google Sheet URL                              | System setting **googlesheets_form_table**  |
| **gsRange**   | Sheet name                                    | System setting **googlesheets_form_range**  |
| **gsFields**  | Comma-separated list of sheet column names   | System setting **googlesheets_form_fields**  |

## Examples

1. Saves **name, email, message** to the sheet and range from system settings **googlesheets_form_table** and **googlesheets_form_range**

    ```modx
    [[!AjaxForm?
      &hooks=`spam,email,GoogleSheetsSaveForm`
      &formFields=`name,email,message`
    ]]
    ```

2. Saves **name, email, message** to the sheet from system setting **googlesheets_form_table** and the sheet name from **gsRange**.

    ```modx
    [[!AjaxForm?
      &hooks=`spam,email,GoogleSheetsSaveForm`
      &formFields=`name,email,message`
      &gsRange=`DataForm`
    ]]
    ```

3. Saves **name, email, message** to the sheet from **gsUri** and sheet name from **gsRange**.

    ```modx
    [[!AjaxForm?
      &hooks=`spam,email,GoogleSheetsSaveForm`
      &formFields=`name,email,message`
      &gsUri=`https://docs.google.com/spreadsheets/d/16eyRFL94Dtqm30lBXVIpKGbw/edit#gid=0`
      &gsRange=`DataForm`
    ]]
