# Common solutions

This section lists solutions that are frequently needed when using the component.

## Attach an image (file) to a message

This is a non-trivial task and usually requires a developer. There is a separate article with details: [https://modx.pro/components/5707-easycomm-additional-picture-field/](https://modx.pro/components/5707-easycomm-additional-picture-field/)

## Use easyComm with msProducts / pdoResources / mFilter2

See the doc article "Rating in pdoResources, msProducts snippets".

## Join user table when using ecMessages

If messages are left by logged-in users, you can join the user profile and use its fields in the chunk.

Example:

:::code-group

```modx
[[!ecMessages?
  &leftJoin=`{
    "modUserProfile": {
      "class": "modUserProfile",
      "alias": "UserProfile",
      "on": "ecMessage.createdby=UserProfile.internalKey"
    }
  }`
  &select=`{"UserProfile":"*"}`
]]
```

```fenom
{$_modx->runSnippet('!ecMessages', [
  'leftJoin' => [
    'modUserProfile' => [
      'class'=>'modUserProfile',
      'alias'=>'UserProfile',
      'on'=>'ecMessage.createdby=UserProfile.internalKey',
    ],
  ],
  'select' => ['UserProfile' => '*'],
])}
```

:::

## Where to read about message voting?

See: [https://modx.pro/components/19235](https://modx.pro/components/19235)

## Where to read about attaching files to messages?

See: [https://modx.pro/components/21775](https://modx.pro/components/21775)

## Common issues

Possible causes:

### Message "Can't find jQuery ajaxForm plugin!"

You need to include the [jquery.form](http://malsup.com/jquery/form/) plugin. It is not part of easyComm but is required for AJAX form submit. Include it after jQuery and before easyComm scripts.

### Add-message form does not submit or the page reloads on submit

Possible causes:

- The ecForm call is inside another HTML `<form>` (common with miniShop2 product pages). ecForm outputs its own form; nested forms are invalid, so the form does not work.
- Try a newer PHP version.
- Ensure jQuery is loaded only once on the page.
- Load the component scripts after jQuery.

### Some fields are not saved (when calling ecForm)

Check ecForm parameters **allowedFields** and **requiredFields**; the fields may be missing there.

### CSS styles missing / Rating not visible on the site

The CSS file is only auto-included when snippet ecForm is called on the page.

If you only call ecMessages or ecThreadRating (e.g. on the home page, not on the product page), include the CSS manually.
