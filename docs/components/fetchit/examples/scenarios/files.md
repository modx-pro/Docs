---
title: Загрузка файлов
description: Форма FetchIt с файлами — проверка размера и типа до отправки, вложения в письме FormIt
---

# Загрузка файлов

FetchIt отправляет форму через `FormData`, поэтому файлы уходят вместе с остальными полями без дополнительного кода. Остаётся проверить их до отправки, чтобы посетитель не ждал загрузки файла, который сервер всё равно отклонит.

## Разметка

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" enctype="multipart/form-data">
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> Резюме или портфолио
    <input type="file" name="files[]" multiple
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      data-max-files="3" data-max-size="5">
    <small>До трёх файлов, каждый до 5 МБ: PDF, Word, JPG или PNG</small>
    <span data-error="files">[[+fi.error.files]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" enctype="multipart/form-data">
  <label> Имя
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> Резюме или портфолио
    <input type="file" name="files[]" multiple
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      data-max-files="3" data-max-size="5">
    <small>До трёх файлов, каждый до 5 МБ: PDF, Word, JPG или PNG</small>
    <span data-error="files">{$_modx->getPlaceholder('fi.error.files')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

- `enctype="multipart/form-data"` нужен для отправки без JavaScript. FetchIt он не нужен, но и не мешает.
- `name="files[]"` с `multiple` — несколько файлов в одном поле. Ошибку для него FetchIt ищет и в `[data-error="files"]`, и в `[data-error="files[]"]`.
- `accept` только фильтрует окно выбора файлов: посетитель может переключить фильтр на «Все файлы».

## Проверка до отправки

Ограничения берутся из атрибутов поля, так что скрипт подходит для любой формы:

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
      error = `Можно приложить не больше ${maxFiles} файлов`
    } else if (tooBig) {
      error = `Файл больше ${input.dataset.maxSize} МБ: ${tooBig.name}`
    } else if (wrongType) {
      error = `Этот тип файла не подходит: ${wrongType.name}`
    }

    if (error) {
      fetchit.setError(input.name.replace(/\[\]$/, ''), error)
      e.preventDefault()
    }
  }
})
```

Проверка типа сравнивает расширения из `accept`. Если в `accept` указаны MIME-типы вроде `image/*`, сравнивайте `file.type`.

## Письмо с вложениями

Хук `email` FormIt сам прикладывает загруженные файлы к письму — за это отвечает параметр `&attachFilesToEmail`, по умолчанию он включён:

::: code-group

```modx
[[!FetchIt?
  &form=`resume.tpl`
  &hooks=`email`
  &emailTpl=`resumeEmail.tpl`
  &emailTo=`hr@example.com`
  &emailSubject=`Резюме с сайта`
  &validate=`name:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'resume.tpl',
  'hooks' => 'email',
  'emailTpl' => 'resumeEmail.tpl',
  'emailTo' => 'hr@example.com',
  'emailSubject' => 'Резюме с сайта',
  'validate' => 'name:required',
]}
```

:::

В [своём сниппете](/components/fetchit/snippets/custom) файлы лежат в `$_FILES`.

## Ограничения сервера

Клиентская проверка удобна, но сервер ставит свои пределы. Проверьте в настройках PHP:

- `upload_max_filesize` — наибольший размер одного файла;
- `post_max_size` — наибольший размер всей формы вместе с файлами, должен быть больше суммы файлов;
- `max_file_uploads` — сколько файлов можно загрузить за раз.

Если форма больше `post_max_size`, PHP отбросит её целиком, и сервер не получит даже текстовые поля. Держите лимиты в `data-max-size` и `data-max-files` ниже серверных.
