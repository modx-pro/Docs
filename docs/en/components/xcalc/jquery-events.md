# jQuery events

Use these to attach JS to calculator frontend events.

## xccResultsResponse

Fires on successful or failed calculation.

## Example

```js
$(document).ready(function() {
  $(document).on('xccResultsResponse', function (e, response, $form, propkey) {
    if (response.success) {
      console.log('response', response); // server response
      console.log('$form', $form);       // form jQuery object
      console.log('propkey', propkey);   // current calculator key

      let $wrap = $form.closest('[data-xcc-propkey="' + propkey + '"]');
      console.log('$wrap', $wrap);       // wrapper block
    }
  });
});
```
