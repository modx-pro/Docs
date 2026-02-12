# Validation with Iodine

This section shows how to implement client-side validation using the [Iodine](https://github.com/caneara/iodine) library. We will handle a simple form with two fields: name and email.

<!--@include: ../../parts/validation.warning.md-->

## Including the library

For simplicity we will load it via CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/@caneara/iodine@8/dist/iodine.min.umd.js" defer></script>
```

## Form markup

Nothing special, except the `novalidate` attribute on the form element to disable built-in browser validation.

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" />
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <button>Submit</button>
</form>
```

## Handler

Add a handler for the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) event where validation will run. Step by step:

1. Add a handler for [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore).

    ```js
    document.addEventListener('fetchit:before', (e) => {

    });
    ```

2. Get references to the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and [`FetchIt`](/en/components/fetchit/frontend/instance) instances.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail; // [!code focus]
    });
    ```

3. **Iodine** can validate a set of data if you pass it an object whose keys are field names and values are the corresponding values. Convert the **FormData** instance to a plain object.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries()); // [!code focus]
    });
    ```

4. Define validation rules for the fields.

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

5. Run validation and store the result.

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

6. If validation succeeds, exit the handler with `return`. Otherwise call `preventDefault()` on the event to stop form submission.

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

7. Loop over the fields.

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

8. For each field: if it is valid, clear its error with [`clearError()`](/en/components/fetchit/frontend/instance#clearerror); otherwise set the error with [`setError()`](/en/components/fetchit/frontend/instance#seterror).

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

Done. You now have client-side validation with **Iodine**. Remember that client-side validation is not secure, so use **FormIt** validation when calling the snippet, or perform validation in your own snippet as well.

Example snippet call with **FormIt** validation:

:::code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`,
  &validate=`name:required:minLength=^5^,email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet: [
  'form' => 'myForm.tpl',
  'validate' => 'name:required:minLength=^5^,email:required:email',
]}
```

:::

See the [FormIt validators documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators) for the full list.
