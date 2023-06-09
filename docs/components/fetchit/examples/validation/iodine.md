# Валидация с помощью Iodine

В данном разделе будет представлен пример того, как реализовать валидацию на стороне клиента с помощью библиотеки [Iodine](https://github.com/caneara/iodine). Будем обрабатывать простую форму с двумя полями, поле ввода имени и E-mail.

<!--@include: ../../parts/validation.warning.md-->

## Подключение библиотеки

Для простоты примера подключим её через CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/@caneara/iodine@8/dist/iodine.min.umd.js" defer></script>
```

## Разметка формы

Ничего необычного, кроме атрибута `novalidate` добавленного элементу формы. Он нужен для того, чтобы отключить встроенную в браузер валидацию.

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" />
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <button>Отправить</button>
</form>
```

## Обработчик

Теперь нам предстоит добавить обработчик на событие [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore) в котором и будет происходить валидация. Будем объяснять пошагово.

1. Добавление обработчика на событие [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore).

    ```js
    document.addEventListener('fetchit:before', (e) => {

    });
    ```

2. Получение ссылок на экземпляры классов [`FormData`](https://developer.mozilla.org/ru/docs/Web/API/FormData) и [`FetchIt`](/components/fetchit/frontend/instance).

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail; // [!code focus]
    });
    ```

3. Библиотека **Iodine** может валидировать группу данных, если передать ей подготовленный объект в котором ключом будет являться название поля, а значением соответственно значение. Для этого нам всего лишь понадобиться превратить экземпляр **FormData** в простой объект.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries()); // [!code focus]
    });
    ```

4. Подготовим правила валидации полей.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries());
      const rules = { // [!code focus]
        name: ['required', 'minLength:5'], // [!code focus]
        email: ['required', 'email'], // [!code focus]
      }; // [!code focus]
    });
    ```

5. Произведем валидацию, записав результат в переменную.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries());
      const rules = {
        name: ['required', 'minLength:5'],
        email: ['required', 'email'],
      };

      const validation = Iodine.assert(fields, rules); // [!code focus]
    });
    ```

6. Напишем условие при котором если валидация успешна, то завершаем работу нашего обработчика с помощью `return`. А далее вызываем метод `preventDefault()` у нашего события, чтобы прекратить отправку формы.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries());
      const rules = {
        name: ['required', 'minLength:5'],
        email: ['required', 'email'],
      };

      const validation = Iodine.assert(fields, rules);
      if (validation.valid) { // [!code focus]
        return; // [!code focus]
      } // [!code focus]

      e.preventDefault(); // [!code focus]
    });
    ```

7. Далее перебираем наши поля.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries());
      const rules = {
        name: ['required', 'minLength:5'],
        email: ['required', 'email'],
      };

      const validation = Iodine.assert(fields, rules);
      if (validation.valid) {
        return;
      }

      e.preventDefault();

      for (const [ name, field ] of Object.entries(validation.fields)) { // [!code focus]
          // [!code focus]
      } // [!code focus]
    });
    ```

8. Если поле валидно (речь идёт именно о состоянии валидации каждого поля, а не всех), то очищаем его ошибки с помощью метода [`clearError()`](/components/fetchit/frontend/instance#clearerror), иначе добавляем ошибку полю воспользуясь методом [`setError()`](/components/fetchit/frontend/instance#seterror).

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries());
      const rules = {
        name: ['required', 'minLength:5'],
        email: ['required', 'email'],
      };

      const validation = Iodine.assert(fields, rules);
      if (validation.valid) {
        return;
      }

      e.preventDefault();

      for (const [ name, field ] of Object.entries(validation.fields)) {
        if (field.valid) { // [!code focus]
          fetchit.clearError(name); // [!code focus]
          continue; // [!code focus]
        } // [!code focus]

        fetchit.setError(name, field.error); // [!code focus]
      }
    });
    ```

Готово! Вот таким образом мы можем добавить валидацию используя библиотеку **Iodine**, но помните, на стороне клиента она небезопасна. И поэтому при вызове сниппета нужно воспользоваться средствами валидации **FormIt** или если вы используете собственный сниппет, то производить её еще и там.

Пример вызова сниппета с валидацией **FormIt**:

:::code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`,
  &validate=`name:required:minLength=^5^,email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'validate' => 'name:required:minLength=^5^,email:required:email',
]}
```

:::

Со списком всех валидаторов **FormIt** можете ознакомиться на [сайте документации](https://docs.modx.com/3.x/en/extras/formit/formit.validators) компонента.
