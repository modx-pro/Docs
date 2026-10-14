---
title: File uploads
description: A FetchIt form with files — checking the size and type before sending, attachments in the FormIt e-mail
---

# File uploads

FetchIt sends the form through `FormData`, so files go along with the other fields without extra code. What is left is to check them before sending, so that the visitor does not wait for the upload of a file the server will refuse anyway.

## Markup

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" enctype="multipart/form-data">
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> CV or portfolio
    <input type="file" name="files[]" multiple
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      data-max-files="3" data-max-size="5">
    <small>Up to three files, each up to 5 MB: PDF, Word, JPG or PNG</small>
    <span data-error="files">[[+fi.error.files]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" enctype="multipart/form-data">
  <label> Name
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> CV or portfolio
    <input type="file" name="files[]" multiple
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      data-max-files="3" data-max-size="5">
    <small>Up to three files, each up to 5 MB: PDF, Word, JPG or PNG</small>
    <span data-error="files">{$_modx->getPlaceholder('fi.error.files')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

:::

- `enctype="multipart/form-data"` is needed for a submission without JavaScript. FetchIt does not need it, but it does no harm either.
- `name="files[]"` with `multiple` means several files in one field. FetchIt looks for its error both in `[data-error="files"]` and in `[data-error="files[]"]`.
- `accept` only filters the file picker: the visitor can switch the filter to "All files".

## Check before sending

The limits are taken from the attributes of the field, so the script suits any form:

```js
const extension = (name) => {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot).toLowerCase()
}

document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail

  for (const input of form.querySelectorAll('input[type="file"]')) {
    const files = [...input.files]
    const maxFiles = Number(input.dataset.maxFiles) || Infinity
    const maxSize = (Number(input.dataset.maxSize) || Infinity) * 1024 * 1024
    const allowed = input.accept ? input.accept.split(',').map((type) => type.trim()) : []

    const tooBig = files.find((file) => file.size > maxSize)
    const wrongType = allowed.length && files.find((file) => !allowed.includes(extension(file.name)))

    let error = ''
    if (files.length > maxFiles) {
      error = `You can attach no more than ${maxFiles} files`
    } else if (tooBig) {
      error = `The file is larger than ${input.dataset.maxSize} MB: ${tooBig.name}`
    } else if (wrongType) {
      error = `This file type is not allowed: ${wrongType.name}`
    }

    if (error) {
      fetchit.setError(input.name.replace(/\[\]$/, ''), error)
      e.preventDefault()
    }
  }
})
```

The type check compares the extensions from `accept`. If `accept` lists MIME types such as `image/*`, compare `file.type` instead.

## E-mail with attachments

The FormIt `email` hook attaches the uploaded files to the e-mail itself — the `&attachFilesToEmail` property is responsible for that, and it is on by default:

::: code-group

```modx
[[!FetchIt?
  &form=`resume.tpl`
  &hooks=`email`
  &emailTpl=`resumeEmail.tpl`
  &emailTo=`hr@example.com`
  &emailSubject=`CV from the site`
  &validate=`name:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'resume.tpl',
  'hooks' => 'email',
  'emailTpl' => 'resumeEmail.tpl',
  'emailTo' => 'hr@example.com',
  'emailSubject' => 'CV from the site',
  'validate' => 'name:required',
]}
```

:::

In [your own snippet](/en/components/fetchit/snippets/custom) the files are in `$_FILES`.

## Server limits

The client-side check is convenient, but the server sets its own limits. Check them in the PHP settings:

- `upload_max_filesize` — the largest size of a single file;
- `post_max_size` — the largest size of the whole form with its files; it must be larger than the sum of the files;
- `max_file_uploads` — how many files can be uploaded at once.

If the form is larger than `post_max_size`, PHP drops it entirely, and the server does not get even the text fields. Keep the limits in `data-max-size` and `data-max-files` below the server ones.
