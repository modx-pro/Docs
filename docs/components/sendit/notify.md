# Уведомления

Из коробки **SendIt** показывает уведомления с помощью библиотеки [IziToast](https://izitoast.marcelodolza.com/).
Вы можете использовать их в своём коде или заменить, подробнее о том как это сделать читайте в разделе [Разработка](/components/sendit/development).

## Конфигурация JavaScript

::: details Конфигурация по умолчанию

```js:line-numbers{3-20}
export const ModulesConfig = {
  Notify: {
    forceLoad: true,
    className: 'Notify',
    pathToScripts: '../modules/notify.js',
    jsPath: '/assets/components/sendit/js/web/lib/izitoast/iziToast.js',
    cssPath: '/assets/components/sendit/css/web/lib/izitoast/iziToast.min.css',
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
      position: 'topCenter'
    }
  },
}
```

:::

|        Ключ        |                              Описание                              |                         Значение                          |
|:------------------:|:------------------------------------------------------------------:|:---------------------------------------------------------:|
|  `pathToScripts`   |                      **../modules/notify.js**                       | путь к модулю, указывается относительно файла *sendit.js* |
|      `jsPath`      |  **/assets/components/sendit/js/web/lib/izitoast/iziToast.js**  |          путь к скриптам библиотеки уведомлений           |
|     `cssPath`      | **/assets/components/sendit/css/web/lib/izitoast/iziToast.min.css** |           путь к стилям библиотеки уведомлений            |
| `handlerClassName` |                            **iziToast**                            |             имя класса библиотеки уведомлений             |
|  `toastSelector`   |                           **.iziToast**                            |                   селектор уведомления                    |
|  `typeSelectors`   |                            ***объект***                            |          селекторы уведомлений конкретного типа           |
|  `titleSelector`   |                        **.iziToast-title**                         |                 селектор заголовка текста                 |
|  `handlerOptions`  |                            ***объект***                            |                 опции показа уведомления                  |
