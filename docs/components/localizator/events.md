# События

Доступны следующие события:

- `OnBeforeSaveLocalization`
- `OnSaveLocalization` - создание/изменение локализации ресурса
  - `mode` - 'new' или 'upd'
  - `localizatorContent` - экземпляр класса `localizatorContent`
  - `id` - ID локализации
- `OnBeforeRemoveLocalization`
- `OnRemoveLocalization` - удаление локализации ресурса
  - `localizatorContent` - экземпляр класса `localizatorContent`
  - `id` - ID локализации
- `OnBeforeSaveLocalizatorLanguage`
- `OnSaveLocalizatorLanguage` - создание/изменение языков
  - `mode` - 'new' или 'upd'
  - `localizatorLanguage` - экземпляр класса `localizatorLanguage`
  - `id` - ID локализации
- `OnBeforeFindLocalization`
- `OnFindLocalization` - поиск языка
  - `language` - ссылка на экземпляр класса `localizatorLanguage`
  - `http_host` - `$_SERVER['HTTP_HOST']`
  - `request` - `$_REQUEST['q']`
- `OnBuildLocalizationTabs` - построение табов Локализации ресурса в админке
  - `localizatorContent` - ссылка на экземпляр класса `localizatorContent`
  - `tabs` - массив табов и полей
