# Простые формы

## Пресеты

Путь к файлу с пресетами указан в системной настройке **si_path_to_presets**. Путь следует указывать относительно **base_path** (**MODX_BASE_PATH**).
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
Кроме того, вы можете добавлять произвольные параметры. Параметры можно наследовать.

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

В примере видно, пресет **onestepform** имеет параметр **extends**, это означает, что к пресету будут добавлены параметры из пресета **default**.
Если в обоих наборах есть одинаковые ключи, приоритет будет у значений из **onestepform**, т.е. в случае успешной отправки пользователь увидит сообщение
**_Форма отправлена!_**.  
::: warning
Наследование НЕрекурсивное, другими словами, если пресет **default** наследует пресет **third**,
параметры пресета **third** не будут добавлены кк набору **onestepform**
:::

Если вы используете кастомные валидаторы, то нет необходимости вручную добавлять параметр **customValidators**,
т.к. он будет добавлен автоматически из данных в параметре **validate**.
::: warning
Валидатор **checkbox** не имеет реализации в виде сниппета и создавать его не нужно. Задача этого валидатора указать на то, что поле с именем *politics*
это **input[type="checkbox"]**.  
Таким образом комбинация **:checkbox:required** позволяет сделать поле **politics** обязательным.
:::
Никакие дополнительые манипуляции для валидации чекбоксов выполнять не требуется, т.е. добавлять скрытые поля и заполнять их средствами JS не нужно.

## Пример формы

```html:line-numbers
<form data-si-form="oneStepForm" data-si-preset="onestepform"> // [!code warning]
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
Давайте рассмотрим используемые атрибуты:
* **data-si-preset** - содержит название набора параметров(необязательный).
* **data-si-form** - содержит название формы; сам атрибут нужен, чтобы комопнент мог работать с этой формой;
значение атрибута позволяет [сохранять введённые данные](https://docs.modx.pro/components/sendit/saveformdata)
и [редактировать параметры из админки](https://docs.modx.pro/components/sendit/sending#redaktirovanie-adminke).
* **data-si-error** - содержит имя валидируемого поля, указывает на элемент, в котором будет показан текст ошибки(необязательный); если не указан
ошибка будет выведена при помощи [всплывающих уведомлений](https://docs.modx.pro/components/sendit/notify).

## Отправка на событие "change" 
## Отправка на событие "input" 
## Редактирование админке
