# File upload

Hostings limit POST size (typically 20MB). To upload larger files, chunking is needed. **SendIt** does this for you.

For standard file field use this markup:

```html:line-numbers
<form enctype="multipart/form-data" data-si-form="formWithFile" data-si-preset="form_with_file">
  <label data-fu-wrap data-si-preset="upload_simple_file" data-si-nosave>
    <div data-fu-progress=""></div>
    <input type="hidden" name="filelist" data-fu-list>
    <input type="file" name="files" data-fu-field multiple placeholder="Select file">
    <template data-fu-tpl>
      <button type="button" data-fu-path="$path">$filename&nbsp;x</button>
    </template>
  </label>
</form>
```

For drag-and-drop upload use:

```html:line-numbers
<form enctype="multipart/form-data" data-si-form="formWithFile" data-si-preset="form_with_file">
  <div data-fu-wrap data-si-preset="upload_drop_file" data-si-nosave>
    <div data-fu-progress=""></div>
    <input type="hidden" name="filelist" data-fu-list>
    <label data-fu-dropzone>
      <input type="file" name="files" data-fu-field multiple class="v_hidden">
      <span data-fu-hide>Drag files here</span>
    </label>
    <template data-fu-tpl>
      <button type="button" data-fu-path="$path">$filename&nbsp;x</button>
    </template>
  </div>
</form>
```

## Attribute reference

* **data-fu-wrap** - wrapper block.
* **data-fu-progress** - progress bar wrapper.
* **data-fu-dropzone** - drag-and-drop zone wrapper.
* **data-fu-list** - hidden field for uploaded files list.
* **data-fu-field** - file input.
* **data-fu-tpl** - template.
* **data-fu-path** - path to specific file.
* **data-fu-hide** - element to hide after first file added.

## Workflow

::: danger
**data-fu-wrap** block MUST be inside form with **data-si-form**. Other **data-fu-** elements must be inside the wrapper.
:::

User selects files to upload.

::: tip
**multiple** allows selecting several files with [[Ctrl]]. Upload is sequential.
:::

Even without **multiple**, user can add files to queue until max count. Before upload starts, remove from queue by clicking progress bar with file name.

Files are sent to server for type, size and count validation. Validation params come from preset; you can [change them in JavaScript](/en/components/sendit/development#change-file-validation-params-from-javascript) or via [**OnBeforeFileValidate**](/en/components/sendit/events#onbeforefilevalidate) plugin. Plugin changes have higher priority.

Validated files are uploaded. Validation errors show in notifications. Submit button is disabled during upload, enabled when done. Multi-threaded upload supported; `threadsQuantity` in preset.

::: info
On shared hosting, thread count may not affect speed. May depend on browser limits or connection.
:::

After successful upload, file path is added to **data-fu-list** hidden input, which MUST be inside **data-fu-wrap** block.

File previews use template from **data-fu-tpl**. Template supports *$path* and *$filename*. For removal, add button with **data-fu-path**.

::: warning
User can only remove their own files; session_id and path are verified before delete.
:::

Uploaded files are stored in folder named by session id until **si_storage_time** expires.

::: info
Before removal, user can re-add the same file to queue; if upload was incomplete, it resumes from last position.
:::

## Preset parameters

```php:line-numbers
'upload_simple_file' => [
  'maxSize' => 6,
  'maxCount' => 2,
  'allowExt' => 'jpg,png',
  'portion' => 0.1,
  'loadedUnit' => 'Mb', // %, b, mb, kb, gb
]
```

* **maxSize** - max file size in MB.
* **maxCount** - max files to upload.
* **allowExt** - allowed extensions.
* **portion** - chunk size in MB.
* **loadedUnit** - progress units (case-insensitive); rounding via **si_precision** setting.

::: warning
Portion size must not exceed hosting POST limit.
:::

## Attach files to email

Add **enctype="multipart/form-data"** to form and in preset:

* **attachFilesToEmail** - file upload field name (e.g. files).
* **allowFiles** - field with uploaded files list (e.g. filelist); use for further processing (move, cloud upload).

```php:line-numbers
'form_with_file' => [
  'extends' => 'default',
  'validate' => 'name:required',
  'attachFilesToEmail' => 'files',
  'allowFiles' => 'filelist',
  'clearFieldsOnSuccess' => 1,
],
```

## Notifications

Notification texts come from component dictionary by keys:

* **si_msg_loading** - upload progress.
* **si_msg_loading_bytes** - progress in bytes.
* **si_msg_loaded** - success message.
* **si_msg_file_remove_session_err** - error when session id not in path.
* **si_msg_files_count_err** - when user tries to add more than remaining quota.
* **si_msg_files_maxcount_err** - when user tries to upload more than allowed.
* **si_msg_files_loaded_err** - when max already reached.
* **si_msg_file_size_err** - file too large.
* **si_msg_file_extention_err** - invalid extension.

## JavaScript config

::: details Default config

```js:line-numbers
export default function returnConfigs() {
  return {
    FileUploaderFactory:{
      pathToScripts: './modules/fileuploader.js',
      formSelector: '[data-si-form]',
      rootSelector: '[data-fu-wrap]',
      progressSelector: '[data-fu-progress]',
      presetKey: 'siPreset',
      tplSelector: '[data-fu-tpl]',
      dropzoneSelector: '[data-fu-dropzone]',
      fileListSelector: '[data-fu-list]',
      progressIdAttr: 'data-fu-id',
      progressTextAttr: 'data-fu-text',
      hideBlockSelector: '[data-fu-hide]',
      presetSelector: '[data-si-preset]',
      sendEvent: 'si:send:after',
      pathKey: 'fuPath',
      pathAttr: 'data-fu-path',
      actionUrl: 'assets/components/sendit/action.php',
      hiddenClass: 'v_hidden',
      progressClass: 'progress__line',
      showTime: false
    }
  }
}
```

:::

| Key | Description | Value |
|:---:|:---:|:---:|
| `pathToScripts` | Path to module (relative to sendit.js) | ./modules/fileuploader.js |
| `formSelector` | Form selector | [data-si-form] |
| `rootSelector` | Upload wrapper | [data-fu-wrap] |
| `progressSelector` | Progress block | [data-fu-progress] |
| `tplSelector` | Preview template | [data-fu-tpl] |
| `dropzoneSelector` | Drop zone | [data-fu-dropzone] |
| `fileListSelector` | File list field | [data-fu-list] |
| `progressIdAttr` | Progress id | data-fu-id |
| `progressTextAttr` | Progress text | data-fu-text |
| `hideBlockSelector` | Hide when upload | [data-fu-hide] |
| `presetSelector` | Preset | [data-si-preset] |
| `sendEvent` | Send complete event | si:send:after |
| `pathKey` | Path dataset key | fuPath |
| `pathAttr` | Path attribute | data-fu-path |
| `actionUrl` | Request handler | assets/components/sendit/web/action.php |
| `hiddenClass` | Hide class | v_hidden |
| `progressClass` | Progress line class | progress__line |
| `showTime` | Show upload time in console | false |
