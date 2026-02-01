# Development

## Running export/import from the front-end

Snippet:

```modx
[[!GoogleSheetsFront?
  &mode=`export`
  &id=`5`
]]
```

Response:

```php
Array (
  [status] => 1
  [message] => Success!
  [total] => 26
  [error] => 0
  [time] => 0,923s
)
```

### Snippet parameters

| Field    | Description        | Values                                           |
|----------|--------------------|--------------------------------------------------|
| **id**   | Export/import ID   |                                                  |
| **mode** | Mode               | `export \|\| import \|\| migxExport \|\| migxImport` |

### Javascript (jQuery)

```js
$.ajax({
  url: '/assets/components/googlesheets/action.php',
  type: 'POST',
  data: { id: 5, mode: 'export', auth_code: 'value of googlesheets_auth_code system setting' },
  success: function (data, textStatus, jqXHR) { console.log(JSON.parse(data)) },
  dataType: 'text',
});
```

Response:

```js
{
  message: "Success!"
  status: true
  total: 26
  error: 0
  time: "0,998s"
}
```

## Reading data from a sheet

### GoogleSheets snippet

```modx
[[!GoogleSheets?
  &table=`https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
  &range=`Manhattan`
]]
```

#### Parameters snippet GoogleSheets

| Name    | Description                                                                                | Default                         |
|--------|-----------------------------------------------------------------------------------------|--------------------------------------|
| table  | Google Sheet URL                                                            |                       |
| range  | Sheet name; optionally add cell range (!A1:J10)                              |                       |
| tpl    | Chunk for output. If omitted, raw array is output.                            |                       |
| fields | Comma-separated variable names.                                                | First row cell values  |
| ignore | Comma-separated row numbers to skip (1-based)                                 |                       |

See the **Snippets** section for examples.

## Javascript (jQuery)

```js
$.ajax({
  url: '/assets/components/googlesheets/action.php',
  type: 'POST',
  data: {
    table: 'https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0',
    range: 'Manhattan',
    auth_code: 'value of googlesheets_auth_code system setting',
  },
  success: function (data, textStatus, jqXHR) { console.log(JSON.parse(data)) },
  dataType: 'text',
});
```
