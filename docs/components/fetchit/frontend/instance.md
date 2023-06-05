# Экземпляр класса FetchIt

Ниже представлен список свойств и методов экземпляра класса **FetchIt**.

## clearErrors()

Данный метод очищает все ошибки формы.

- Тип: `function (): undefined`
- Пример:

```js
document.addEventListener('fetchit:after', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;
  fetchit.clearErrors();
});
```

## clearError()

Данный метод очищает ошибки связанные с конкретным полем.

- Тип: `function (name: string): object`
- Пример:

```js
document.addEventListener('fetchit:after', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;
  const { fields, errors, customErrors } = fetchit.clearError('password');
});
```

## setError()

Данный метод устанавливает состояние невалидности конкретному полю по названию. Может быть удобным в случаях интеграции валидации на фронте.

- Тип: `function (name: string, message: string): undefined`
- Пример:

```js
document.addEventListener('fetchit:before', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;

  // Валидация поля

  fetchit.setError('email', 'Поле email не прошла валидацию');
});
```

<!--@include: ../parts/validation.warning.md-->

## disableFields()

Данный метод устанавливает все элементы формы в состояние `disabled`.

- Тип: `function (): undefined`

## enableFields()

Данный метод убирает состояние `disabled` со всех элементов формы.

- Тип: `function (): undefined`

## getFields()

Данный метод возвращает массив полей по названию.

- Тип: `function (name: string): HTMLElement[]`

<!-- ## getErrors()

Данный метод возвращает массив элементов-обёртков ошибок по названию поля.

- Тип: `function (name: string): HTMLElement[]`

## getCustomErrors()

Данный метод возвращает массив элементов у которых есть `data-custom="*"` по названию поля.

- Тип: `function (name: string): HTMLElement[]` -->
