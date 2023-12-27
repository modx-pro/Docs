# Validation with yup

This section is devoted to an example of integrating the [yup](https://github.com/jquense/yup) library for additional validation of form data before sending it to the server. Let's imagine that we need to process a simple form with two fields, name and age.

<!--@include: ../../parts/validation.warning.md-->

## Form layout

Nothing unusual, except for the `novalidate` attribute added to the form element. It is needed to disable the browser's built-in validation.

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> Age
    <input type="text" name="age" value="[[+fi.age]]" />
    <span data-error="age">[[+fi.error.age]]</span>
  </label>
  <button>Can I?</button>
</form>
```

## Adding library

To keep the example simple, let's connect it via CDN and use import.

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';
</script>
```

## Handler

Let's get to the most important thing, adding a handler to the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) event which will validate the form data.

1. Let's add a handler to the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) event.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => { // [!code focus]

      }); // [!code focus]
    </script>
    ```

2. Get references to instances of classes [`FormData`](https://developer.mozilla.org/ru/docs/Web/API/FormData) and [`FetchIt`](/en/components/fetchit/frontend/instance).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail; // [!code focus]
      });
    </script>
    ```

3. Convert **formData** into a simple object.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries()); // [!code focus]
      });
    </script>
    ```

4. Let's create a scheme by which our form will be validated and immediately specify error messages.

    ::: details Localization
    The **yup** library provides several ways to localise error texts. We have chosen the simplest one for our example.

    You can find out about all the features in [documentation](https://github.com/jquense/yup#error-message-customization).
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
            .required('Enter your name'), // [!code focus]
          age: yup // [!code focus]
            .number() // [!code focus]
            .required('Enter your age') // [!code focus]
            .min(18, 'You must be 18 years old') // [!code focus]
            .integer() // [!code focus]
            .typeError('The field must be a number'), // [!code focus]
        }); // [!code focus]
      });
    </script>
    ```

5. Let's call the synchronous validation method `validateSync()` in the `try..catch` block so that we can catch failed attempts.

    ::: info INFO
    The `abortEarly` parameter is responsible for aborting validation at the first failure. And we need to validate all fields, so we will specify `false`.
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
            .required('Enter your name'),
          age: yup
            .number()
            .required('Enter your age')
            .min(18, 'You must be 18 years old')
            .integer()
            .typeError('The field must be a number'),
        });

        try { // [!code focus]
          formSchema.validateSync(fields, { abortEarly: false }); // [!code focus]
        } catch (err) { // [!code focus]
          // [!code focus]
        } // [!code focus]
      });
    </script>
    ```

6. Now we are interested in the `catch` block, there we will catch all validation errors and use the [`setError()`](/en/components/fetchit/frontend/instance#seterror) method of the [`FetchIt`](/en/components/fetchit/frontend/instance) instance of the [`FetchIt`](/en/components/fetchit/frontend/instance) class to set the invalid state of the fields. Let's also call the `preventDefault()` event method to abort the form submission.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({
          name: yup
            .string()
            .required('Enter your name'),
          age: yup
            .number()
            .required('Enter your age')
            .min(18, 'You must be 18 years old')
            .integer()
            .typeError('The field must be a number'),
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

7. Optionally you can show a popup error message. Examples of connecting popular libraries can be found [here](/en/components/fetchit/examples/notifications/).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries());

        const formSchema = yup.object({
          name: yup
            .string()
            .required('Enter your name'),
          age: yup
            .number()
            .required('Enter your age')
            .min(18, 'You must be 18 years old')
            .integer()
            .typeError('The field must be a number'),
        });

        try {
          formSchema.validateSync(fields, { abortEarly: false });
        } catch (err) {
          e.preventDefault();

          for (const { path, message } of err.inner) {
            fetchit.setError(path, message);
          }

          FetchIt.Message.error('There are items that require your attention'); // [!code focus]
        }
      });
    </script>
    ```

That's it! After these steps we will get validation using **yup** library, but remember, it is not safe on the client side. That's why you should use **FormIt** validation tools when calling the snippet, or if you use your own snippet, you should do it in it.

An example of a snippet call with **FormIt** validation:

:::code-group

```modx
[[!FetchIt?
  &form=`form.tpl`
  &hooks=`email,FormItSaveForm`
  &validate=`name:required,age:required:isNumber:minValue=^18^`

  // Optional
  &snippet=`FormIt`
  &formName=`Form name`
  &emailSubject=`Subject`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'form.tpl',
  'hooks' => 'email,FormItSaveForm',
  'validate' => 'name:required,age:required:isNumber:minValue=^18^',

  // Optional
  'snippet' => 'FormIt',
  'formName' => 'Form name',
  'emailSubject' => 'Subject',
]}
```

:::

A list of all **FormIt** validators can be found on the [documentation site](https://docs.modx.com/3.x/en/extras/formit/formit.validators) of the component.
