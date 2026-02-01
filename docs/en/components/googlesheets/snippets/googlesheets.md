# Snippet GoogleSheets

Used to output data from a Google Sheet.

## Parameters snippet

| Name    | Description                                                                                | Default                         |
| ------ | --------------------------------------------------------------------------------------- | ------------------------------------ |
| table  | Google Sheet URL to read from                                                       |                       |
| range  | Sheet name; optionally add cell range (!A1:J10)                                      |                       |
| tpl    | Chunk for output. If omitted, raw array is output.                                    |                       |
| fields | Comma-separated variable names.                                                       | First row cell values  |
| ignore | Comma-separated row numbers to skip (1-based)                                         |                       |

## Examples

1. Reads cells A1:J20 from sheet Manhattan in the sheet specified by table. Outputs an array.

    ```modx
    [[!GoogleSheets?
      &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
      &range = `Manhattan!A1:J10`
    ]]
    ```

2. Reads all data (except row 1) from sheet Manhattan. Variables **name** and **email** must be in the first row.

    ```modx
    [[!GoogleSheets?
      &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
      &range = `Manhattan`
      &ignore = `1`
      &tpl' = `@INLINE <li>{$name} - {$email}</li>`
    ]]
    ```

3. Map your own variables to cells. First cell maps to **name**, second to **phone**.

    ```modx
    [[!GoogleSheets?
      &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
      &range = `Manhattan`
      &ignore = `1`
      &fields = `name,phone`
      &tpl' = `@INLINE <li>{$name} - {$email}</li>`
    ]]
    ```

## table modifier

The component provides a Fenom modifier `table` to render an array as an HTML table.

**Example:** Data is rendered as a table with classes `table table-hover`.

```fenom
{'!GoogleSheets' | snippet: [
  'table' => 'https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0',
  'range' = 'Manhattan!A1:J10',
] | table: 'table table-hover'}
```
