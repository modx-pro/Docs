---
title: Frontend Editor
description: Редактирование контента не заходя в админ панель
logo: https://modstore.pro/assets/extras/frontendeditor/logo-lg.png
author: apnix
modstore: https://modstore.pro/packages/content/frontendeditor
modx: https://extras.modx.com/package/frontendeditor
repository: https://github.com/apnix/frontendeditor
---
# Frontend Editor

Frontend Editor это простой плагин который позволяет редактировать контент не заходя в админ панель. Он включает в себя TinyMCE 5 для удобного редактирования.

![Frontend Editor](https://file.modx.pro/files/5/c/8/5c8ed6dafbae4a9e2d4457b19787f0f1.png)

## Возможности

- Поддерживается редактирование полей документа включая TV поля.
- Простая загрузка изображений без использования менеджера ресурсов.
- Редактирование полей по ID ресурса (полезно для создания редактируемых, меню, breadcrumbs и т.д.)

## Установка и использование

Установите расширение. Оберните поля которые хотите редактировать тегом с атрибутом `data-frontendeditor` в качестве значения атрибута укажите название поля. Например так:

```modx
<div data-frontendeditor="content">
  [[*content]]
</div>
```

Доступные значения: `content, pagetitle, longtitle, menutitle, description, introtext`

### Редактирование TV полей

Для редактирования TV полей в качестве значения атрибута необходимо указать  `tv-` перед названием поля.

```modx
<div data-frontendeditor="tv-myTvField">
  [[*myTvField]]
</div>
```

### Выбор редактора

Для каждого поля можно указать один из двух типов редакторов: TinyMCE `tinymce` (по умолчанию можно не указывать) или простое поле ввода `simple`.

```modx
<div data-frontendeditor="tv-myTvField, simple">
  [[*myTvField]]
</div>
```

### Редактирование значений по ID ресурса

Если нужно отредактировать поля другого ресурса нужно указать его id в качестве первой опции. Это особенно полезно для создания редактируемых меню, breadcrumbs и других элементов интерфейса.

Пример редактирования `pagetitle` для ресурса с id - `2`

```modx
<a href="/index.php?id=2" data-frontendeditor="2, pagetitle, simple">
  [[pdoField? &id=`2` &field=`pagetitle`]]
</a>
```

Пример редактируемого меню:

```modx
[[pdoMenu?
  &parents=`0`
  &tpl=`@INLINE <li><a href="[[+link]]" data-frontendeditor="[[+id]], menutitle, simple">[[+menutitle]]</a>[[+wrapper]]</li>`
]]
```

### Поле menutitle

Для редактируемых полей menutitle если они пусты предусмотрено особое поведение. В них подставляется значение из pagetitle, а результат сохраняются в menutitle. Это поведение можно изменить см. дополнительные настройки.

## Дополнительные настройки

`frontendeditor.tinymce_init_default` - конфигурация TinyMCE подробнее смотрите [документацию TinyMCE 5.0](https://www.tiny.cloud/docs/)
`frontendeditor.upload_path` - директория загрузки изображений
`frontendeditor.upload_file_name` - обработка имени файла, может принимать следующие значения:

- пусто(по умолчанию) - ничего не делает
- sanitize - удаляет символы  ```$-+!*'(),{}|\\^~[]`<>#%\";/?:@&=```
- uniqid - генерирует уникальное имя вида `5db365920976f.png`

`frontendeditor.menutitle_behavior` - поведение редактора для пустых полей `menutitle`. Может принимать следующие значения:

- 0 - редактор работает с пустыми `menutitle` так же как и с остальными полями.
- 1 (по умолчанию) - В пустые поля `menutitle` подставляется значение из `pagetitle`, а сохраняются `menutitle`.
- 2 - В пустые поля `menutitle` подставляется значение из `pagetitle` и сохраняются `pagetitle`.

## Системные требования

- На тех страницах где вы собираетесь использовать редактор должен быть указан DOCTYPE такой как: `<!DOCTYPE html>`
- TinyMCE 5 должен [поддерживать](https://www.tiny.cloud/docs/general-configuration-guide/system-requirements) ваш браузер.

## Скриншоты

![Скриншоты - 1](https://file.modx.pro/files/1/6/1/1617d1d329d68265515338e0d4b9bd08.png)

![Скриншоты - 2](https://file.modx.pro/files/e/3/4/e3483249078e30ae051b9fd74f09dae5.png)

![Скриншоты - 3](https://file.modx.pro/files/7/4/a/74a888cbb8f1635033b868120a366850.png)
