# Events

The following events are available:

- `OnBeforeSaveLocalization`
- `OnSaveLocalization` — create/update resource localization
  - `mode` — 'new' or 'upd'
  - `localizatorContent` — instance of `localizatorContent`
  - `id` — localization ID
- `OnBeforeRemoveLocalization`
- `OnRemoveLocalization` — remove resource localization
  - `localizatorContent` — instance of `localizatorContent`
  - `id` — localization ID
- `OnBeforeSaveLocalizatorLanguage`
- `OnSaveLocalizatorLanguage` — create/update languages
  - `mode` — 'new' or 'upd'
  - `localizatorLanguage` — instance of `localizatorLanguage`
  - `id` — language ID
- `OnBeforeFindLocalization`
- `OnFindLocalization` — language lookup
  - `language` — reference to `localizatorLanguage` instance
  - `http_host` — `$_SERVER['HTTP_HOST']`
  - `request` — `$_REQUEST['q']`
- `OnBuildLocalizationTabs` — build resource localization tabs in the Manager
  - `localizatorContent` — reference to `localizatorContent` instance
  - `tabs` — array of tabs and fields
