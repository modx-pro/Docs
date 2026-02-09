# Notifications

**SendIt** uses [IziToast](https://izitoast.marcelodolza.com/) for notifications. Use it in your code or replace it; see [Development](/en/components/sendit/development).

## JavaScript config

::: details Default config

```js:line-numbers
export default function returnConfigs() {
  return {
    Notify: {
      pathToScripts: './modules/notify.js',
      jsPath: 'assets/components/sendit/web/js/lib/izitoast/iziToast.min.js',
      cssPath: 'assets/components/sendit/web/css/lib/izitoast/iziToast.min.css',
      handlerClassName: 'iziToast',
      toastSelector: '.iziToast',
      typeSelectors: {
        success: '.iziToast-color-green',
        info: '.iziToast-color-blue',
        error: '.iziToast-color-red',
        warning: '.iziToast-color-yellow',
      },
      titleSelector: '.iziToast-title',
      handlerOptions: {
        timeout: 2500,
        position: "topCenter"
      }
    },
  }
}
```

:::

| Key | Description | Value |
|:---:|:---:|:---:|
| `pathToScripts` | Path to module (relative to sendit.js) | ./modules/notify.js |
| `jsPath` | IziToast script | assets/components/sendit/web/js/lib/izitoast/iziToast.min.js |
| `cssPath` | IziToast styles | assets/components/sendit/web/css/lib/izitoast/iziToast.min.css |
| `handlerClassName` | Toast class name | iziToast |
| `toastSelector` | Toast selector | .iziToast |
| `typeSelectors` | Type-specific selectors | object |
| `titleSelector` | Title selector | .iziToast-title |
| `handlerOptions` | Display options | object |
