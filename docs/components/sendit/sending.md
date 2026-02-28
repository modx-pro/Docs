# Отправка данных

**SendIt** умеет отправлять данные на 4 события Javascript: *submit* (если не указан атрибут **data-si-event**), *change*, *input* и *click*.
Все 4 события можно использовать внутри одной формы.

**Пример формы:**

```html:line-numbers
<form data-si-form="oneStepForm" data-si-preset="onestepform" data-si-event="submit" data-si-nosave> // [!code warning]
    <label>
        <input type="text" name="name" placeholder="Полное имя">
        <p data-si-error="name"></p> // [!code warning]
    </label>
    <label>
        <input type="text" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="tel" name="phone" placeholder="+7(">
        <p data-si-error="phone"></p>
    </label>
    <label for="politics">
        <input type="checkbox" name="politics" id="politics">
        Я на всё согласен!
    </label>
    <button type="submit">Отправить</button>
</form>
```

## Описание атрибутов

| Атрибут | Описание |
|---------|----------|
| `data-si-form` | Содержит название формы; сам атрибут нужен, чтобы компонент мог работать с этой формой; значение атрибута позволяет [сохранять введённые данные](https://docs.modx.pro/components/sendit/saveformdata) и [редактировать параметры из админки](https://docs.modx.pro/components/sendit/development) |
| `data-si-preset` | Содержит название набора параметров (необязательный) |
| `data-si-event` | Содержит название события, при котором будет произведена отправка (необязательный) |
| `data-si-nosave` | Позволяет отменить сохранение введённых данных (необязательный) |
| `data-si-error` | Содержит имя валидируемого поля, указывает на элемент, в котором будет показан текст ошибки (необязательный); если не указан — ошибка будет выведена при помощи [всплывающих уведомлений](https://docs.modx.pro/components/sendit/notify) |

## Пресеты

Путь к файлу с пресетами указан в системной настройке **si_path_to_presets**. Путь следует указывать относительно **core_path** (**MODX_CORE_PATH**).
Это подключаемый PHP файл, который должен возвращать массив вот такого формата:

```php:line-numbers
return [
  'default' => [ // [!code warning]
    'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
  ]
]
```

::: info
Подсвеченная строка (№2) содержит ключ пресета, который следует указывать в атрибуте **data-si-preset**.
:::

Компонент поддерживает все параметры доступные для **FormIt**. Полный список представлен в [документации](https://docs.modx.com/current/ru/extras/formit).
Кроме того, существуют специфические параметры необходимые для работы тех или иных функций, например регистрация.
Также вы можете добавлять произвольные параметры, которые будут доступны в обработчике и в JavaScript.

```php:line-numbers
return [
  'default' => [ // [!code warning]
    'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
    'successMessage' => 'Мы всё послали!', // [!code --]
  ],
  'onestepform' => [
    'extends' => 'default', // [!code warning]
    'redirectTo' => 0,
    'redirectTimeout' => 3000,
    'clearFieldsOnSuccess' => 1,
    'fieldNames' => 'age==Возраст',
    'successMessage' => 'Форма отправлена!', // [!code ++]
  ],
]
```

В примере видно, пресет **onestepform** имеет параметр `extends`, это означает, что к пресету будут добавлены параметры из пресета **default**.
Если в обоих наборах есть одинаковые ключи, приоритет будет у значений из **onestepform**, т.е. в случае успешной отправки пользователь увидит сообщение
***Форма отправлена!***.

::: warning
Наследование рекурсивное, другими словами, если пресет **default** наследует пресет **third**,
параметры пресета **third** будут добавлены кк набору **onestepform**
:::

Если вы используете кастомные валидаторы, то нет необходимости вручную добавлять параметр `customValidators`,
т.к. он будет добавлен автоматически из данных в параметре `validate`.

::: warning
Валидатор **checkbox** не имеет реализации в виде сниппета и создавать его не нужно. Задача этого валидатора указать на то, что поле с именем *politics*
это **input[type="checkbox"]**.
Таким образом комбинация **:checkbox:required** позволяет сделать поле **politics** обязательным.
:::

Никакие дополнительные манипуляции для валидации чекбоксов выполнять не требуется, т.е. добавлять скрытые поля и заполнять их средствами JS не нужно.

## Отправка на событие "change"

Этот вариант отправки можно применять как ко всей форме, в случаях когда требуется передать все поля, или к одному конкретному полю.
Если НЕ нужно отправлять всю форму, а только несколько полей, сгруппируйте нужные поля так, как показано в примере ниже:

```html:line-numbers
<form>
  <input name="username">
  <div data-si-form data-si-preset="change_handler" data-si-event="change"> // [!code ++]
    <input name="code">
    <input name="phone">
  </div>
</form>
```

::: info
Поля *code* и *phone* будут отправлены на сервер при внесении изменений в любое из них.
:::

Если нужно отправлять какое-то конкретное поле, то следует писать так:

```html:line-numbers
<form>
  <input name="username">
  <input name="code" data-si-form data-si-preset="change_handler" data-si-event="change"> // [!code ++]
  <input name="phone">
</form>
```

И наконец, можно отправить всю форму целиком при изменении в любом из её полей:

```html:line-numbers
<form data-si-form data-si-preset="change_handler" data-si-event="change"> // [!code ++]
  <input name="username">
  <input name="code">
  <input name="phone">
</form>
```

## Отправка на событие "input"

::: info
Отправка при вводе работает аналогично отправке при изменении, только атрибут будет таким **data-si-event="input"**.
:::

Для чего нужна такая возможность? Представьте, что вам нужно, чтобы пользователь выбрал 1 вариант из 1000.
Обычный select тут будет, мягко говоря, неудобным, зато можно по мере ввода отправлять данные на сервер, осуществлять поиск по 1000 значениям, и
выводить пользователю подсказки. Отслеживание изменений в поле и отправку данных берёт на себя **SendIt**, поиск и вывод подсказок остается за вами.

## Отправка на событие "click"

Для того чтобы понять, как лучше всего использовать данную возможность, рассмотрим пример. Допустим перед вами стоит задача проверить реальность введённого пользователем
номера телефона посредством отправки ему кода. Вы создаёте форму

```html:line-numbers
<form data-si-form data-si-preset="register">
  <input name="phone" data-si-preset="send_code" data-si-event="change">
  <input name="code">
  <button type="button"
  data-si-preset="check_code"
  data-si-event="click">Подтвердить<button> // [!code ++]
  <button type="submit" disabled>Регистрация<button>
</form>

```

Работать она будет так:

1. Пользователь вводит свой телефон и данные отправляются в обработчик пресета *send_code*, который отправит код и сохранит его в сессию.
2. Получив код, пользователь вводит его в соответсвующее поле, жмёт кнопку *Подтвердить* и данные снова улетают на сервер, но уже в обработчик пресета *check_code*.
3. И наконец, если проверка пройдена, можно разблокировать кнопку *Регистрация* и зарегистрировать пользователя.

## Отправка целей в Яндекс.Метрику

Для того, чтобы **SendIt** отправлял цели в метрику, нужно установить значение *ДА* для системной настройки **si_send_goal**, указать ID счётчика в настройке
**si_counter_id** и передать в пресете параметр `goalName` с названием цели.

::: warning
Цель должна иметь тип **JavaScript-событие**
:::

::: info
Убедитесь, что на сайте установлен актуальный код метрики

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () {
      (m[i].a = m[i].a || []).push(arguments)
    };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
  })
  (window, document, "script", "https://mcc.yandex.ru/metrika/tag.js", "ym");

  ym(12345678, "init", { // [!code focus]
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
</script>
<noscript>
  <div>
    <img src="https://mc.yandex.ru/watch/57463354" style="position:absolute; left:-9999px;" alt=""/>
  </div>
</noscript>
<!-- /Yandex.Metrika counter -->
```

:::

## Защита от ботов и внешнего доступа

::: info
Из коробки компонент не поддерживает капчу, но вы можете добавить её проверку самостоятельно, иcпользуя [События](https://docs.modx.pro/components/sendit/events)
:::

С версии 3.0.0 для защиты от ботов используется модуль **UserBehaviorTracker**, который анализирует поведение пользователя (движения мыши, клики, нажатия клавиш, скроллинг) и вычисляет вероятность того, что посетитель является ботом. Параметры анализа можно настроить в JS-конфигурации модуля (см. раздел [Начало работы](/components/sendit/index)).

~~v2: перед отправкой проверялся event.isTrusted и по нажатию любой кнопки (antiSpamEvent) в куки записывалось значение свойства event.isTrusted.~~

::: tip
Если вам нужно выполнять программную (автоматическую) отправку формы, например по таймеру или в ответ на событие,
`UserBehaviorTracker` может посчитать такую отправку подозрительной, так как пользователь не совершал характерных действий (движения мыши, клики и т.д.).

Чтобы этого избежать, переопределите `isBot` в слушателе события `si:send:before`:

```js
document.addEventListener('si:send:before', (e) => {
    const preset = e.detail.headers['X-SIPRESET'];
    if (preset === 'auto_preset') {
        e.detail.fetchOptions.body.set('isBot', '0');
    }
});
```

Для программной отправки используйте метод `sendRequest`:

```js
const form = document.querySelector('[data-si-form="auto_preset"]');
SendIt.Sending.sendRequest(form, 'auto_preset');
```
:::

Чтобы предотвратить доступ из вне, каждый запрос на сервер подписывается специальным токеном, это не полноценный CSRF-токен,
так как живёт он до перезагрузки страницы и сгенерировать его достаточно просто. Однако этого должно быть достаточно для того, чтобы отвадить спамеров.

Если спам продолжает докучать, то можно использовать плагин, который [ограничит отправку по IP](https://docs.modx.pro/components/sendit/events#posle-proverki-dopustimosti).

Чтобы усложнить отправку ручного спама, предусмотрены две системные настройки

* **si_max_sending_per_session** - позволяет указать максимальное количество отправок одной формы без перезагрузки.
* **si_pause_between_sending** - позволяет указать паузу между отправками.

::: tip
С версии 2.0.0 ограничения можно задавать в вызове сниппета, используя параметры **pauseBetweenSending** для задания паузы между отправками без перезагрузки страницы
и **sendingPerSession** для задания максимального количества отправок одной формы без перезагрузки страницы.
:::

::: warning
Обе настройки действуют, только на формы в вызове, которых есть хуки **FormItAutoResponder** или **email** или параметр **antispam** равным 1.
:::

Вы можете снять ограничения для некоторых форм, написав плагин на [событие **OnCheckPossibilityWork**](https://docs.modx.pro/components/sendit/events#posle-proverki-dopustimosti)

## Обработка ответа сервера

С версии 2.0.0 компонент умеет выводить полученный HTML на страницу.

Чтобы воспользоваться данной возможностью нужно в пресете указать параметр **resultBlockSelector**. В качестве значения он принимает валидный CSS-селектор блока для помещения ответа.

Ответ может быть вставлен или добавлен к текущему содержимому блока за это отвечает параметр **resultShowMethod**, по умолчанию имеющий значение
**insert** (замена содержимого), если требуется добавление используйте значение **append**.

Самое главное сниппет возвращающий ответ должен в параметре **data** устанавливать ключ **html** со строкой в формате HTML.

## Конфигурация JavaScript

::: details Конфигурация по умолчанию

```js:line-numbers{3-16}
export const ModulesConfig = {
  Sending: {
    forceLoad: true,
    className: 'Sending',
    pathToScripts: '../modules/sending.js',
    rootSelector: '[data-si-form]',
    presetSelector: '[data-si-preset]',
    rootKey: 'siForm',
    presetKey: 'siPreset',
    eventKey: 'siEvent',
    goalKey: 'siGoal',
    actionUrl: '/assets/components/sendit/action.php',
    errorBlockSelector: '[data-si-error="${fieldName}"]',
    eventSelector: '[data-si-event="${eventName}"]',
    errorClass: 'si-error'
  },
}
```

:::

|         Ключ         |                Описание                 |                               Значение                                |
|:--------------------:|:---------------------------------------:|:---------------------------------------------------------------------:|
|   `pathToScripts`    |        **../modules/sending.js**         |       путь к модулю, указывается относительно файла *sendit.js*       |
|    `rootSelector`    |           **[data-si-form]**             |                            селектор формы                             |
|   `presetSelector`   |          **[data-si-preset]**            |                          селектор пресета                             |
|      `rootKey`       |               **siForm**                 |                ключ свойства *dataset* с именем формы                 |
|     `presetKey`      |              **siPreset**                |           ключ свойства *dataset* атрибута с именем пресета           |
|      `eventKey`      |               **siEvent**                | ключ свойства *dataset* атрибута с именем события для отправки данных |
|      `goalKey`       |               **siGoal**                 |    ключ свойства *dataset* с названиями целей разделённых запятыми    |
|     `actionUrl`      | **/assets/components/sendit/action.php** |                           путь к коннектору                           |
| `errorBlockSelector` |   **[data-si-error="${fieldName}"]**     |                     селектор блока вывода ошибок                      |
|   `eventSelector`    |   **[data-si-event="${eventName}"]**     |                       селектор события отправки                       |
|     `errorClass`     |              **si-error**                |                  класс, добавляемый полям с ошибками                  |
