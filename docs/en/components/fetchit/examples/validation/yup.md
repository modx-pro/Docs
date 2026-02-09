# Validation with yup

This section shows how to integrate the [yup](https://github.com/jquense/yup) library for extra validation of form data before submission. We will handle a simple form with two fields: name and age.

<!--@include: ../../parts/validation.warning.md-->

## Form markup

Nothing special, except the `novalidate` attribute on the form element to disable built-in browser validation.

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
  <button>Submit</button>
</form>
```

## Including the library

For simplicity we will load it via CDN and use a module import.

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';
</script>
```

## Handler

Add a handler for the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) event to validate the form data.

1. Add a handler for [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore).

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => { // [!code focus]

      }); // [!code focus]
    </script>
    ```

2. Get references to the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and [`FetchIt`](/en/components/fetchit/frontend/instance) instances.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail; // [!code focus]
      });
    </script>
    ```

3. Convert **formData** to a plain object.

    ```html
    <script type="module">
      import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

      document.addEventListener('fetchit:before', (e) => {
        const { formData, fetchit } = e.detail;
        const fields = Object.fromEntries(formData.entries()); // [!code focus]
      });
    </script>
    ```

4. Define the schema for the form and set error messages.

    ::: details Localization
    **yup** offers several ways to localize error messages. We use the simplest for this example.

    See the [documentation](https://github.com/jquense/yup#error-message-customization) for more options.
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
            .min(18, 'You must be 18 or older') // [!code focus]
            .integer() // [!code focus]
            .typeError('Must be a number'), // [!code focus]
        }); // [!code focus]
      });
    </script>
    ```

5. Call the synchronous validation method `validateSync()` inside a `try..catch` to handle validation failures.

    ::: info Info
    The `abortEarly` option controls whether validation stops at the first failure. We set it to `false` so all fields are validated.
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
            .min(18, 'You must be 18 or older')
            .integer()
            .typeError('Must be a number'),
        });

        try { // [!code focus]
          formSchema.validateSync(fields, { abortEarly: false }); // [!code focus]
        } catch (err) { // [!code focus]
          // [!code focus]
        } // [!code focus]
      });
    </script>
    ```

6. In the `catch` block, handle validation errors: use [`setError()`](/en/components/fetchit/frontend/instance#seterror) on the [`FetchIt`](/en/components/fetchit/frontend/instance) instance to set invalid state for fields, and call `preventDefault()` on the event to stop form submission.

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
            .min(18, 'You must be 18 or older')
            .integer()
            .typeError('Must be a number'),
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

7. Optionally show a popup error message. For examples with popular notification libraries see [here](/en/components/fetchit/examples/notifications/).

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
            .min(18, 'You must be 18 or older')
            .integer()
            .typeError('Must be a number'),
        });

        try {
          formSchema.validateSync(fields, { abortEarly: false });
        } catch (err) {
          e.preventDefault();

          for (const { path, message } of err.inner) {
            fetchit.setError(path, message);
          }

          FetchIt.Message.error('Please fix the errors in the form'); // [!code focus]
        }
      });
    </script>
    ```

That's it. You now have validation with **yup**. Remember that client-side validation is not secure, so use **FormIt** validation when calling the snippet, or perform validation in your own snippet as well.

Example snippet call with **FormIt** validation:

:::code-group

```modx
[[!FetchIt?
  &form=`form.tpl`
  &hooks=`email,FormItSaveForm`
  &validate=`name:required,age:required:isNumber:minValue=^18^`

  // Optional parameters
  &snippet=`FormIt`
  &formName=`Form name`
  &emailSubject=`Email subject`
]]
```

```fenom
{'!FetchIt' | snippet: [
  'form' => 'form.tpl',
  'hooks' => 'email,FormItSaveForm',
  'validate' => 'name:required,age:required:isNumber:minValue=^18^',

  // Optional parameters
  'snippet' => 'FormIt',
  'formName' => 'Form name',
  'emailSubject' => 'Email subject',
]}
```

:::

See the [FormIt validators documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators) for the full list.
