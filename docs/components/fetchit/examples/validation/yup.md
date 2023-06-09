# Валидация с помощью yup

Данный раздел посвящен примеру интеграции библиотеки [yup](https://github.com/jquense/yup) для дополнительной валидации данных формы перед отправкой на сервер. Представим, что нам нужно обработать простую форму с двумя полями, имя и возраст.

<!--@include: ../../parts/validation.warning.md-->

## Разметка формы

Здесь ничего необычного, кроме атрибута `novalidate` добавленного элементу формы. Он нужен для того, чтобы отключить встроенную в браузер валидацию.

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> Возраст
    <input type="text" name="age" value="[[+fi.age]]" />
    <span data-error="age">[[+fi.error.age]]</span>
  </label>
  <button>Можно?</button>
</form>
```

## Подключение библиотеки

Для простоты примера подключим её через CDN и воспользуемся импортом.

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';
</script>
```

## Обработчик

Приступим к самому главному, добавление обработчика на событие [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore) который и будет валидировать данные формы.

1. Добавим обработчик на событие [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => { // [!code focus]

      }); // [!code focus]
    </script>
    ```

2. Получим ссылки на экземпляры классов [`FormData`](https://developer.mozilla.org/ru/docs/Web/API/FormData) и [`FetchIt`](/components/fetchit/frontend/instance).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail; // [!code focus]
      });
    </script>
    ```

3. Преобразуем **formData** в простой объект.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries()); // [!code focus]
      });
    </script>
    ```

4. Напишем схему по которой будет валидироваться наша форма и сразу же укажем сообщения об ошибках.

    ::: details Локализация
    Библиотека **yup** предоставляет несколько способов локализации текстов ошибок. Для примера мы выбрали самый простой.

    Узнать о всех возможностях можно в [документации](https://github.com/jquense/yup#error-message-customization).
    :::

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({ // [!code focus]
          name: yup // [!code focus]
            .string() // [!code focus]
            .required('Введите своё имя'), // [!code focus]
          age: yup // [!code focus]
            .number() // [!code focus]
            .required('Введите свой возраст') // [!code focus]
            .min(18, 'Вам должно быть 18 лет') // [!code focus]
            .integer() // [!code focus]
            .typeError('Поле должно быть числом'), // [!code focus]
        }); // [!code focus]
      });
    </script>
    ```

5. Вызовем синхронной метод валидации `validateSync()` в блоке `try..catch` для того чтобы мы могли отлавливать неудачные попытки.

    ::: info Информация
    Параметр `abortEarly` отвечает за прерывание валидации при первой неудаче. А нам нужно валидировать все поля и поэтому укажем `false`.
    :::

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({
          name: yup
            .string()
            .required('Введите своё имя'),
          age: yup
            .number()
            .required('Введите свой возраст')
            .min(18, 'Вам должно быть 18 лет')
            .integer()
            .typeError('Поле должно быть числом'),
        });

        try { // [!code focus]
          formSchema.validateSync(fields, { abortEarly: false }); // [!code focus]
        } catch (err) { // [!code focus]
          // [!code focus]
        } // [!code focus]
      });
    </script>
    ```

6. Теперь нас интересует блок `catch`, там мы и будем отлавливать все ошибки валидации и с помощью метода [`setError()`](/components/fetchit/frontend/instance#seterror) экземпляра класса [`FetchIt`](/components/fetchit/frontend/instance) устанавливать невалидное состояние полям. Также вызовем метод `preventDefault()` события для того, чтобы прервать отправку формы.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({
          name: yup
            .string()
            .required('Введите своё имя'),
          age: yup
            .number()
            .required('Введите свой возраст')
            .min(18, 'Вам должно быть 18 лет')
            .integer()
            .typeError('Поле должно быть числом'),
        });

        try {
          formSchema.validateSync(fields, { abortEarly: false });
        } catch (err) {
          e.preventDefault(); // [!code focus]

          for (const { path, message } of err.inner) { // [!code focus]
            fetchit.setError(path, message); // [!code focus]
          } // [!code focus]
        }
      });
    </script>
    ```

7. Опционально можно показать всплывающее сообщение об ошибке. Примеры подключения популярных библиотек вы можете найти [здесь](/components/fetchit/examples/notifications/).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({
          name: yup
            .string()
            .required('Введите своё имя'),
          age: yup
            .number()
            .required('Введите свой возраст')
            .min(18, 'Вам должно быть 18 лет')
            .integer()
            .typeError('Поле должно быть числом'),
        });

        try {
          formSchema.validateSync(fields, { abortEarly: false });
        } catch (err) {
          e.preventDefault();

          for (const { path, message } of err.inner) {
            fetchit.setError(path, message);
          }

          FetchIt.Message.error('Исправьте ошибки в форме'); // [!code focus]
        }
      });
    </script>
    ```

Вот и всё! После этих шагов мы получим валидацию с использованием библиотеки **yup**, но помните, на стороне клиента она небезопасна. И поэтому при вызове сниппета нужно воспользоваться средствами валидации **FormIt** или если вы используете собственный сниппет, то производить её в нём.

Пример вызова сниппета с валидацией **FormIt**:

:::code-group

```modx
[[!FetchIt?
  &form=`form.tpl`
  &hooks=`email,FormItSaveForm`
  &validate=`name:required,age:required:isNumber:minValue=^18^`

  // Необязательные параметры
  &snippet=`FormIt`
  &formName=`Название формы`
  &emailSubject=`Тема письма`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'form.tpl',
  'hooks' => 'email,FormItSaveForm',
  'validate' => 'name:required,age:required:isNumber:minValue=^18^',

  // Необязательные параметры
  'snippet' => 'FormIt',
  'formName' => 'Название формы',
  'emailSubject' => 'Тема письма',
]}
```

:::

Со списком всех валидаторов **FormIt** можете ознакомиться на [сайте документации](https://docs.modx.com/3.x/en/extras/formit/formit.validators) компонента.
