# Validation with Iodine

This section will present an example of how to implement client-side validation using the [Iodine](https://github.com/caneara/iodine) library. We will process a simple form with two fields, name and E-mail.

<!--@include: ../../parts/validation.warning.md-->

## Adding library

For simplicity of the example, let's connect it via CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/@caneara/iodine@8/dist/iodine.min.umd.js" defer></script>
```

## Form layout

Nothing unusual, except for the `novalidate` attribute added to the form element. It is needed to disable the browser's built-in validation.

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

Now we have to add a handler to the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore`) event, where the validation will take place. We will explain it step by step.

1. Adding a handler to the [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) event.

    ```js
    document.addEventListener('fetchit:before', (e) => {

    });
    ```

2. Get references to instances of [`FormData`](https://developer.mozilla.org/ru/docs/Web/API/FormData) and [`FetchIt`](/en/components/fetchit/frontend/instance) classes.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail; // [!code focus]
    });
    ```

3. The **Iodine** library can validate a data group by passing it a prepared object with the field name as the key and the value as the value. To do this, we just need to turn an instance of **FormData** into a simple object.

    ```js
    document.addEventListener('fetchit:before', (e) => {
      const { formData, fetchit } = e.detail;
      const fields = Object.fromEntries(formData.entries()); // [!code focus]
    });
    ```

4. Let's prepare field validation rules.

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

5. Let's perform the validation by writing the result to a variable.

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

6. Let's write a condition that if the validation is successful, we terminate our handler with `return`. And then call the `preventDefault()` method of our event to stop sending the form.

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

7. Next, we're going through our fields.

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

8. If the field is valid (we are talking about the validation state of each field, not all of them), then we clear its errors using the [`clearError()`](/en/components/fetchit/frontend/instance#clearerror) method, otherwise we add an error to the field using the [`setError()`](/en/components/fetchit/frontend/instance#seterror) method.

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

Done! This is how we can add validation using the **Iodine** library, but remember, it is not secure on the client side. So when calling the snippet, you should use the validation tools of **FormIt** or if you use your own snippet, you should do it there as well.

An example of a snippet call with **FormIt** validation:

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

A list of all **FormIt** validators can be found on the [documentation site](https://docs.modx.com/3.x/en/extras/formit/formit.validators) of the component.
