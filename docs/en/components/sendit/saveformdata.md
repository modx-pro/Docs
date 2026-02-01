# Saving form data

Values of form fields with **data-si-form** (when attribute has a value), except *file* and *password*, are saved to localStorage until successful submit or form reset.

::: warning
Values are saved on field change. If using custom input plugins, ensure they fire *change* or trigger it manually.
:::

::: info
Add **data-si-nosave** to form to disable saving.
:::

After reload, values are restored to fields; checkboxes and radios are set; single and multi-select options are selected.

::: info
Setting values triggers *change* on the field.
:::

## JavaScript config

::: details Default config

```js:line-numbers
export default function returnConfigs() {
  return {
    SaveFormData: {
      pathToScripts: './modules/saveformdata.js',
      rootSelector: '[data-si-form]',
      noSaveSelector: '[data-si-nosave]',
      rootKey: 'siForm',
      resetEvent: 'si:send:reset'
    },
  }
}
```

:::

| Key | Description | Value |
|:---:|:---:|:---:|
| `pathToScripts` | Path to module (relative to sendit.js) | ./modules/saveformdata.js |
| `rootSelector` | Form selector | [data-si-form] |
| `noSaveSelector` | Disable save selector | [data-si-nosave] |
| `rootKey` | Form name dataset key | siForm |
| `resetEvent` | Form reset event | si:send:reset |
